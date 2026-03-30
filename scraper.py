#!/usr/bin/env python3
"""
ExamTopics Scraper — usa Playwright per aggirare Cloudflare.

Uso:
  python scraper.py <URL_BASE> [opzioni]

Esempi:
  python scraper.py "https://www.examtopics.com/exams/google/professional-cloud-developer/view/"
  python scraper.py "..." --format csv
  python scraper.py "..." --pages 1-5
  python scraper.py "..." --format all --output risultati
"""

import argparse
import csv
import json
import re
import sys
import time
from pathlib import Path
from typing import Optional, Tuple
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, Page, TimeoutError as PWTimeout


# ---------------------------------------------------------------------------
# Fetching con Playwright
# ---------------------------------------------------------------------------

def fetch_page_html(page: Page, url: str, retries: int = 3) -> Optional[str]:
    """Naviga all'URL e restituisce l'HTML dopo che la pagina è caricata."""
    for attempt in range(1, retries + 1):
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=30_000)
            # Aspetta che compaiano le card delle domande (max 15s)
            try:
                page.wait_for_selector("div.exam-question-card", timeout=15_000)
            except PWTimeout:
                pass  # Potrebbe non esserci nulla (pagina inesistente)
            return page.content()
        except PWTimeout:
            print(f"  [!] Timeout su {url} (tentativo {attempt}/{retries})")
        except Exception as e:
            print(f"  [!] Errore: {e} (tentativo {attempt}/{retries})")
        if attempt < retries:
            time.sleep(3)
    return None


# ---------------------------------------------------------------------------
# Parsing HTML
# ---------------------------------------------------------------------------

def get_total_pages(soup: BeautifulSoup) -> int:
    text = soup.get_text()
    match = re.search(r"out of\s+(\d+)\s+pages?", text, re.IGNORECASE)
    if match:
        return int(match.group(1))
    pagination = soup.select("ul.pagination li a")
    numbers = []
    for a in pagination:
        try:
            numbers.append(int(a.get_text(strip=True)))
        except ValueError:
            pass
    return max(numbers) if numbers else 1


def parse_voting_data(soup: BeautifulSoup, question_id: str) -> dict:
    script_tag = soup.find("script", {"id": question_id, "type": "application/json"})
    if not script_tag:
        return {"votes": {}, "most_voted": None}
    try:
        data = json.loads(script_tag.string)
        votes = {}
        most_voted = None
        for entry in data:
            letter = entry.get("voted_answers", "").strip().upper()
            count = entry.get("vote_count", 0)
            if letter:
                votes[letter] = count
            if entry.get("is_most_voted"):
                most_voted = letter
        return {"votes": votes, "most_voted": most_voted}
    except (json.JSONDecodeError, TypeError):
        return {"votes": {}, "most_voted": None}


def parse_questions(html: str) -> list:
    soup = BeautifulSoup(html, "lxml")
    questions = []

    for card in soup.select("div.exam-question-card"):
        question = {}

        # Numero e topic
        header = card.select_one(".card-header")
        if header:
            header_text = header.get_text(" ", strip=True)
            num_match = re.search(r"Question\s*#(\d+)", header_text, re.IGNORECASE)
            question["number"] = int(num_match.group(1)) if num_match else None
            topic_el = header.select_one(".question-title-topic")
            question["topic"] = topic_el.get_text(strip=True) if topic_el else None
        else:
            question["number"] = None
            question["topic"] = None

        # ID domanda
        body = card.select_one(".card-body.question-body, .question-body")
        question["question_id"] = body.get("data-id") if body else None

        # Testo
        text_el = card.select_one("p.card-text")
        question["text"] = text_el.get_text(separator="\n", strip=True) if text_el else ""

        # Opzioni e risposta corretta
        options = {}
        correct_answer = None
        for li in card.select("li.multi-choice-item"):
            letter_el = li.select_one(".multi-choice-letter")
            if not letter_el:
                continue
            letter = letter_el.get("data-choice-letter", "").strip().upper()
            if not letter:
                letter = letter_el.get_text(strip=True).rstrip(".")
            full_text = li.get_text(separator=" ", strip=True)
            option_text = re.sub(r"^[A-Z]\.\s*", "", full_text).strip()
            options[letter] = option_text
            if "correct-hidden" in li.get("class", []):
                correct_answer = letter

        question["options"] = options

        if not correct_answer:
            answer_el = card.select_one(".correct-answer")
            if answer_el:
                correct_answer = answer_el.get_text(strip=True).upper()

        question["correct_answer"] = correct_answer

        # Voti community
        if question["question_id"]:
            voting = parse_voting_data(soup, question["question_id"])
            question["community_votes"] = voting["votes"]
            question["most_voted"] = voting["most_voted"]
        else:
            question["community_votes"] = {}
            question["most_voted"] = None

        questions.append(question)

    return questions


def build_page_url(base_url: str, page: int) -> str:
    base_url = base_url.rstrip("/") + "/"
    if page == 1:
        return base_url
    return base_url + f"{page}/"


# ---------------------------------------------------------------------------
# Scraping principale
# ---------------------------------------------------------------------------

def scrape_exam(
    base_url: str,
    page_range: Optional[Tuple[int, int]] = None,
    delay: float = 1.5,
    headless: bool = True,
) -> list:
    all_questions = []

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=headless,
            args=["--disable-blink-features=AutomationControlled"],
        )
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 800},
            locale="en-US",
        )
        # Nasconde che siamo in modalità automatizzata
        context.add_init_script(
            "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        )
        page = context.new_page()

        print(f"[*] Connessione a: {base_url}")
        html = fetch_page_html(page, build_page_url(base_url, 1))
        if not html:
            print("[!] Impossibile caricare la prima pagina.")
            browser.close()
            sys.exit(1)

        soup_first = BeautifulSoup(html, "lxml")
        total_pages = get_total_pages(soup_first)
        print(f"[*] Trovate {total_pages} pagine totali.")

        start_page, end_page = 1, total_pages
        if page_range:
            start_page = max(1, page_range[0])
            end_page = min(total_pages, page_range[1])
            print(f"[*] Scraping pagine {start_page}–{end_page}.")

        for page_num in range(start_page, end_page + 1):
            url = build_page_url(base_url, page_num)
            print(f"  -> Pagina {page_num}/{end_page}: {url}")

            if page_num == 1:
                current_html = html
            else:
                current_html = fetch_page_html(page, url)
                if not current_html:
                    print(f"  [!] Pagina {page_num} non raggiungibile, salto.")
                    continue

            questions = parse_questions(current_html)
            print(f"     Trovate {len(questions)} domande.")
            all_questions.extend(questions)

            if page_num < end_page:
                time.sleep(delay)

        browser.close()

    return all_questions


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def save_json(questions: list, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"[+] Salvato JSON: {path}")


def save_csv(questions: list, path: str) -> None:
    if not questions:
        return
    fieldnames = [
        "number", "topic", "question_id", "text",
        "option_A", "option_B", "option_C", "option_D",
        "correct_answer", "most_voted",
    ]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for q in questions:
            opts = q.get("options", {})
            writer.writerow({
                "number": q.get("number"),
                "topic": q.get("topic"),
                "question_id": q.get("question_id"),
                "text": q.get("text"),
                "option_A": opts.get("A", ""),
                "option_B": opts.get("B", ""),
                "option_C": opts.get("C", ""),
                "option_D": opts.get("D", ""),
                "correct_answer": q.get("correct_answer"),
                "most_voted": q.get("most_voted"),
            })
    print(f"[+] Salvato CSV: {path}")


def save_txt(questions: list, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        for q in questions:
            f.write(f"{'='*70}\n")
            f.write(f"Domanda #{q.get('number')}  [ID: {q.get('question_id')}]")
            if q.get("topic"):
                f.write(f"  — {q['topic']}")
            f.write("\n\n")
            f.write(q.get("text", "") + "\n\n")
            for letter, text in sorted(q.get("options", {}).items()):
                marker = " <-- CORRETTA" if letter == q.get("correct_answer") else ""
                f.write(f"  {letter}. {text}{marker}\n")
            f.write(f"\nRisposta corretta: {q.get('correct_answer') or 'N/A'}")
            if q.get("most_voted"):
                f.write(f"  |  Più votata community: {q['most_voted']}")
            if q.get("community_votes"):
                votes_str = ", ".join(
                    f"{k}: {v}" for k, v in sorted(q["community_votes"].items())
                )
                f.write(f"\nVoti community: {votes_str}")
            f.write("\n\n")
    print(f"[+] Salvato TXT: {path}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_page_range(s: str) -> Tuple[int, int]:
    parts = s.split("-")
    if len(parts) == 2:
        return int(parts[0]), int(parts[1])
    elif len(parts) == 1:
        n = int(parts[0])
        return n, n
    raise argparse.ArgumentTypeError(f"Formato non valido: '{s}'. Usa '3-10' o '5'.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="ExamTopics scraper — estrae domande, opzioni e risposte corrette.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("url", help="URL base dell'esame")
    parser.add_argument("--output", "-o", default=None, help="Nome base dei file di output")
    parser.add_argument(
        "--format", "-f",
        choices=["json", "csv", "txt", "all"],
        default="json",
        help="Formato di output (default: json)",
    )
    parser.add_argument(
        "--pages", "-p",
        type=parse_page_range,
        default=None,
        metavar="RANGE",
        help="Pagine da scaricare, es: '1-5' o '3' (default: tutte)",
    )
    parser.add_argument(
        "--delay", "-d",
        type=float,
        default=1.5,
        metavar="SEC",
        help="Pausa tra pagine in secondi (default: 1.5)",
    )
    parser.add_argument(
        "--no-headless",
        action="store_true",
        help="Apre il browser in modo visibile (utile per debug o login manuale)",
    )

    args = parser.parse_args()

    url_path = urlparse(args.url).path.strip("/")
    exam_name = url_path.replace("/", "_").replace("exams_", "")
    if exam_name.endswith("_view"):
        exam_name = exam_name[:-5]

    questions = scrape_exam(
        base_url=args.url,
        page_range=args.pages,
        delay=args.delay,
        headless=not args.no_headless,
    )

    if not questions:
        print("[!] Nessuna domanda trovata.")
        sys.exit(1)

    print(f"\n[*] Totale domande estratte: {len(questions)}")

    formats = ["json", "csv", "txt"] if args.format == "all" else [args.format]
    for fmt in formats:
        base = args.output or exam_name
        out_path = f"{base}.{fmt}"
        if fmt == "json":
            save_json(questions, out_path)
        elif fmt == "csv":
            save_csv(questions, out_path)
        elif fmt == "txt":
            save_txt(questions, out_path)


if __name__ == "__main__":
    main()
