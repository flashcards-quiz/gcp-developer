1. You are a developer working on an internal application for payroll processing. You are building a component of the application that allows an employee to submit a timesheet, which then initiates several steps:

• An email is sent to the employee and manager, notifying them that the timesheet was submitted.
• A timesheet is sent to payroll processing for the vendor's API.
• A timesheet is sent to the data warehouse for headcount planning.

These steps are not dependent on each other and can be completed in any order. New steps are being considered and will be implemented by different development teams. Each development team will implement the error handling specific to their step. What should you do?

corretta/e:
- Create a Pub/Sub topic for timesheet submissions. Create a subscription for each downstream development team to subscribe to the topic.

sbagliate:
- Create a timesheet microservice deployed to Google Kubernetes Engine. The microservice calls each downstream step and waits for a successful response before calling the next step.
- Deploy a Cloud Function for each step that calls the corresponding downstream system to complete the required action.
- Create a Pub/Sub topic for each step. Create a subscription for each downstream development team to subscribe to their step's topic.

--------------------------------------------------

2. You are writing from a Go application to a Cloud Spanner database. You want to optimize your application’s performance using Google-recommended best practices. What should you do?

corretta/e:
- Write to Cloud Spanner using Cloud Client Libraries.

sbagliate:
- Write to Cloud Spanner using a third-party HTTP client library.
- Write to Cloud Spanner using Google API Client Libraries
- Write to Cloud Spanner using a custom gRPC client library.

--------------------------------------------------

3. You recently developed an application. You need to call the Cloud Storage API from a Compute
Engine instance that doesn't have a public IP address. What should you do?

corretta/e:
- Use Private Google Access

sbagliate:
- Use Shared VPC networks
- Use VPC Network Peering
- Use Carrier Peering

--------------------------------------------------

4. Your team runs a Python job that reads millions of customer record files stored in a Cloud Storage bucket. To comply with regulatory requirements, you need to ensure that customer data is immediately deleted once the job is completed. You want to minimize the time required to complete this task. What should you do?

corretta/e:
- Add a final step in the job that deletes all the objects in the bucket in bulk by using batch requests to the Cloud Storage API.

sbagliate:
- Remove the bucket from the Google Cloud console when the job is completed
- Configure Object Lifecycle Management on the Cloud Storage bucket that deletes all the objects in the bucket at the end of the job execution.
- Use the gcloud CLI to execute the gcloud storage rm --recursive gs://BUCKET_NAME/ command.

--------------------------------------------------

5. You need to containerize a web application that will be hosted on Google Cloud behind a global load balancer with SSL certificates. You don’t have the time to develop authentication at the application level, and you want to offload SSL encryption and management from your application. You want to configure the architecture using managed services where possible. What should you do?

corretta/e:
- Host the application on Google Kubernetes Engine, and use Identity-Aware Proxy (IAP) with Cloud Load Balancing and Google-managed certificates.

sbagliate:
- Host the application on Compute Engine, and configure Cloud Endpoints for your application.
- Host the application on Google Kubernetes Engine, and deploy cert-manager to manage SSL certificates.
- Host the application on Google Kubernetes Engine, and deploy an NGINX Ingress Controller to handle authentication.

--------------------------------------------------

6. Your application is running in multiple Google Kubernetes Engine clusters. It is managed by a Deployment in each cluster. The Deployment has created multiple replicas of your Pod in each cluster. You want to view the logs sent to stdout for all of the replicas in your Deployment in all clusters.
Which command should you use?

corretta/e:
- gcloud logging read [PARAM]

sbagliate:
- kubectl logs [PARAM]
- kubectl exec ג€"it [PARAM] journalctl
- gcloud compute ssh [PARAM] ג€"-command= ג€sudo journalctlג€

--------------------------------------------------

7. You recently deployed your application in Google Kubernetes Engine, and now need to release a new version of your application. You need the ability to instantly roll back to the previous version in case there are issues with the new version. Which deployment model should you use?

corretta/e:
- Perform a blue/green deployment, and test your new application after the deployment is. complete.

sbagliate:
- Perform a rolling deployment, and test your new application after the deployment is complete.
- Perform a canary deployment, and test your new application periodically after the new version is deployed.
- Perform A/B testing, and test your application periodically after the new tests are implemented.

--------------------------------------------------

8. You are designing a microservices application on GKE that will expose a public API to users. Users will interact with the application by using OAuth 2.0, and illegitimate requests should receive a 403 response code. You need the API to be resilient against distributed denial of service (DDoS) attacks and critical security risks such as SQL injection (SQL) and cross-site scripting (XSS).

You want to design the application's architecture while following Google-recommended practices. What should you do?

corretta/e:
- Use an external Application Load Balancer with Cloud Armor. Integrate Cloud Armor with reCAPTCHA Enterprise. Configure the load balancer to forward traffic to the application hosted on GKE.

sbagliate:
- Use an external Application Load Balancer with Cloud Armor, and configure the load balancer to forward requests to Apigee to check the validity of the API requests. Configure GKE as the application's backend.
- Install Service Mesh in your GKE cluster. Configure Service Mesh user authentication to integrate the service hosted on GKE by using an OpenID Connect-compliant identity provider. Expose the application externally by using an Istio Ingress Gateway. Use VPC firewall rules to restrict Ingress traffic to the Ingress gateway.
- Run an Apache HTTP server on Cloud Run to expose a service with a public IP address. Configure the Apache HTTP server as a reverse proxy to only forward valid requests to the API hosted on GKE.

--------------------------------------------------

9. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

How should HipLocal increase their API development speed while continuing to provide the QA team with a stable testing environment that meets feature requirements?

corretta/e:
- Include unit tests in their code, and prevent deployments to QA until all tests have a passing status.

sbagliate:
- Include performance tests in their code, and prevent deployments to QA until all tests have a passing status.
- Create health checks for the QA environment, and redeploy the APIs at a later time if the environment is unhealthy.
- Redeploy the APIs to App Engine using Traffic Splitting. Do not move QA traffic to the new versions if errors are found.

--------------------------------------------------

10. The new version of your containerized application has been tested and is ready to deploy to production on Google Kubernetes Engine. You were not able to fully load-test the new version in pre-production environments, and you need to make sure that it does not have performance problems once deployed. Your deployment must be automated. What should you do?

corretta/e:
- Deploy the application via a continuous delivery pipeline using canary deployments. Use Cloud Monitoring to look for performance issues. and ramp up traffic as the metrics support it.

sbagliate:
- Deploy the application via a continuous delivery pipeline using blue/green deployments. Use Cloud Monitoring to look for performance issues, and launch fully when the metrics support it.
- Deploy the application using kubectl and set the spec.updateStrategv.type to RollingUpdate. Use Cloud Monitoring to look for performance issues, and run the kubectl rollback command if there are any issues.
- Use Cloud Load Balancing to slowly ramp up traffic between versions. Use Cloud Monitoring to look for performance issues.

--------------------------------------------------

11. You deployed a new application to Google Kubernetes Engine and are experiencing some performance degradation. Your logs are being written to Cloud
Logging, and you are using a Prometheus sidecar model for capturing metrics. You need to correlate the metrics and data from the logs to troubleshoot the performance issue and send real-time alerts while minimizing costs. What should you do?

corretta/e:
- Export the Prometheus metrics and use Cloud Monitoring to view them as external metrics. Configure Cloud Monitoring to create log-based metrics from the logs, and correlate them with the Prometheus data.

sbagliate:
- Export the Cloud Logging logs and the Prometheus metrics to Cloud Bigtable. Run a query to join the results, and analyze in Google Data Studio.
- Export the Cloud Logging logs and stream the Prometheus metrics to BigQuery. Run a recurring query to join the results, and send notifications using Cloud Tasks.
- Create custom metrics from the Cloud Logging logs, and use Prometheus to import the results using the Cloud Monitoring REST API.

--------------------------------------------------

12. You have written a Cloud Function that accesses other Google Cloud resources. You want to secure the environment using the principle of least privilege. What should you do?

corretta/e:
- Create a new service account that has a custom IAM role to access the resources. The deployer is given permission to act as the new service account.

sbagliate:
- Create a new service account that has Editor authority to access the resources. The deployer is given permission to get the access token.
- Create a new service account that has Editor authority to access the resources. The deployer is given permission to act as the new service account.
- Create a new service account that has a custom IAM role to access the resources. The deployer is given permission to get the access token.

--------------------------------------------------

13. You are using Cloud Build to build a Docker image. You need to modify the build to execute unit and run integration tests. When there is a failure, you want the build history to clearly display the stage at which the build failed.
What should you do?

corretta/e:
- Create a Cloud Build build config file with separate cloud builder steps to compile and execute unit and integration tests.

sbagliate:
- Create a Cloud Build build config file that will spawn a separate cloud build pipeline for unit and integration tests.
- Create a Cloud Build build config file with a single build step to compile unit and integration tests.
- Add RUN commands in the Dockerfile to execute unit and integration tests.

--------------------------------------------------

14. You are creating and running containers across different projects in Google Cloud. The application you are developing needs to access Google Cloud services from within Google Kubernetes Engine (GKE). What should you do?

corretta/e:
- Use a Google service account to run the Pod with Workload Identity.

sbagliate:
- Store the Google service account credentials as a Kubernetes Secret.
- Assign a Google service account to the GKE nodes.
- Use a Google service account with GKE role-based access control (RBAC).

--------------------------------------------------

15. You maintain a popular mobile game deployed on Google Cloud services that include Firebase, Firestore, and Cloud Functions. Recently, the game experienced a surge in usage, and the application encountered HTTP 429 RESOURCE_EXHAUSTED errors when accessing the Firestore API. The application has now stabilized. You want to quickly fix this issue because your company has a marketing campaign next week and you expect another surge in usage. What should you do?

corretta/e:
- Optimize database queries to reduce read/write operations, and modify the application code to retry the Firestore API call with exponential backoff.

sbagliate:
- Optimize database queries to reduce read/write operations, and modify the application code to retry the Firestore API call with fixed backoff.
- Request a quota increase, and modify the application code to retry the Firestore API call with exponential backoff.
- Request a quota increase, and modify the application code to retry the Firestore API call with fixed backoff.

--------------------------------------------------

16. You are responsible for deploying a new API. That API will have three different URL paths:

• https://yourcompany.com/students
• https://yourcompany.com/teachers
• https://yourcompany.com/classes

You need to configure each API URL path to invoke a different function in your code. What should you do?

corretta/e:
- Create three Cloud Functions as three backend services exposed using an HTTPS load balancer.

sbagliate:
- Create one Cloud Function exposed directly.
- Create one Cloud Function as a backend service exposed using an HTTPS load balancer.
- Create three Cloud Functions exposed directly.

--------------------------------------------------

17. You are deploying your application to a Compute Engine virtual machine instance. Your application is configured to write its log files to disk. You want to view the logs in Stackdriver Logging without changing the application code.
What should you do?

corretta/e:
- Install the Stackdriver Logging Agent and configure it to send the application logs.

sbagliate:
- Change the application to log to /var/log so that its logs are automatically sent to Stackdriver Logging.
- Provide the log file folder path in the metadata of the instance to configure it to send the application logs.
- Use a Stackdriver Logging Library to log directly from the application to Stackdriver Logging.

--------------------------------------------------

18. You work for a company that operates an ecommerce website. You are developing a new integration that will manage all order fulfillment steps after orders are placed. You have created multiple Cloud Functions to process each order. You need to orchestrate the execution of the functions, using the output of each function to determine the flow. You want to minimize the latency of this process. What should you do?

corretta/e:
- Use Workflows to call the functions, and use conditional jumps to handle the execution logic.

sbagliate:
- Use Workflows to call the functions, and use callbacks to handle the execution logic.
- Use Cloud Composer to call the functions, and use an Apache Airflow HTTP operator to handle the execution logic.
- Use Cloud Composer to call the functions, and use an Apache Airflow operator to handle the execution logic.

--------------------------------------------------

19. Your application performs well when tested locally, but it runs significantly slower after you deploy it to a Compute Engine instance. You need to diagnose the problem. What should you do?
What should you do?

corretta/e:
- Use Cloud Profiler to determine which functions within the application take the longest amount of time.

sbagliate:
- Add logging commands to the application and use Cloud Logging to check where the latency problem occurs.
- File a ticket with Cloud Support indicating that the application performs faster locally.
- Use Cloud Debugger snapshots to look at a point-in-time execution of the application.

--------------------------------------------------

20. Your team is responsible for developing multiple microservices. These microservices are deployed in Cloud Run and connected to a Cloud SQL instance. You typically conduct tests in a local environment prior to deploying new features. However, the external IP was recently removed from your Cloud SQL instance, and you are unable to perform the tests. You need to connect to the database to conduct tests with the most updated data. You want to follow Google-recommended practices. What should you do?

corretta/e:
- Create a VM in the same VPC as the Cloud SQL instance. Connect to the VM by using Identity-Aware Proxy for TCP forwarding. Install and configure the Cloud SQL Auth Proxy.

sbagliate:
- Add your IP as an authorized network on the Cloud SQL instance.
- Create a Cloud VPN tunnel from your computer to your Google Cloud project, and connect to the Cloud SQL instance.
- Export the data from the database to a Cloud Storage bucket. Create a database on your computer and import the data.

--------------------------------------------------

21. You need to build a public API that authenticates, enforces quotas, and reports metrics for API callers. Which tool should you use to complete this architecture?

//IMG//

corretta/e:
- Cloud Endpoints

sbagliate:
- GKE Ingress for HTTP(S) Load Balancing
- Identity-Aware Proxy
- App Engine

--------------------------------------------------

22. You work for an ecommerce company, and you are responsible for deploying and managing multiple APIs. The operations team wants to review the traffic patterns in the orders-prod and users-prod environments. These are the only environments in the store-prod environment group. You want to follow Google-recommended practices. What should you do?

corretta/e:
- Assign the Apigee Analytics Viewer IAM role to the operations team for both environments. Use Apigee API Analytics to review traffic patterns.

sbagliate:
- Assign the Apigee Analytics Viewer IAM role to the operations team for both environments. Use Cloud Monitoring to review traffic patterns.
- Assign the Apigee API Reader IAM role to each user of the operations team for both environments. Use Cloud Monitoring to review traffic patterns.
- Assign the Apigee API Reader IAM role to each user of the operations team for both environments. Use Apigee API Analytics to review traffic patterns.

--------------------------------------------------

23. You are developing an event-driven application. You have created a topic to receive messages sent to Pub/Sub. You want those messages to be processed in real time. You need the application to be independent from any other system and only incur costs when new messages arrive. How should you configure the architecture?

corretta/e:
- Deploy your code on Cloud Functions. Use a Pub/Sub trigger to handle new messages in the topic.

sbagliate:
- Deploy your code on Cloud Functions. Use a Pub/Sub trigger to invoke the Cloud Function. Use the Pub/Sub API to create a pull subscription to the Pub/Sub topic and read messages from it.
- Deploy the application on Google Kubernetes Engine. Use the Pub/Sub API to create a pull subscription to the Pub/Sub topic and read messages from it.
- Deploy the application on Compute Engine. Use a Pub/Sub push subscription to process new messages in the topic.

--------------------------------------------------

24. You have an application deployed in production. When a new version is deployed, you want to ensure that all production traffic is routed to the new version of your application. You also want to keep the previous version deployed so that you can revert to it if there is an issue with the new version.
Which deployment strategy should you use?

corretta/e:
- Blue/green deployment

sbagliate:
- Rolling deployment
- Canary deployment
- Recreate deployment

--------------------------------------------------

25. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal wants to improve the resilience of their MySQL deployment, while also meeting their business and technical requirements.
Which configuration should they choose?

corretta/e:
- Replace the current single instance MySQL instance with Cloud SQL, and configure high availability.

sbagliate:
- Use the current single instance MySQL on Compute Engine, and replicate the data to Cloud SQL in an external master configuration.
- Replace the current single instance MySQL instance with Cloud SQL, and Google provides redundancy without further configuration.
- Use the current single instance MySQL on Compute Engine and several read-only MySQL servers on Compute Engine.

--------------------------------------------------

26. You use Cloud Build to build and test container images prior to deploying them to Cloud Run. Your images are stored in Artifact Registry. You need to ensure that only container images that have passed testing are deployed. You want to minimize operational overhead. What should you do?

corretta/e:
- Enable Binary Authorization on your Cloud Run service. Create an attestation if the container image has passed all tests. Configure Binary Authorization to allow only images with appropriate attestation to be deployed to the Cloud Run service.

sbagliate:
- Deploy a new revision to a Cloud Run service. Assign a tag that allows access to the revision at a specific URL without serving traffic. Test that revision again. Migrate the traffic to the Cloud Run service after you confirm that the new revision is performing as expected.
- Configure build provenance on your Cloud Build pipeline. Verify that all the tests have passed, and then deploy the image to a Cloud Run service.
- Create a GKE cluster. Verify that all tests have passed, and then deploy the image to the GKE cluster.

--------------------------------------------------

27. Your website is deployed on Compute Engine. Your marketing team wants to test conversion rates between 3 different website designs.
Which approach should you use?

corretta/e:
- Deploy the website on App Engine and use traffic splitting.

sbagliate:
- Deploy the website on Cloud Functions and use traffic splitting.
- Deploy the website on App Engine as three separate services.
- Deploy the website on Cloud Functions as three separate functions.

--------------------------------------------------

28. You are developing a microservice-based application that will run on Google Kubernetes Engine (GKE). Some of the services need to access different Google Cloud APIs. How should you set up authentication of these services in the cluster following Google-recommended best practices? (Choose two.)

corretta/e:
- 

sbagliate:
- Access the Google service account keys from a secret management service.
- Store the Google service account keys in a central secret management service.
- Use gcloud to bind the Kubernetes service account and the Google service account using roles/iam.workloadIdentity.
- Use the service account attached to the GKE node.
- Enable Workload Identity in the cluster via the gcloud command-line tool.

--------------------------------------------------

29. You work at a rapidly growing financial technology startup. You manage the payment processing application written in Go and hosted on Cloud Run in the Singapore region (asia-southeast1). The payment processing application processes data stored in a Cloud Storage bucket that is also located in the Singapore region.

The startup plans to expand further into the Asia Pacific region. You plan to deploy the Payment Gateway in Jakarta, Hong Kong, and Taiwan over the next six months. Each location has data residency requirements that require customer data to reside in the country where the transaction was made. You want to minimize the cost of these deployments. What should you do?

corretta/e:
- Create a Cloud Storage bucket in each region, and create a Cloud Run service of the payment processing application in each region.

sbagliate:
- Create three Cloud Storage buckets in the Asia multi-region, and create three Cloud Run revisions of the payment processing application in the Singapore region.
- Create a Cloud Storage bucket in each region, and create three Cloud Run services of the payment processing application in the Singapore region.
- Create three Cloud Storage buckets in the Asia multi-region, and create three Cloud Run services of the payment processing application in the Singapore region.

--------------------------------------------------

30. Your company’s corporate policy states that there must be a copyright comment at the very beginning of all source files. You want to write a custom step in Cloud Build that is triggered by each source commit. You need the trigger to validate that the source contains a copyright and add one for subsequent steps if not there. What should you do?

corretta/e:
- Build a new Docker container that examines the files in /workspace and then checks and adds a copyright for each source file. Changed files are explicitly committed back to the source repository.

sbagliate:
- Build a new Docker container that examines the files in a Cloud Storage bucket and then checks and adds a copyright for each source file. Changed files are written back to the Cloud Storage bucket.
- Build a new Docker container that examines the files in /workspace and then checks and adds a copyright for each source file. Changed files do not need to be committed back to the source repository.
- Build a new Docker container that examines the files in a Cloud Storage bucket and then checks and adds a copyright for each source file. Changed files are explicitly committed back to the source repository.

--------------------------------------------------

31. You are developing an ecommerce web application that uses App Engine standard environment and Memorystore for Redis. When a user logs into the app, the application caches the user's information (e.g., session, name, address, preferences), which is stored for quick retrieval during checkout.
While testing your application in a browser, you get a 502 Bad Gateway error. You have determined that the application is not connecting to Memorystore. What is the reason for this error?

corretta/e:
- You configured your Serverless VPC Access connector in a different region than your App Engine instance.

sbagliate:
- You configured your application to use a Serverless VPC Access connector on a different subnet in a different availability zone than your App Engine instance.
- The firewall rule allowing a connection between App Engine and Memorystore was removed during an infrastructure update by the DevOps team.
- Your Memorystore for Redis instance was deployed without a public IP address.

--------------------------------------------------

32. Your company's security team uses Identity and Access Management (IAM) to track which users have access to which resources. You need to create a version control system that can integrate with your security team's processes. You want your solution to support fast release cycles and frequent merges to your main branch to minimize merge conflicts. What should you do?

corretta/e:
- Create a Cloud Source Repositories repository, and use trunk-based development.

sbagliate:
- Create a GitHub repository, mirror it to a Cloud Source Repositories repository, and use trunk-based development.
- Create a Cloud Source Repositories repository, and use feature-based development.
- Create a GitHub repository, mirror it to a Cloud Source Repositories repository, and use feature-based development.

--------------------------------------------------

33. You have been tasked with planning the migration of your company's application from on-premises to Google Cloud. Your company's monolithic application is an ecommerce website. The application will be migrated to microservices deployed on Google Cloud in stages. The majority of your company's revenue is generated through online sales, so it is important to minimize risk during the migration. You need to prioritize features and select the first functionality to migrate. What should you do?

corretta/e:
- Migrate the Product catalog, which has integrations to the frontend and product database.

sbagliate:
- Migrate Order fulfillment, which has integrations to the order database, inventory system, and third-party shipping vendor.
- Migrate the Shopping cart, which has integrations to the frontend, cart database, inventory system, and payment processing system.
- Migrate Payment processing, which has integrations to the frontend, order database, and third-party payment vendor.

--------------------------------------------------

34. There are three teams developing an ecommerce application in the same Google Cloud project. Team A will build a set of RESTful APIs that exposes some core functionalities for the application. Team B and Team C will make requests to those APIs in their downstream processes running on Cloud Run services. You need to propose a solution for exposing the APIs in a way that maximizes security and minimizes management overhead for the three teams. How should you design this solution?

corretta/e:
- 1. Team A uses service accounts to authorize Cloud API Gateway. Team B and Team C each create a service account that has access to the APIs.
2. Team B and Team C access the APIs in the Cloud Run service running their processes by using the service accounts attached to their service.

sbagliate:
- 1. Team A uses service accounts to authorize Cloud API Gateway. Team B and Team C each create a service account, export their service account's key, and store each key in a separate secret in Secret Manager.
2. Team B and Team C use this service account key to create an OAuth token to access the APIs.
- 1. Team A uses an API key to authorize Cloud API Gateway and shares the key with Team B and Team C.
2. Team B and Team C store the API key in a secret in Secret Manager, and use this API key to access the API endpoint.
- 1. Team A uses Apigee hybrid to create an API key and shares that key with Team B and Team C.
2. Team B and Team C store the API key in a secret in Secret Manager, and use this API key to access the API endpoint.

--------------------------------------------------

35. Your operations team has asked you to create a script that lists the Cloud Bigtable, Memorystore, and Cloud SQL databases running within a project. The script should allow users to submit a filter expression to limit the results presented. How should you retrieve the data?

corretta/e:
- Run gcloud bigtable instances list, gcloud redis instances list, and gcloud sql databases list. Use --filter flag with each command, and then display the results

sbagliate:
- Use the HBase API, Redis API, and MySQL connection to retrieve database lists. Combine the results, and then apply the filter to display the results
- Use the HBase API, Redis API, and MySQL connection to retrieve database lists. Filter the results individually, and then combine them to display the results
- Run gcloud bigtable instances list, gcloud redis instances list, and gcloud sql databases list. Use a filter within the application, and then display the results

--------------------------------------------------

36. Your team develops services that run on Google Kubernetes Engine. You need to standardize their log data using Google-recommended practices and make the data more useful in the fewest number of steps. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Create aggregated exports on application logs to Cloud Storage to facilitate log analytics.
- Mandate the use of the Pub/Sub API to write structured data to Pub/Sub and create a Dataflow streaming pipeline to normalize logs and write them to BigQuery for analytics.
- Mandate the use of the Logging API in the application code to write structured logs to Cloud Logging.
- Create aggregated exports on application logs to BigQuery to facilitate log analytics.
- Write log output to standard output (stdout) as single-line JSON to be ingested into Cloud Logging as structured logs.

--------------------------------------------------

37. You are developing a container build pipeline for an application hosted on GKE. You have the following requirements:

• Only images that are created using your build pipeline should be deployed on your GKE cluster.
• All code and build artifacts should remain within your environment and protected from data exfiltration.

How should you build the pipeline?

corretta/e:
- 1. Create a build pipeline by using Cloud Build with a private worker pool.
2. Use VPC Service Controls to place all components and services in your CI/CD pipeline inside a security perimeter.
3. Configure your GKE cluster to only allow container images signed by Binary Authorization.

sbagliate:
- 1. Create a build pipeline by using Cloud Build with a private worker pool.
2. Configure the CI/CD pipeline to build container images and store them in Artifact Registry.
3. Configure Artifact Registry to encrypt container images by using customer-managed encryption keys (CMEK).
- 1. Create a build pipeline by using Cloud Build with the default worker pool.
2. Configure the CI/CD pipeline to build container images and store them in Artifact Registry.
3. Configure your GKE cluster to only allow container images signed by Binary Authorization.
- 1. Create a build pipeline by using Cloud Build with the default worker pool.
2. Deploy container images to a private container registry in your VPC.
3. Create a VPC firewall policy in your project that denies all egress and ingress traffic to public networks.

--------------------------------------------------

38. You work for a web development team at a small startup. Your team is developing a Node.js application using Google Cloud services, including Cloud Storage and Cloud Build. The team uses a Git repository for version control. Your manager calls you over the weekend and instructs you to make an emergency update to one of the company's websites, and you're the only developer available. You need to access Google Cloud to make the update, but you don't have your work laptop. You are not allowed to store source code locally on a non-corporate computer. How should you set up your developer environment?

corretta/e:
- Use Cloud Shell and the built-in code editor for development. Send your source code updates as pull requests.

sbagliate:
- Use a text editor and the Git command line to send your source code updates as pull requests from a virtual machine running on a public computer.
- Use a Cloud Storage bucket to store the source code that you need to edit. Mount the bucket to a public computer as a drive, and use a code editor to update the code. Turn on versioning for the bucket, and point it to the team's Git repository.
- Use a text editor and the Git command line to send your source code updates as pull requests from a public computer.

--------------------------------------------------

39. Users are complaining that your Cloud Run-hosted website responds too slowly during traffic spikes. You want to provide a better user experience during traffic peaks. What should you do?

corretta/e:
- Package application configuration and static data into the application image during build time.

sbagliate:
- Ensure that timeout exceptions and errors cause the Cloud Run instance to exit quickly so a replacement instance can be started.
- Read application configuration and static data from the database on application startup.
- Perform as much work as possible in the background after the response has been returned to the user.

--------------------------------------------------

40. You are developing a new application that has the following design requirements:
✑ Creation and changes to the application infrastructure are versioned and auditable.
✑ The application and deployment infrastructure uses Google-managed services as much as possible.
✑ The application runs on a serverless compute platform.
How should you design the application's architecture?

corretta/e:
- 1. Store the application and infrastructure source code in a Git repository. 2. Use Cloud Build to deploy the application infrastructure with Terraform. 3. Deploy the application to a Cloud Function as a pipeline step.

sbagliate:
- 1. Create a continuous integration pipeline on Cloud Build, and configure the pipeline to deploy the application infrastructure using Deployment Manager templates. 2. Configure a pipeline step to create a container with the latest application source code. 3. Deploy the container to a Compute Engine instance as a pipeline step.
- 1. Deploy the application infrastructure using gcloud commands. 2. Use Cloud Build to define a continuous integration pipeline for changes to the application source code. 3. Configure a pipeline step to pull the application source code from a Git repository, and create a containerized application. 4. Deploy the new container on Cloud Run as a pipeline step.
- 1. Deploy Jenkins from the Google Cloud Marketplace, and define a continuous integration pipeline in Jenkins. 2. Configure a pipeline step to pull the application source code from a Git repository. 3. Deploy the application source code to App Engine as a pipeline step.

--------------------------------------------------

41. Your application named ecom-web-app is deployed in three GKE clusters: ecom-web-app-dev, ecom-web-app-qa, and ecom-web-app-prod. You need to ensure that only trusted container images are deployed to the ecom-web-app-prod GKE cluster in the production environment while following Google-recommended practices. What should you do?

corretta/e:
- Set up Binary Authorization, and define cluster-specific rules in clusterAdmissionRules nodes in the policy YAML file.

sbagliate:
- Set up an image verification process that scans the container images in Artifact Registry for vulnerabilities and tags the image versions that fail the scan as untrusted.
- Set up Binary Authorization, and exempt any container images that are not deployed to the ecom-web-app-prod GKE cluster.
- Set up an image verification process by using Cloud Functions where the function is invoked when a container image is built in Cloud Build and ensures that only trusted container images are stored in Artifact Registry.

--------------------------------------------------

42. You are responsible for developing a new ecommerce application that is running on Cloud Run. You need to connect your application to a Cloud SQL database that is in a separate project. This project is on an isolated network dedicated to multiple databases without a public IP. You need to connect your application to this database. What should you do?

corretta/e:
- Create a subnet on your VPC. Create a Serverless VPC Access connector on your project using the new subnet. In Cloud Run, create a Cloud SQL connection. Use Cloud SQL Language Connectors to interact with the database.

sbagliate:
- Configure VPC Network Peering between both networks. In Cloud Run, create a Cloud SQL connection that uses the internal IP. Use Cloud SQL Language Connectors to interact with the database.
- Configure private services access on your project. In Cloud Run, create a Cloud SQL connection. Use Cloud SQL Language Connectors to interact with the database.
- Create a Private Service Connect endpoint on your network. Create a Serverless VPC Access connector on your project. Use Cloud SQL Language Connectors to create an internal connection.

--------------------------------------------------

43. Your development team has built several Cloud Functions using Java along with corresponding integration and service tests. You are building and deploying the functions and launching the tests using Cloud Build. Your Cloud Build job is reporting deployment failures immediately after successfully validating the code. What should you do?

corretta/e:
- Verify that the Cloud Build service account is assigned the Cloud Functions Developer role.

sbagliate:
- Verify that your Cloud Build trigger has the correct build parameters.
- Check the maximum number of Cloud Function instances.
- Retry the tests using the truncated exponential backoff polling strategy.

--------------------------------------------------

44. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal's .net-based auth service fails under intermittent load.
What should they do?

corretta/e:
- Use App Engine for autoscaling.

sbagliate:
- Use Cloud Functions for autoscaling.
- Use a Compute Engine cluster for the service.
- Use a dedicated Compute Engine virtual machine instance for the service.

--------------------------------------------------

45. You need to copy directory local-scripts and all of its contents from your local workstation to a Compute Engine virtual machine instance.
Which command should you use?

corretta/e:
- gcloud compute scp --project ג€my-gcp-projectג€ --recurse ~/local-scripts/ gcp-instance-name:~/server-scripts/ --zone ג€us-east1-bג€

sbagliate:
- gsutil cp --project ג€my-gcp-projectג€ -R ~/local-scripts/ gcp-instance-name:~/server-scripts/ --zone ג€us-east1-bג€
- gcloud compute mv --project ג€my-gcp-projectג€ --recurse ~/local-scripts/ gcp-instance-name:~/server-scripts/ --zone ג€us-east1-bג€
- gsutil cp --project ג€my-gcp-projectג€ -r ~/local-scripts/ gcp-instance-name:~/server-scripts/ --zone ג€us-east1-bג€

--------------------------------------------------

46. Your teammate has asked you to review the code below. Its purpose is to efficiently add a large number of small rows to a BigQuery table.
//IMG//

Which improvement should you suggest your teammate make?

corretta/e:
- Include multiple rows with each request.

sbagliate:
- Write each row to a Cloud Storage object, then load into BigQuery.
- Perform the inserts in parallel by creating multiple threads.
- Write each row to a Cloud Storage object in parallel, then load into BigQuery.

--------------------------------------------------

47. You are designing a schema for a Cloud Spanner customer database. You want to store a phone number array field in a customer table. You also want to allow users to search customers by phone number.
How should you design this schema?

corretta/e:
- Create a table named Customers as a parent table. Create a table named Phones, and interleave this table into the Customer table. Create an index on the phone number field in the Phones table.

sbagliate:
- Create a table named Customers. Add an Array field in a table that will hold phone numbers for the customer.
- Create a table named Customers. Create a table named Phones. Add a CustomerId field in the Phones table to find the CustomerId from a phone number.
- Create a table named Customers. Add an Array field in a table that will hold phone numbers for the customer. Create a secondary index on the Array field.

--------------------------------------------------

48. You are developing an application that will store and access sensitive unstructured data objects in a Cloud Storage bucket. To comply with regulatory requirements, you need to ensure that all data objects are available for at least 7 years after their initial creation. Objects created more than 3 years ago are accessed very infrequently (less than once a year). You need to configure object storage while ensuring that storage cost is optimized. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Create an object lifecycle policy on the bucket that moves objects from Standard Storage to Archive Storage after 3 years.
- Set a retention policy on the bucket with a period of 7 years.
- Enable Object Versioning to prevent objects from being accidentally deleted for 7 years after object creation.
- Use IAM Conditions to provide access to objects 7 years after the object creation date.
- Implement a Cloud Function that checks the age of each object in the bucket and moves the objects older than 3 years to a second bucket with the Archive Storage class. Use Cloud Scheduler to trigger the Cloud Function on a daily schedule.

--------------------------------------------------

49. You developed a JavaScript web application that needs to access Google Drive's API and obtain permission from users to store files in their Google Drives. You need to select an authorization approach for your application. What should you do?

corretta/e:
- Create an OAuth Client ID.

sbagliate:
- Create an API key.
- Create a SAML token.
- Create a service account.

--------------------------------------------------

50. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal's APIs are having occasional application failures. They want to collect application information specifically to troubleshoot the issue. What should they do?

corretta/e:
- Install the Cloud Logging agent on the virtual machines.

sbagliate:
- Install the Cloud Monitoring agent on the virtual machines.
- Use Cloud Trace to look for performance bottlenecks.
- Take frequent snapshots of the virtual machines.

--------------------------------------------------

51. Your application is deployed in a Google Kubernetes Engine (GKE) cluster. You want to expose this application publicly behind a Cloud Load Balancing HTTP(S) load balancer.
What should you do?

corretta/e:
- Configure a GKE Ingress resource.

sbagliate:
- Configure a GKE Service resource with type: LoadBalancer.
- Configure a GKE Ingress resource with type: LoadBalancer.
- Configure a GKE Service resource.

--------------------------------------------------

52. Your team develops services that run on Google Cloud. You need to build a data processing service and will use Cloud Functions. The data to be processed by the function is sensitive. You need to ensure that invocations can only happen from authorized services and follow Google-recommended best practices for securing functions. What should you do?

corretta/e:
- Create a service account with the Cloud Functions Invoker role. Use that service account to invoke the function.

sbagliate:
- Create a service account with the Cloud Functions Viewer role. Use that service account to invoke the function.
- Create an OAuth 2.0 client ID for your calling service in the same project as the function you want to secure. Use those credentials to invoke the function.
- Enable Identity-Aware Proxy in your project. Secure function access using its permissions.

--------------------------------------------------

53. You have an application deployed in Google Kubernetes Engine (GKE) that reads and processes Pub/Sub messages. Each Pod handles a fixed number of messages per minute. The rate at which messages are published to the Pub/Sub topic varies considerably throughout the day and week, including occasional large batches of messages published at a single moment.

You want to scale your GKE Deployment to be able to process messages in a timely manner. What GKE feature should you use to automatically adapt your workload?

corretta/e:
- Horizontal Pod Autoscaler based on an external metric

sbagliate:
- Vertical Pod Autoscaler in Auto mode
- Horizontal Pod Autoscaler based on resources utilization
- Vertical Pod Autoscaler in Recommendation mode

--------------------------------------------------

54. You are a developer at a large organization. Your team uses Git for source code management (SCM). You want to ensure that your team follows Google-recommended best practices to manage code to drive higher rates of software delivery. Which SCM process should your team use?

corretta/e:
- Each developer creates a branch for their own work, commits their changes to their branch, and merges their code into the main branch daily.

sbagliate:
- Each developer commits their code to the main branch before each product release, conducts testing, and rolls back if integration issues are detected.
- Each group of developers creates a feature branch from the main branch for their work, commits their changes to their branch, and merges their code into the main branch before each major release.
- Each group of developers copies the repository, commits their changes to their repository, and merges their code into the main repository before each product release.

--------------------------------------------------

55. You are developing an application component to capture user behavior data and stream the data to BigQuery. You plan to use the BigQuery Storage Write API. You need to ensure that the data that arrives in BigQuery does not have any duplicates. You want to use the simplest operational method to achieve this. What should you do?

corretta/e:
- Create a write stream in the committed type.

sbagliate:
- Configure a Pub/Sub topic. Use Cloud Functions to subscribe to the topic and remove any duplicates.
- Configure a Kafka cluster. Use a primary universally unique identifier (UUID) for duplicate messages.
- Create a write stream in the default type.

--------------------------------------------------

56. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal wants to reduce the number of on-call engineers and eliminate manual scaling.
Which two services should they choose? (Choose two.)

corretta/e:
- 

sbagliate:
- Use serverless Google Cloud Functions.
- Use a large Google Compute Engine cluster for deployments.
- Use Google Kubernetes Engine for automated deployments.
- Use Knative to build and deploy serverless applications.
- Use Google App Engine services.

--------------------------------------------------

57. You work for a financial services company that has a container-first approach. Your team develops microservices applications. You have a Cloud Build pipeline that creates a container image, runs regression tests, and publishes the image to Artifact Registry. You need to ensure that only containers that have passed the regression tests are deployed to GKE clusters. You have already enabled Binary Authorization on the GKE clusters. What should you do next?

corretta/e:
- Create an attestor and a policy. Create an attestation for the container images that have passed the regression tests as a step in the Cloud Build pipeline.

sbagliate:
- Create an attestor and a policy. Run a vulnerability scan to create an attestation for the container image as a step in the Cloud Build pipeline.
- Set the Pod Security Standard level to Restricted for the relevant namespaces. Digitally sign the container images that have passed the regression tests as a step in the Cloud Build pipeline.
- Deploy Voucher Server and Voucher Client components. After a container image has passed the regression tests, run Voucher Client as a step in the Cloud Build pipeline.

--------------------------------------------------

58. You have recently instrumented a new application with OpenTelemetry, and you want to check the latency of your application requests in Trace. You want to ensure that a specific request is always traced. What should you do?

corretta/e:
- Add the X-Cloud-Trace-Context header to the request with the appropriate parameters.

sbagliate:
- Wait 10 minutes, then verify that Trace captures those types of requests automatically.
- Write a custom script that sends this type of request repeatedly from your dev project.
- Use the Trace API to apply custom attributes to the trace.

--------------------------------------------------

59. You have a web application that publishes messages to Pub/Sub. You plan to build new versions of the application locally and need to quickly test Pub/Sub integration for each new build. How should you configure local testing?

corretta/e:
- Install the Pub/Sub emulator using gcloud, and start the emulator with a valid Google Project ID. When developing locally, configure your applicat.cn to use the local emulator by exporting the PUBSUB_EMULATOR_HOST variable.

sbagliate:
- Install Cloud Code on the integrated development environment (IDE). Navigate to Cloud APIs, and enable Pub/Sub against a valid Google Project IWhen developing locally, configure your application to call pubsub.googleapis.com.
- Run the gcloud config set api_endpoint_overrides/pubsub https://pubsubemulator.googleapis.com.com/ command to change the Pub/Sub endpoint prior to starting the application.
- In the Google Cloud console, navigate to the API Library, and enable the Pub/Sub API. When developing locally configure your application to call pubsub.googleapis.com.

--------------------------------------------------

60. You have decided to migrate your Compute Engine application to Google Kubernetes Engine. You need to build a container image and push it to Artifact Registry using Cloud Build. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- In the application source directory, create a file named cloudbuild.yaml that contains the following contents:
- Run gcloud builds submit in the directory that contains the application source code.
- In the application source directory, create a file named cloudbuild.yaml that contains the following contents:
- Run gcloud run deploy app-name --image gcr.io/$PROJECT_ID/app-name in the directory that contains the application source code.
- Run gcloud container images add-tag gcr.io/$PROJECT_ID/app-name gcr.io/$PROJECT_ID/app-name:latest in the directory that contains the application source code.

--------------------------------------------------

61. You are developing a discussion portal that is built on Cloud Run. Incoming external requests are routed through a set of microservices before a response is sent. Some of these microservices connect to databases. You need to run a load test to identify any bottlenecks in the application when it is under load. You want to follow Google-recommended practices. What should you do?

corretta/e:
- Configure Cloud Trace to capture the requests from the load testing clients. Review the timings in Cloud Trace.

sbagliate:
- Modify the response to include a time series that shows elapsed time per service. Use Log Analytics in Cloud Logging to create a heatmap that exposes any service that could be a bottleneck.
- Add log statements that capture elapsed time. Analyze the logs and metrics by using BigQuery.
- Expose the latency metrics per service for each request. Configure Google Cloud Managed Service for Prometheus, and use it to scrape and analyze the metrics.

--------------------------------------------------

62. You are developing a new API that creates requests on an asynchronous message service. Requests will be consumed by different services. You need to expose the API by using a gRPC interface while minimizing infrastructure management overhead. How should you deploy the API?

corretta/e:
- Deploy your API as a Cloud Run service. Create a Pub/Sub topic, and configure your API to push messages to the topic.

sbagliate:
- Deploy your API to App Engine. Create a Pub/Sub topic, and configure your API to push messages to the topic.
- Deploy your API on a Compute Engine instance. Create a Kafka cluster, and configure your API to write messages to the cluster.
- Deploy your API to a GKE cluster. Create a Kafka cluster, and configure your API to write messages to the cluster.

--------------------------------------------------

63. You are planning to deploy your application in a Google Kubernetes Engine (GKE) cluster. The application exposes an HTTP-based health check at /healthz. You want to use this health check endpoint to determine whether traffic should be routed to the pod by the load balancer.
Which code snippet should you include in your Pod configuration?
A.
//IMG//

B.
//IMG//

C.
//IMG//

D.
//IMG//

corretta/e:
- 

sbagliate:

--------------------------------------------------

64. You are developing a microservice-based application that will be deployed on a Google Kubernetes Engine cluster. The application needs to read and write to a
Spanner database. You want to follow security best practices while minimizing code changes. How should you configure your application to retrieve Spanner credentials?

corretta/e:
- Configure the appropriate service accounts, and use Workload Identity to run the pods.

sbagliate:
- Store the application credentials as Kubernetes Secrets, and expose them as environment variables.
- Store the application credentials using Cloud Key Management Service, and retrieve them whenever a database connection is made.
- Configure the appropriate routing rules, and use a VPC-native cluster to directly connect to the database.

--------------------------------------------------

65. Before promoting your new application code to production, you want to conduct testing across a variety of different users. Although this plan is risky, you want to test the new version of the application with production users and you want to control which users are forwarded to the new version of the application based on their operating system. If bugs are discovered in the new version, you want to roll back the newly deployed version of the application as quickly as possible.

What should you do?

corretta/e:
- Deploy your application on Google Kubernetes Engine with Anthos Service Mesh. Use traffic splitting to direct a subset of user traffic to the new version based on the user-agent header.

sbagliate:
- Deploy your application on Cloud Run. Use traffic splitting to direct a subset of user traffic to the new version based on the revision tag.
- Deploy your application on Compute Engine. Use Traffic Director to direct a subset of user traffic to the new version based on predefined weights.
- Deploy your application on App Engine. Use traffic splitting to direct a subset of user traffic to the new version based on the IP address.

--------------------------------------------------

66. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

HipLocal's application uses Cloud Client Libraries to interact with Google Cloud. HipLocal needs to configure authentication and authorization in the Cloud Client Libraries to implement least privileged access for the application. What should they do?

corretta/e:
- Create a service account for the application. Export and deploy the private key for the application. Use the service account to interact with Google Cloud.

sbagliate:
- Use the default compute service account to interact with Google Cloud.
- Create an API key. Use the API key to interact with Google Cloud.
- Create a service account for the application and for each Google Cloud API used by the application. Export and deploy the private keys used by the application. Use the service account with one Google Cloud API to interact with Google Cloud.

--------------------------------------------------

67. Your company stores their source code in a Cloud Source Repositories repository. Your company wants to build and test their code on each source code commit to the repository and requires a solution that is managed and has minimal operations overhead.
Which method should they use?

corretta/e:
- Use Cloud Build with a trigger configured for each source code commit.

sbagliate:
- Use a source code commit trigger to push a message to a Cloud Pub/Sub topic that triggers an App Engine service to build the source code.
- Use a Compute Engine virtual machine instance with an open source continuous integration tool, configured to watch for source code commits.
- Use Jenkins deployed via the Google Cloud Platform Marketplace, configured to watch for source code commits.

--------------------------------------------------

68. You have an application running on a GKE cluster. Your application has a stateless web frontend, and has a high-availability requirement. Your cluster is set to automatically upgrade, and some of your nodes need to be drained. You need to ensure that the application has a serving capacity of 10% of the Pods prior to the drain. What should you do?

corretta/e:
- Configure a Pod Disruption Budget (PDB) value to have a minAvailable value of 10%.

sbagliate:
- Configure a Vertical Pod Autoscaler (VPA) to increase the memory and CPU by 10% and set the updateMode to Auto.
- Configure the Pod replica count to be 10% more than the current replica count.
- Configure the Horizontal Pod Autoscaler (HPA) maxReplicas value to 10% more than the current replica count.

--------------------------------------------------

69. You are running a web application on Google Kubernetes Engine that you inherited. You want to determine whether the application is using libraries with known vulnerabilities or is vulnerable to XSS attacks. Which service should you use?

corretta/e:
- Web Security Scanner

sbagliate:
- Debugger
- Google Cloud Armor
- Error Reporting

--------------------------------------------------

70. You manage an application that runs in a Compute Engine instance. You also have multiple backend services executing in stand-alone Docker containers running in Compute Engine instances. The Compute Engine instances supporting the backend services are scaled by managed instance groups in multiple regions. You want your calling application to be loosely coupled. You need to be able to invoke distinct service implementations that are chosen based on the value of an HTTP header found in the request. Which Google Cloud feature should you use to invoke the backend services?

corretta/e:
- Traffic Director

sbagliate:
- Anthos Service Mesh
- Service Directory
- Internal HTTP(S) Load Balancing

--------------------------------------------------

71. You are designing an application that will subscribe to and receive messages from a single Pub/Sub topic and insert corresponding rows into a database. Your application runs on Linux and leverages preemptible virtual machines to reduce costs. You need to create a shutdown script that will initiate a graceful shutdown.
What should you do?

corretta/e:
- Write a shutdown script that uses inter-process signals to notify the application process to disconnect from the database.

sbagliate:
- Write a shutdown script that broadcasts a message to all signed-in users that the Compute Engine instance is going down and instructs them to save current work and sign out.
- Write a shutdown script that writes a file in a location that is being polled by the application once every five minutes. After the file is read, the application disconnects from the database.
- Write a shutdown script that publishes a message to the Pub/Sub topic announcing that a shutdown is in progress. After the application reads the message, it disconnects from the database.

--------------------------------------------------

72. You have an on-premises containerized service written in the current stable version of Python 3 that is available only to users in the United States. The service has high traffic during the day and no traffic at night. You need to migrate this application to Google Cloud and track error logs after the migration in Error Reporting. You want to minimize the cost and effort of these tasks. What should you do?

corretta/e:
- Deploy the code on Cloud Run. Configure your code to write errors to standard error.

sbagliate:
- Deploy the code on Cloud Run. Configure your code to stream errors to a Cloud Storage bucket.
- Deploy the code on a GKE Autopilot cluster. Configure your code to write error logs to standard error.
- Deploy the code on a GKE Autopilot cluster. Configure your code to write error logs to a Cloud Storage bucket.

--------------------------------------------------

73. You manage a system that runs on stateless Compute Engine VMs and Cloud Run instances. Cloud Run is connected to a VPC, and the ingress setting is set to Internal. You want to schedule tasks on Cloud Run. You create a service account and grant it the roles/run.invoker Identity and Access Management (IAM) role. When you create a schedule and test it, a 403 Permission Denied error is returned in Cloud Logging. What should you do?

corretta/e:
- Use Cloud Scheduler with Pub/Sub to invoke Cloud Run.

sbagliate:
- Change the Cloud Run ingress setting to 'Internal and Cloud Load Balancing.'
- Configure a cron job on the Compute Engine VMs to trigger Cloud Run on schedule.
- Grant the service account the roles/run.developer IAM role.

--------------------------------------------------

74. You are developing a flower ordering application. Currently you have three microservices:
• Order Service (receives the orders)
• Order Fulfillment Service (processes the orders)
• Notification Service (notifies the customer when the order is filled)

You need to determine how the services will communicate with each other. You want incoming orders to be processed quickly and you need to collect order information for fulfillment. You also want to make sure orders are not lost between your services and are able to communicate asynchronously. How should the requests be processed?

corretta/e:
- 

sbagliate:
- 
- 
- 

--------------------------------------------------

75. You are planning to deploy your application in a Google Kubernetes Engine (GKE) cluster. Your application can scale horizontally, and each instance of your application needs to have a stable network identity and its own persistent disk.
Which GKE object should you use?

corretta/e:
- StatefulSet

sbagliate:
- ReplicaSet
- Deployment
- ReplicaController

--------------------------------------------------

76. You manage an ecommerce application that processes purchases from customers who can subsequently cancel or change those purchases. You discover that order volumes are highly variable and the backend order-processing system can only process one request at a time. You want to ensure seamless performance for customers regardless of usage volume. It is crucial that customers' order update requests are performed in the sequence in which they were generated. What should you do?

corretta/e:
- Use a Pub/Sub subscriber in pull mode and use a data store to manage ordering.

sbagliate:
- Use a Pub/Sub subscriber in push mode and use a data store to manage ordering.
- Send the purchase and change requests as REST requests to the backend.
- Send the purchase and change requests over WebSockets to the backend.

--------------------------------------------------

77. You are porting an existing Apache/MySQL/PHP application stack from a single machine to Google
Kubernetes Engine. You need to determine how to containerize the application. Your approach should follow Google-recommended best practices for availability.
What should you do?

corretta/e:
- Package each component in a separate container. Implement readiness and liveness probes.

sbagliate:
- Package the application in a single container. Use a process management tool to manage each component.
- Package the application in a single container. Use a bash script as an entrypoint to the container, and then spawn each component as a background job.
- Package each component in a separate container. Use a script to orchestrate the launch of the components.

--------------------------------------------------

78. You are developing a new ecommerce application that uses Cloud Functions. You want to expose your application's APIs to public users while maintaining a high level of security. You need to ensure that only authorized users can access your APIs and that all API traffic is encrypted and protected from unauthorized access. You want to use the most scalable and secure approach. What should you do?

corretta/e:
- Deploy your Cloud Functions behind an Apigee proxy and use Apigee’s authentication and authorization features to secure your APIs.

sbagliate:
- Deploy your Cloud Functions with Security Command Center enabled, and use IAM to manage access to your APIs.
- Deploy your Cloud Functions behind Cloud Load Balancing, and use Cloud Armor to protect your APIs from distributed denial of service (DDoS) attacks.
- Deploy your Cloud Functions behind a Cloud API Gateway proxy. Create and use an API key to authorize users to access your APIs.

--------------------------------------------------

79. You are creating a web application that runs in a Compute Engine instance and writes a file to any user's Google Drive. You need to configure the application to authenticate to the Google Drive API. What should you do?

corretta/e:
- Use an OAuth Client ID that uses the https://www.googleapis.com/auth/drive.file scope to obtain an access token for each user.

sbagliate:
- Use an OAuth Client ID with delegated domain-wide authority.
- Use the App Engine service account with delegated domain-wide authority.
- Use the App Engine service account and https://www.googleapis.com/auth/drive.file scope to generate a signed JSON Web Token (JWT).

--------------------------------------------------

80. You migrated some of your applications to Google Cloud. You are using a legacy monitoring platform deployed on-premises for both on-premises and cloud- deployed applications. You discover that your notification system is responding slowly to time-critical problems in the cloud applications. What should you do?

corretta/e:
- Use Cloud Logging and Cloud Monitoring to capture logs, monitor, and send alerts. Send them to your existing platform.

sbagliate:
- Install the Cloud Monitoring agent on your Compute Engine instances.
- Replace your monitoring platform with Cloud Monitoring.
- Migrate some traffic back to your old platform. Perform A/B testing on the two platforms concurrently.

--------------------------------------------------

81. Your infrastructure team is responsible for creating and managing Compute Engine VMs. Your team uses the Google Cloud console and gcloud CLI to provision resources for the development environment. You need to ensure that all Compute Engine VMs are labeled correctly for compliance reasons. In case of missing labels, you need to implement corrective actions so the labels are configured accordingly without changing the current deployment process. You want to use the most scalable approach. What should you do?

corretta/e:
- Use a Cloud Audit Logs trigger to invoke a Cloud Function when a Compute Engine VM is created. Check for missing labels and assign them if necessary.

sbagliate:
- Deploy resources with Terraform. Use the gcloud terraform vet command with a policy to ensure that every Compute Engine VM that is provisioned by Terraform has labels set.
- Check all Compute Engine VMs for missing labels regularly. Use the console to assign the labels.
- Write a script to check all Compute Engine VMs for missing labels regularly by using Cloud Scheduler. Use the script to assign the labels.

--------------------------------------------------

82. You migrated your applications to Google Cloud Platform and kept your existing monitoring platform. You now find that your notification system is too slow for time critical problems.
What should you do?

corretta/e:
- Use Stackdriver to capture and alert on logs, then ship them to your existing platform.

sbagliate:
- Migrate some traffic back to your old platform and perform AB testing on the two platforms concurrently.
- Install the Stackdriver agents on your Compute Engine instances.
- Replace your entire monitoring platform with Stackdriver.

--------------------------------------------------

83. Your team is setting up a build pipeline for an application that will run in Google Kubernetes Engine (GKE). For security reasons, you only want images produced by the pipeline to be deployed to your GKE cluster. Which combination of Google Cloud services should you use?

corretta/e:
- Cloud Build, Artifact Registry, and Binary Authorization

sbagliate:
- Google Cloud Deploy, Artifact Registry, and Google Cloud Armor
- Google Cloud Deploy, Cloud Storage, and Google Cloud Armor
- Cloud Build, Cloud Storage, and Binary Authorization

--------------------------------------------------

84. You are preparing to conduct a load test on your Cloud Run service by using JMeter. You need to orchestrate the steps and services to use for an effective load test and analysis. You want to follow Google-recommended practices. What should you do?

corretta/e:
- Set up a Compute Engine instance, install JMeter on the instance, create a log sink to BigQuery, and use Looker Studio to analyze the results.

sbagliate:
- Set up a Compute Engine instance, install JMeter on the instance, create a log sink to a Cloud Storage bucket, and use Looker Studio to analyze the results.
- Install JMeter on your local machine, create a log sink to BigQuery, and use Looker to analyze the results.
- Set up a Compute Engine instance, install JMeter on the instance, create a log sink to a Cloud Storage bucket, and use Looker to analyze the results.

--------------------------------------------------

85. You are responsible for managing the security of internal applications in your company. The applications are deployed on Cloud Run, and use Secret Manager to store passwords needed to access internal databases. Each application can cache secrets for up to 15 minutes. You need to determine how to rotate the secrets. You want to avoid application downtime. What should you do?

corretta/e:
- Store the new password in the secret. Reference the latest version of any secret required, and cache the secret for 15 minutes.

sbagliate:
- Design the applications to retrieve the Latest secret payload on application startup, and continue to use the secret for the duration of the application run.
- Store the new password in the secret. Design the applications to reference a specific secret version. Change the code to reference the new version, and schedule the deployment of the application during a maintenance window.
- Store the new username and password in the secret. Reference the latest version of any secret required, and cache the secret for 15 minutes.

--------------------------------------------------

86. You are deploying a microservices application to Google Kubernetes Engine (GKE) that will broadcast livestreams. You expect unpredictable traffic patterns and large variations in the number of concurrent users. Your application must meet the following requirements:

• Scales automatically during popular events and maintains high availability
• Is resilient in the event of hardware failures

How should you configure the deployment parameters? (Choose two.)

corretta/e:
- 

sbagliate:
- Distribute your workload evenly using a multi-zonal node pool.
- Create alerting policies in Cloud Monitoring based on GKE CPU and memory utilization. Ask an on-duty engineer to scale the workload by executing a script when CPU and memory usage exceed predefined thresholds.
- Create a managed instance group for Compute Engine with the cluster nodes. Configure autoscaling rules for the managed instance group.
- Use cluster autoscaler to resize the number of nodes in the node pool, and use a Horizontal Pod Autoscaler to scale the workload.
- Distribute your workload evenly using multiple zonal node pools.

--------------------------------------------------

87. You are developing a marquee stateless web application that will run on Google Cloud. The rate of the incoming user traffic is expected to be unpredictable, with no traffic on some days and large spikes on other days. You need the application to automatically scale up and down, and you need to minimize the cost associated with running the application. What should you do?

corretta/e:
- Build the application in Python with Firestore as the database. Deploy the application to Cloud Run.

sbagliate:
- Build the application in Python with CloudSQL as the database. Deploy the application to App Engine standard environment.
- Build the application in C# with Firestore as the database. Deploy the application to App Engine flexible environment.
- Build the application in Python with Firestore as the database. Deploy the application to a Compute Engine managed instance group with autoscaling.

--------------------------------------------------

88. You are planning to migrate a MySQL database to the managed Cloud SQL database for Google Cloud. You have Compute Engine virtual machine instances that will connect with this Cloud SQL instance. You do not want to whitelist IPs for the Compute Engine instances to be able to access Cloud SQL.
What should you do?

corretta/e:
- Enable private IP for the Cloud SQL instance.

sbagliate:
- Create a role in Cloud SQL that allows access to the database from external instances, and assign the Compute Engine instances to that role.
- Whitelist a project to access Cloud SQL, and add Compute Engine instances in the whitelisted project.
- Create a CloudSQL instance on one project. Create Compute engine instances in a different project. Create a VPN between these two projects to allow internal access to CloudSQL.

--------------------------------------------------

89. You work for an environmental agency in a large city. You are developing a new monitoring platform that will capture air quality readings from thousands of locations in the city. You want the air quality reading devices to send and receive their data payload to the newly created RESTful backend systems every minute by using a curl command. The backend systems are running in a single cloud region and are using Premium Tier networking. You need to connect the devices to the backend while minimizing the daily average latency, measured by using Time to First Byte (TTFB). How should you build this service?

corretta/e:
- 1 Run the air quality devices' backends in a managed instance group.
2. Create an external Application Load Balancer, and connect it to the managed instance group.
3. Configure a connection between the air quality devices and the Application Load Balancer.

sbagliate:
- 1. Run the air quality devices' backends in a managed instance group.
2. Create an external passthrough Network Load Balancer to connect to the managed instance group.
3. Configure a connection between the air quality devices and the Network Load Balancer.
- 1. Run the air quality devices’ backends on Compute Engine VMs.
2. Create a round robin routing policy on Cloud DNS for these Compute Engine VMs.
3. Configure the air quality devices to connect by using this DNS.
- 1. Run the air quality devices’ backends on Compute Engine VMs.
2. Create a weighted round robin routing policy on Cloud DNS.
3. Configure the air quality devices to connect by using this DNS.

--------------------------------------------------

90. You recently developed an application that will be hosted on Cloud Run. You need to conduct a load test. You want to analyze the load test logs second by second to understand your Cloud Run service's response to rapid traffic spikes. You want to minimize effort. How should you analyze the logs?

corretta/e:
- Analyze the log data in BigQuery by configuring a BigQuery log sink with the appropriate inclusion filter for your application.

sbagliate:
- Use estimation to extrapolate performance from summary monitoring charts.
- Use Cloud Monitoring’s default log console for analysis.
- Analyze the log data in Cloud SQL for PostgreSQL by pushing logs to a Pub/Sub topic. Use Dataflow to process and ingest the logs.

--------------------------------------------------

91. You need to load-test a set of REST API endpoints that are deployed to Cloud Run. The API responds to HTTP POST requests. Your load tests must meet the following requirements:
• Load is initiated from multiple parallel threads.
• User traffic to the API originates from multiple source IP addresses.
• Load can be scaled up using additional test instances.

You want to follow Google-recommended best practices. How should you configure the load testing?

corretta/e:
- Deploy a distributed load testing framework on a private Google Kubernetes Engine cluster. Deploy additional Pods as needed to initiate more traffic and support the number of concurrent users.

sbagliate:
- Download the container image of a distributed load testing framework on Cloud Shell. Sequentially start several instances of the container on Cloud Shell to increase the load on the API.
- Create an image that has cURL installed, and configure cURL to run a test plan. Deploy the image in an unmanaged instance group, and run one instance of the image for each VM.
- Create an image that has cURL installed, and configure cURL to run a test plan. Deploy the image in a managed instance group, and run one instance of the image for each VM.

--------------------------------------------------

92. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
Which service should HipLocal use for their public APIs?

corretta/e:
- Cloud Endpoints

sbagliate:
- Cloud Functions
- Shielded Virtual Machines
- Cloud Armor

--------------------------------------------------

93. You are designing an application that uses a microservices architecture. You are planning to deploy the application in the cloud and on-premises. You want to make sure the application can scale up on demand and also use managed services as much as possible. What should you do?

corretta/e:
- Create a GKE cluster in each environment with Anthos, and use Cloud Run for Anthos to deploy your application to each cluster.

sbagliate:
- Deploy open source Istio in a multi-cluster deployment on multiple Google Kubernetes Engine (GKE) clusters managed by Anthos.
- Install a GKE cluster in each environment with Anthos, and use Cloud Build to create a Deployment for your application in each cluster.
- Create a GKE cluster in the cloud and install open-source Kubernetes on-premises. Use an external load balancer service to distribute traffic across the two environments.

--------------------------------------------------

94. You manage an application deployed on GKE clusters across multiple environments. You are using Cloud Build to run user acceptance testing (UAT) tests. You have integrated Cloud Build with Artifact Analysis, and enabled the Binary Authorization API in all Google Cloud projects hosting your environments. You want only container images that have passed certain automated UAT tests to be deployed to the production environment. You have already created an attestor. What should you do next?

corretta/e:
- After the UAT phase, sign the attestation with a key stored in Cloud Key Management Service (KMS). Add a GKE cluster-specific rule in Binary Authorization for the production Google Cloud project policy.

sbagliate:
- After the UAT phase, sign the attestation with a key stored in Cloud Key Management Service (KMS). Add a default rule in Binary Authorization for the UAT Google Cloud project.
- After the UAT phase, sign the attestation with a key stored as a Kubernetes secret. Add a GKE cluster-specific rule in Binary Authorization for the UAT Google Cloud project.
- After the UAT phase, sign the attestation with a key stored as a Kubernetes secret. Add a GKE cluster-specific rule in Binary Authorization for the production Google Cloud project policy.

--------------------------------------------------

95. Your company has deployed a new API to a Compute Engine instance. During testing, the API is not behaving as expected. You want to monitor the application over 12 hours to diagnose the problem within the application code without redeploying the application. Which tool should you use?

corretta/e:
- Cloud Debugger logpoints

sbagliate:
- Cloud Debugger snapshots
- Cloud Monitoring
- Cloud Trace

--------------------------------------------------

96. You have an application running on Google Kubernetes Engine (GKE). The application is currently using a logging library and is outputting to standard output. You need to export the logs to Cloud Logging, and you need the logs to include metadata about each request. You want to use the simplest method to accomplish this. What should you do?

corretta/e:
- Change your application’s logging library to the Cloud Logging library, and configure your application to export logs to Cloud Logging.

sbagliate:
- Install the Fluent Bit agent on each of your GKE nodes, and have the agent export all logs from /var/log.
- Update your application to output logs in CSV format, and add the necessary metadata to the CSV.
- Update your application to output logs in JSON format, and add the necessary metadata to the JSON.

--------------------------------------------------

97. You need to deploy resources from your laptop to Google Cloud using Terraform. Resources in your Google Cloud environment must be created using a service account. Your Cloud Identity has the roles/iam.serviceAccountTokenCreator Identity and Access Management (IAM) role and the necessary permissions to deploy the resources using Terraform. You want to set up your development environment to deploy the desired resources following Google-recommended best practices. What should you do?

corretta/e:
- 1. Run the following command from a command line: gcloud config set auth/impersonate_service_account service-account-name@project.iam.gserviceacccount.com.
2. Set the GOOGLE_OAUTH_ACCESS_TOKEN environment variable to the value that is returned by the gcloud auth print-access-token command.

sbagliate:
- 1. Run the following command from a command line: gcloud auth application-default login.
2. In the browser window that opens, authenticate using your personal credentials.
- 1. Download the service account’s key file in JSON format, and store it locally on your laptop.
2. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of your downloaded key file.
- 1. Store the service account's key file in JSON format in Hashicorp Vault.
2. Integrate Terraform with Vault to retrieve the key file dynamically, and authenticate to Vault using a short-lived access token.

--------------------------------------------------

98. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
In order to meet their business requirements, how should HipLocal store their application state?

corretta/e:
- Move the state storage to Cloud Spanner.

sbagliate:
- Use local SSDs to store state.
- Put a memcache layer in front of MySQL.
- Replace the MySQL instance with Cloud SQL.

--------------------------------------------------

99. Your company manages an application that captures stock data in an internal database. You need to create an API that provides real-time stock data to users. You want to return stock data to users as quickly as possible, and you want your solution to be highly scalable. What should you do?

corretta/e:
- Create a Memorystore for Redis instance, and use this database to store the most accessed stock data. Query this instance first when user requests are received, and fall back to the internal database.

sbagliate:
- Create a Bigtable instance. Query the table when user requests are received. Configure a Pub/Sub topic to queue user requests that your API will respond to.
- Create a BigQuery dataset and table to act as the internal database. Query the table when user requests are received.
- Create a Memorystore for Redis instance to store all stock market data. Query this database when user requests are received.

--------------------------------------------------

100. You are a lead developer working on a new retail system that runs on Cloud Run and Firestore in Datastore mode. A web UI requirement is for the system to display a list of available products when users access the system and for the user to be able to browse through all products. You have implemented this requirement in the minimum viable product (MVP) phase by returning a list of all available products stored in Firestore.

A few months after go-live, you notice that Cloud Run instances are terminated with HTTP 500: Container instances are exceeding memory limits errors during busy times. This error coincides with spikes in the number of Datastore entity reads. You need to prevent Cloud Run from crashing and decrease the number of Datastore entity reads. You want to use a solution that optimizes system performance. What should you do?

corretta/e:
- Modify the query that returns the product list using cursors.

sbagliate:
- Modify the query that returns the product list using limits.
- Modify the Cloud Run configuration to increase the memory limits.
- Modify the query that returns the product list using integer offsets.

--------------------------------------------------

101. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

Which Google Cloud product addresses HipLocal’s business requirements for service level indicators and objectives?

corretta/e:
- Cloud Monitoring

sbagliate:
- Cloud Profiler
- Cloud Logging
- Cloud Trace

--------------------------------------------------

102. You need to redesign the ingestion of audit events from your authentication service to allow it to handle a large increase in traffic. Currently, the audit service and the authentication system run in the same Compute Engine virtual machine. You plan to use the following Google Cloud tools in the new architecture:
✑ Multiple Compute Engine machines, each running an instance of the authentication service
✑ Multiple Compute Engine machines, each running an instance of the audit service
✑ Pub/Sub to send the events from the authentication services.
How should you set up the topics and subscriptions to ensure that the system can handle a large volume of messages and can scale efficiently?

corretta/e:
- Create one Pub/Sub topic. Create one pull subscription to allow the audit services to share the messages.

sbagliate:
- Create one Pub/Sub topic. Create one pull subscription per audit service instance to allow the services to share the messages.
- Create one Pub/Sub topic per authentication service. Create one pull subscription per topic to be used by one audit service.
- Create one Pub/Sub topic. Create one push subscription with the endpoint pointing to a load balancer in front of the audit services.
- Create one Pub/Sub topic per authentication service. Create one push subscription per topic, with the endpoint pointing to one audit service.

--------------------------------------------------

103. You have an application written in Python running in production on Cloud Run. Your application needs to read/write data stored in a Cloud Storage bucket in the same project. You want to grant access to your application following the principle of least privilege. What should you do?

corretta/e:
- Create a user-managed service account with a custom Identity and Access Management (IAM) role.

sbagliate:
- Create a user-managed service account with the Storage Admin Identity and Access Management (IAM) role.
- Create a user-managed service account with the Project Editor Identity and Access Management (IAM) role.
- Use the default service account linked to the Cloud Run revision in production.

--------------------------------------------------

104. Your organization has users and groups configured in an external identity provider (IdP). You want to leverage the same external IdP to allow Google Cloud console access to all employees. You also want to personalize the sign-in experience by displaying the user's name and photo when users access the Google Cloud console. What should you do?

corretta/e:
- Configure workforce identity federation with the external IdP, and set up attribute mapping.

sbagliate:
- Create a Google group that includes organization email IDs for all users. Ask users to use the same name, work email ID, and password to register and sign in.
- Configure a service account for each individual by using the user name and photo, and grant permissions for each user to impersonate their respective service accounts.
- Configure workload identity federation to get the external IdP tokens, and use these tokens to sign in to the Google Cloud console.

--------------------------------------------------

105. You are creating a Google Kubernetes Engine (GKE) cluster and run this command:
//IMG//

The command fails with the error:
//IMG//

You want to resolve the issue. What should you do?

corretta/e:
- Request additional Compute Engine quota in the GCP Console.

sbagliate:
- Request additional GKE quota in the GCP Console.
- Decouple services in the cluster, and rewrite new clusters to function with fewer cores.
- Open a support case to request additional GKE quota.

--------------------------------------------------

106. You are designing a deployment technique for your new applications on Google Cloud. As part of your deployment planning, you want to use live traffic to gather performance metrics for both new and existing applications. You need to test against the full production load prior to launch. What should you do?

corretta/e:
- Use A/B testing with traffic mirroring during deployment

sbagliate:
- Use blue/green deployment
- Use rolling updates deployment
- Use canary deployment

--------------------------------------------------

107. You manage a microservices application on Google Kubernetes Engine (GKE) using Istio. You secure the communication channels between your microservices by implementing an Istio AuthorizationPolicy, a Kubernetes NetworkPolicy, and mTLS on your GKE cluster. You discover that HTTP requests between two Pods to specific URLs fail, while other requests to other URLs succeed. What is the cause of the connection issue?

corretta/e:
- The Authorization Policy of your cluster is blocking HTTP requests for specific paths within your application.

sbagliate:
- The Pod initiating the HTTP requests is attempting to connect to the target Pod via an incorrect TCP port.
- The cluster has mTLS configured in permissive mode, but the Pod's sidecar proxy is sending unencrypted traffic in plain text.
- A Kubernetes NetworkPolicy resource is blocking HTTP traffic between the Pods.

--------------------------------------------------

108. Your application is controlled by a managed instance group. You want to share a large read-only data set between all the instances in the managed instance group. You want to ensure that each instance can start quickly and can access the data set via its filesystem with very low latency. You also want to minimize the total cost of the solution.
What should you do?

corretta/e:
- Move the data to a Compute Engine persistent disk, and attach the disk in read-only mode to multiple Compute Engine virtual machine instances.

sbagliate:
- Move the data to a Compute Engine persistent disk, take a snapshot, create multiple disks from the snapshot, and attach each disk to its own instance.
- Move the data to a Cloud Storage bucket, and mount the bucket on the filesystem using Cloud Storage FUSE.
- Move the data to a Cloud Storage bucket, and copy the data to the boot disk of the instance via a startup script.

--------------------------------------------------

109. Your App Engine standard configuration is as follows:
service: production
instance_class: B1
You want to limit the application to 5 instances.
Which code snippet should you include in your configuration?

corretta/e:
- basic_scaling: max_instances: 5 idle_timeout: 10m

sbagliate:
- manual_scaling: max_instances: 5 idle_timeout: 10m
- manual_scaling: instances: 5 min_pending_latency: 30ms
- basic_scaling: instances: 5 min_pending_latency: 30ms

--------------------------------------------------

110. Your team has created an application that is hosted on a GKE cluster. You need to connect the application to a REST service that is deployed in two GKE clusters in two different regions. How should you set up the connection and health checks? (Choose two.)

corretta/e:
- 

sbagliate:
- Configure the REST service's firewall to allow health checks originating from the GKE control plane’s IP ranges.
- Use Cloud Service Mesh with sidecar proxies to connect the application to the REST service.
- Configure the REST service's firewall to allow health checks originating from the GKE check probe’s IP ranges.
- Use Cloud Service Mesh with proxyless gRPC to connect the application to the REST service.
- Configure the REST service's firewall to allow health checks originating from the GKE service’s IP ranges.

--------------------------------------------------

111. You are developing a new public-facing application that needs to retrieve specific properties in the metadata of users’ objects in their respective Cloud Storage buckets. Due to privacy and data residency requirements, you must retrieve only the metadata and not the object data. You want to maximize the performance of the retrieval process. How should you retrieve the metadata?

corretta/e:
- Use the fields request parameter.

sbagliate:
- Use the copy method.
- Use the patch method.
- Use the compose method.

--------------------------------------------------

112. You are a cluster administrator for Google Kubernetes Engine (GKE). Your organization’s clusters are enrolled in a release channel. You need to be informed of relevant events that affect your GKE clusters, such as available upgrades and security bulletins. What should you do?

corretta/e:
- Configure cluster notifications to be sent to a Pub/Sub topic.

sbagliate:
- Create an RSS subscription to receive a daily summary of the GKE release notes.
- Execute a scheduled query against the google_cloud_release_notes BigQuery dataset.
- Query the GKE API for available versions.

--------------------------------------------------

113. You are using the latest stable version of Python 3 to develop an API that stores data in a Cloud SQL database. You need to perform CRUD operations on the production database securely and reliably with minimal effort. What should you do?

corretta/e:
- 1. Use the Cloud SQL connector library for Python to connect to the Cloud SQL database through a Cloud SQL Auth Proxy.
2. Grant an IAM role to the service account that includes the cloudsql.instances.connect permission.

sbagliate:
- 1. Use Cloud Composer to manage the connection to the Cloud SQL database from your Python application.
2. Grant an IAM role to the service account that includes the composer.worker permission.
- 1. Use the Cloud SQL emulator to connect to the Cloud SQL database from Cloud Shell
2. Grant an IAM role to the user that includes the cloudsql.instances.login permission.
- 1. Use the Cloud SQL API to connect to the Cloud SQL database from your Python application.
2. Grant an IAM role to the service account that includes the cloudsql.instances.login permission.

--------------------------------------------------

114. You are writing a Compute Engine hosted application in project A that needs to securely authenticate to a Cloud Pub/Sub topic in project B.
What should you do?

corretta/e:
- Configure the instances with a service account owned by project A. Add the service account as a publisher on the topic.

sbagliate:
- Configure Application Default Credentials to use the private key of a service account owned by project B. Add the service account as a Cloud Pub/Sub publisher to project A.
- Configure the instances with a service account owned by project B. Add the service account as a Cloud Pub/Sub publisher to project A.
- Configure Application Default Credentials to use the private key of a service account owned by project A. Add the service account as a publisher on the topic

--------------------------------------------------

115. You want to view the memory usage of your application deployed on Compute Engine.
What should you do?

corretta/e:
- Install the Stackdriver Monitoring Agent.

sbagliate:
- Install the Stackdriver Client Library.
- Use the Google Cloud Platform Console.
- Use the Stackdriver Metrics Explorer.

--------------------------------------------------

116. Your team is developing a Cloud Function triggered by Cloud Storage events. You want to accelerate testing and development of your Cloud Function while following Google-recommended best practices. What should you do?

corretta/e:
- Install the Functions Frameworks library, and configure the Cloud Function on localhost. Make a copy of the function, and make edits to the new version. Test the new version using curl.

sbagliate:
- Create a new Cloud Function that is triggered when Cloud Audit Logs detects the cloudfunctions.functions.sourceCodeSet operation in the original Cloud Function. Send mock requests to the new function to evaluate the functionality.
- Make a copy of the Cloud Function, and rewrite the code to be HTTP-triggered. Edit and test the new version by triggering the HTTP endpoint. Send mock requests to the new function to evaluate the functionality.
- Make a copy of the Cloud Function in the Google Cloud console. Use the Cloud console's in-line editor to make source code changes to the new function. Modify your web application to call the new function, and test the new version in production

--------------------------------------------------

117. You are designing a resource-sharing policy for applications used by different teams in a Google Kubernetes Engine cluster. You need to ensure that all applications can access the resources needed to run. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Create a LimitRange to specify the default compute resource requirements for each namespace.
- Create a Kubernetes service account (KSA) for each application, and assign each KSA to the namespace.
- Specify the resource limits and requests in the object specifications.
- Use the Anthos Policy Controller to enforce label annotations on all namespaces. Use taints and tolerations to allow resource sharing for namespaces.
- Create a namespace for each team, and attach resource quotas to each namespace.

--------------------------------------------------

118. Your team is developing a new application that is packaged as a container and stored in Artifact Registry. You are responsible for configuring the CI/CD pipelines that use Cloud Build. Containers may be pushed manually as a local development effort or in an emergency. Every time a new container is pushed to Artifact Registry, you need to trigger another Cloud Build pipeline that executes a vulnerability scan. You want to implement this requirement using the least amount of effort. What should you do?

corretta/e:
- Configure Artifact Registry to publish a message to a Pub/Sub topic when a new image is pushed. Configure the vulnerability scan pipeline to be triggered by the Pub/Sub message.

sbagliate:
- Configure the Cloud Build Cl pipeline that publishes the new image to send a message to a Pub/Sub topic that triggers the vulnerability scan pipeline.
- Use Cloud Scheduler to periodically check for new versions of the container in Artifact Registry and trigger the vulnerability scan pipeline.
- Configure Artifact Registry to publish a message to a Pub/Sub topic when a new image is pushed. Configure Pub/Sub to invoke a Cloud Function that triggers the vulnerability scan pipeline.

--------------------------------------------------

119. Your application is deployed in a Google Kubernetes Engine (GKE) cluster. When a new version of your application is released, your CI/CD tool updates the spec.template.spec.containers[0].image value to reference the Docker image of your new application version. When the Deployment object applies the change, you want to deploy at least 1 replica of the new version and maintain the previous replicas until the new replica is healthy.
Which change should you make to the GKE Deployment object shown below?
//IMG//

corretta/e:
- Set the Deployment strategy to RollingUpdate with maxSurge set to 1, maxUnavailable set to 0.

sbagliate:
- Set the Deployment strategy to RollingUpdate with maxSurge set to 0, maxUnavailable set to 1.
- Set the Deployment strategy to Recreate with maxSurge set to 0, maxUnavailable set to 1.
- Set the Deployment strategy to Recreate with maxSurge set to 1, maxUnavailable set to 0.

--------------------------------------------------

120. You are developing an application that reads credit card data from a Pub/Sub subscription. You have written code and completed unit testing. You need to test the
Pub/Sub integration before deploying to Google Cloud. What should you do?

corretta/e:
- Create a service to publish messages, and deploy the Pub/Sub emulator. Publish a standard set of testing messages from the publishing service to the emulator.

sbagliate:
- Create a service to publish messages, and deploy the Pub/Sub emulator. Collect the messages from Pub/Sub in production, and publish them to the emulator.
- Create a service to publish messages to your application. Collect the messages from Pub/Sub in production, and replay them through the publishing service.
- Create a service to publish messages, and deploy the Pub/Sub emulator. Generate random content in the publishing service, and publish to the emulator.

--------------------------------------------------

121. You work for an organization that manages an ecommerce site. Your application is deployed behind an external Application Load Balancer. You need to test a new product recommendation algorithm. You plan to use A/B testing to determine the new algorithm’s effect on sales in a randomized way. How should you test this feature?

corretta/e:
- Split traffic between versions using weights.

sbagliate:
- Enable the new recommendation feature flag on a single instance.
- Mirror traffic to the new version of your application.
- Use HTTP header-based routing.

--------------------------------------------------

122. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
Which service should HipLocal use to enable access to internal apps?

corretta/e:
- Cloud Identity-Aware Proxy

sbagliate:
- Virtual Private Cloud
- Cloud VPN
- Cloud Armor

--------------------------------------------------

123. You are a developer of a new customer-facing help desk chat service that is built on Cloud Run. Your customers use the chat option on your website to get support. The application saves each transcript as a text file with a unique identifier in a Cloud Storage bucket. After the conversation is done and before the chat window is closed, the customer receives a link to the chat transcript. You want to provide access to the chat transcript link for 2 hours. You need to configure this access using an approach that prioritizes security and follows Google-recommended practices. What should you do?

corretta/e:
- Create a signed URL for each text file that expires after 2 hours.

sbagliate:
- Set the ACL permission on the Cloud Storage bucket. Set the permission of each text file to allUsers with READER access. Delete each text file 2 hours after itis created.
- Set the permission on the Cloud Storage bucket with the text files to allUsers. Delete each text file 2 hours after itis created.
- Create a new Cloud Storage bucket for each user. Grant the user access to the bucket with a conditional IAM role that expires after 2 hours.

--------------------------------------------------

124. You are building a new API. You want to minimize the cost of storing and reduce the latency of serving images.
Which architecture should you use?

corretta/e:
- Cloud Content Delivery Network (CDN) backed by Cloud Storage

sbagliate:
- Transfer Appliance backed by Cloud Filestore
- App Engine backed by Cloud Storage
- Compute Engine backed by Persistent Disk

--------------------------------------------------

125. You are a developer at a large corporation. You manage three Google Kubernetes Engine clusters on Google Cloud. Your team’s developers need to switch from one cluster to another regularly without losing access to their preferred development tools. You want to configure access to these multiple clusters while following Google-recommended best practices. What should you do?

corretta/e:
- In a configuration file, define the clusters, users, and contexts. Share the file with the developers and ask them to use kubect1 contig to add cluster, user, and context details.

sbagliate:
- Ask the developers to use Cloud Shell and run gcloud container clusters get-credential to switch to another cluster.
- Ask the developers to open three terminals on their workstation and use kubect1 config to configure access to each cluster.
- Ask the developers to install the gcloud CLI on their workstation and run gcloud container clusters get-credentials to switch to another cluster.

--------------------------------------------------

126. Your company’s product team has a new requirement based on customer demand to autoscale your stateless and distributed service running in a Google Kubernetes Engine (GKE) duster. You want to find a solution that minimizes changes because this feature will go live in two weeks. What should you do?

corretta/e:
- Deploy a Horizontal Pod Autoscaler, and scale based on the CPU toad.

sbagliate:
- Deploy a Vertical Pod Autoscaler, and scale based on a custom metric.
- Deploy a Vertical Pod Autoscaler, and scale based on the CPU load.
- Deploy a Horizontal Pod Autoscaler, and scale based on a custom metric.

--------------------------------------------------

127. You are reviewing and updating your Cloud Build steps to adhere to best practices. Currently, your build steps include:

1. Pull the source code from a source repository.
2. Build a container image
3. Upload the built image to Artifact Registry.

You need to add a step to perform a vulnerability scan of the built container image, and you want the results of the scan to be available to your deployment pipeline running in Google Cloud. You want to minimize changes that could disrupt other teams’ processes. What should you do?

corretta/e:
- Enable the Container Scanning API in Artifact Registry, and scan the built container images for vulnerabilities.

sbagliate:
- Enable Binary Authorization, and configure it to attest that no vulnerabilities exist in a container image.
- Upload the built container images to your Docker Hub instance, and scan them for vulnerabilities.
- Add Artifact Registry to your Aqua Security instance, and scan the built container images for vulnerabilities.

--------------------------------------------------

128. You are developing an application that consists of several microservices running in a Google Kubernetes Engine cluster. One microservice needs to connect to a third-party database running on-premises. You need to store credentials to the database and ensure that these credentials can be rotated while following security best practices. What should you do?

corretta/e:
- Store the credentials as a Kubernetes Secret, and use the Cloud Key Management Service plugin to handle encryption and decryption.

sbagliate:
- Store the credentials in a sidecar container proxy, and use it to connect to the third-party database.
- Configure a service mesh to allow or restrict traffic from the Pods in your microservice to the database.
- Store the credentials in an encrypted volume mount, and associate a Persistent Volume Claim with the client Pod.

--------------------------------------------------

129. The development teams in your company want to manage resources from their local environments. You have been asked to enable developer access to each team’s Google Cloud projects. You want to maximize efficiency while following Google-recommended best practices. What should you do?

corretta/e:
- Create groups, add the users to their groups, assign the relevant roles to the groups, and then provide the users with each relevant Project ID.

sbagliate:
- Add the users to their projects, assign the relevant roles to the users, and then provide the users with each relevant Project ID.
- Create groups, add the users to their groups, assign the relevant roles to the groups, and then provide the users with each relevant Project Number.
- Add the users to their projects, assign the relevant roles to the users, and then provide the users with each relevant Project Number.

--------------------------------------------------

130. You want to migrate an on-premises container running in Knative to Google Cloud. You need to make sure that the migration doesn't affect your application's deployment strategy, and you want to use a fully managed service. Which Google Cloud service should you use to deploy your container?

corretta/e:
- Cloud Run

sbagliate:
- Compute Engine
- Google Kubernetes Engine
- App Engine flexible environment

--------------------------------------------------

131. You are parsing a log file that contains three columns: a timestamp, an account number (a string), and a transaction amount (a number). You want to calculate the sum of all transaction amounts for each unique account number efficiently.
Which data structure should you use?

corretta/e:
- A hash table

sbagliate:
- A linked list
- A comma-delimited string
- A two-dimensional array

--------------------------------------------------

132. Your team manages a Google Kubernetes Engine (GKE) cluster where an application is running. A different team is planning to integrate with this application. Before they start the integration, you need to ensure that the other team cannot make changes to your application, but they can deploy the integration on GKE. What should you do?

corretta/e:
- Create a new namespace in the existing cluster. Using Kubernetes role-based access control (RBAC), grant the Admin role on the new namespace to the other team.

sbagliate:
- Using Identity and Access Management (IAM), grant the Viewer IAM role on the cluster project to the other team.
- Create a new GKE cluster. Using Identity and Access Management (IAM), grant the Editor role on the cluster project to the other team.
- Create a new namespace in the existing cluster. Using Identity and Access Management (IAM), grant the Editor role on the cluster project to the other team.

--------------------------------------------------

133. You manage your company's ecommerce platform's payment system, which runs on Google Cloud. Your company must retain user logs for 1 year for internal auditing purposes and for 3 years to meet compliance requirements. You need to store new user logs on Google Cloud to minimize on-premises storage usage and ensure that they are easily searchable. You want to minimize effort while ensuring that the logs are stored correctly. What should you do?

corretta/e:
- Store the logs in Cloud Logging as custom logs with a custom retention period.

sbagliate:
- Store the logs in a Cloud Storage bucket with a 1-year retention period. After 1 year, move the logs to another bucket with a 2-year retention period.
- Store the logs in a Cloud Storage bucket with a 3-year retention period.
- Store the logs in a Cloud Storage bucket with bucket lock turned on.

--------------------------------------------------

134. You manage a microservice-based ecommerce platform on Google Cloud that sends confirmation emails to a third-party email service provider using a Cloud Function. Your company just launched a marketing campaign, and some customers are reporting that they have not received order confirmation emails. You discover that the services triggering the Cloud Function are receiving HTTP 500 errors. You need to change the way emails are handled to minimize email loss. What should you do?

corretta/e:
- Configure the sender application to publish the outgoing emails in a message to a Pub/Sub topic. Update the Cloud Function configuration to consume the Pub/Sub queue.

sbagliate:
- Configure the sender application to retry the execution of the Cloud Function every one second if a request fails.
- Configure the sender application to write emails to Memorystore and then trigger the Cloud Function. When the function is triggered, it reads the email details from Memorystore and sends them to the email service.
- Increase the Cloud Function's timeout to nine minutes.

--------------------------------------------------

135. You are a developer at a large organization. Your team uses Git for source code management (SCM). You want to ensure that your team follows Google-recommended best practices to manage code to drive higher rates of software delivery. Which SCM process should your team use?

corretta/e:
- Each group of developers creates a feature branch from the main branch for their work, commits their changes to their branch, and merges their code into the main branch after the change advisory board approves it.

sbagliate:
- Each group of developers copies the repository, commits their changes to their repository, and merges their code into the main repository before each product release.
- Each developer commits their code to the main branch before each product release, conducts testing, and rolls back if integration issues are detected.
- Each developer creates a branch for their own work, commits their changes to their branch, and merges their code into the main branch daily.

--------------------------------------------------

136. You are monitoring a web application that is written in Go and deployed in Google Kubernetes Engine. You notice an increase in CPU and memory utilization. You need to determine which function is consuming the most CPU and memory resources. What should you do?

corretta/e:
- Import the Cloud Profiler package into your application, and initialize the Profiler agent. Review the generated flame graph in the Google Cloud console to identify time-intensive functions.

sbagliate:
- Add print commands to the application source code to log when each function is called, and redeploy the application.
- Create a Cloud Logging query that gathers the web application s logs. Write a Python script that calculates the difference between the timestamps from the beginning and the end of the application's longest functions to identify time-intensive functions.
- Import OpenTelemetry and Trace export packages into your application, and create the trace provider. Review the latency data for your application on the Trace overview page, and identify which functions cause the most latency.

--------------------------------------------------

137. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
Which database should HipLocal use for storing user activity?

corretta/e:
- BigQuery

sbagliate:
- Cloud SQL
- Cloud Datastore
- Cloud Spanner

--------------------------------------------------

138. You are about to deploy an application hosted on a Compute Engine instance with Windows OS and Cloud SQL. You plan to use the Cloud SQL Auth Proxy for connectivity to the Cloud SQL instance. You plan to follow Google-recommended practices and the principle of least privilege. You have already created a custom service account. What should you do next?

corretta/e:
- Create and assign a custom role with the cloudsql.instances.connect permission to the custom service account. Adjust the Cloud SQL Auth Proxy start command to specify your instance connection name.

sbagliate:
- Grant the custom service account the roles/cloudsql.client role. Adjust the Cloud SQL Auth Proxy start command to use the --unix-socket CLI option.
- Grant the custom service account the roles/cloudsql.editor role.
- Grant the custom service account the roles/cloudsql.viewer role. Adjust the Cloud SQL Auth Proxy start command to specify your instance connection name.

--------------------------------------------------

139. You are using Cloud Build to create a new Docker image on each source code commit to a Cloud Source Repositories repository. Your application is built on every commit to the master branch. You want to release specific commits made to the master branch in an automated method.
What should you do?

corretta/e:
- Create a build trigger on a Git tag pattern. Use a Git tag convention for new releases.

sbagliate:
- Commit your source code to a second Cloud Source Repositories repository with a second Cloud Build trigger. Use this repository for new releases only.
- Create a build trigger on a Git branch name pattern. Use a Git branch naming convention for new releases.
- Manually trigger the build for new releases.

--------------------------------------------------

140. Your existing application keeps user state information in a single MySQL database. This state information is very user-specific and depends heavily on how long a user has been using an application. The MySQL database is causing challenges to maintain and enhance the schema for various users.
Which storage option should you choose?

corretta/e:
- Cloud Datastore/Firestore

sbagliate:
- Cloud Storage
- Cloud Spanner
- Cloud SQL

--------------------------------------------------

141. You are using App Engine and Cloud SQL for PostgreSQL to develop an application. You want to test your application code locally before deploying new application versions to the development environment that is shared with other developers. You need to set up your App Engine local development environment to test your application while keeping all traffic to Cloud SQL instances encrypted and authenticated to Cloud IAM and PostgreSQL. What should you do before starting the local development server?

corretta/e:
- Download and install the Cloud SQL Auth Proxy to your local development environment. Configure the Cloud SQL Auth Proxy to connect to the Cloud SQL instance and run the proxy. Configure the application to connect to a PostgreSQL instance on localhost.

sbagliate:
- Configure your local development server to connect to the private IP address of the Cloud SQL instance. Encrypt database entries with a cryptographic library before submitting them to the database. Store the decryption key as an environment variable in App Engine.
- Install PostgreSQL on your local workstation. Run a local PostgreSQL database on your workstation. Configure the application to connect to a PostgreSQL instance on localhost.
- Deploy a Compute Engine instance, and install HAProxy on the instance. Configure Cloud SQL Auth Proxy on the instance, and use the instance’s service account to authenticate to Cloud SQL. Configure the application to connect to the Compute Engine instance's IP address.

--------------------------------------------------

142. You have an application deployed in production. When a new version is deployed, some issues don't arise until the application receives traffic from users in production. You want to reduce both the impact and the number of users affected.
Which deployment strategy should you use?

corretta/e:
- Canary deployment

sbagliate:
- Recreate deployment
- Blue/green deployment
- Rolling deployment

--------------------------------------------------

143. You are developing a JPEG image-resizing API hosted on Google Kubernetes Engine (GKE). Callers of the service will exist within the same GKE cluster. You want clients to be able to get the IP address of the service.
What should you do?

corretta/e:
- Define a GKE Service. Clients should use the service name in the URL to connect to the service.

sbagliate:
- Define a GKE Endpoint. Clients should get the endpoint name from Cloud DNS.
- Define a GKE Service. Clients should use the name of the A record in Cloud DNS to find the service's cluster IP address.
- Define a GKE Endpoint. Clients should get the endpoint name from the appropriate environment variable in the client container.

--------------------------------------------------

144. Your code is running on Cloud Functions in project A. It is supposed to write an object in a Cloud Storage bucket owned by project B. However, the write call is failing with the error "403 Forbidden".
What should you do to correct the problem?

corretta/e:
- Grant the service-PROJECTA@gcf-admin-robot.iam.gserviceaccount.com service account the roles/storage.objectCreator role for the Cloud Storage bucket.

sbagliate:
- Grant your user account the roles/storage.objectCreator role for the Cloud Storage bucket.
- Grant your user account the roles/iam.serviceAccountUser role for the service-PROJECTA@gcf-admin-robot.iam.gserviceaccount.com service account.
- Enable the Cloud Storage API in project B.

--------------------------------------------------

145. You are deploying your applications on Compute Engine. One of your Compute Engine instances failed to launch. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Determine whether your file system is corrupted.
- Access Compute Engine as a different SSH user.
- Check whether network traffic to or from your instance is being dropped.
- Check whether your instance boot disk is completely full.
- Troubleshoot firewall rules or routes on an instance.

--------------------------------------------------

146. Your team plans to use AlloyDB as their database backend for an upcoming application release. Your application is currently hosted in a different project and network than the AlloyDB instances. You need to securely connect your application to the AlloyDB instance while keeping the projects isolated. You want to minimize additional operations and follow Google-recommended practices. How should you configure the network for database connectivity?

corretta/e:
- Use AlloyDB Auth Proxy and configure the application project’s firewall to allow connections to port 5433.

sbagliate:
- Provision a Shared VPC project where both the application project and the AlloyDB project are service projects.
- Ask the database team to provision AlloyDB databases in the same project and network as the application.
- Provision a service account from the AlloyDB project. Use this service account’s JSON key file as the --credentials-file to connect to the AlloyDB instance.

--------------------------------------------------

147. You are migrating a containerized application to Cloud Run. You plan to use Cloud Build to build your container image and push it to Artifact Registry, and you plan to use Cloud Deploy to deploy the image to production. You need to ensure that only secure images are deployed to production. What should you do?

corretta/e:
- Use Binary Authorization to enforce a policy that only allows images that have been signed with a trusted key to be deployed to production.

sbagliate:
- Use Cloud Armor in front of Cloud Run to protect the container image from threats.
- Use Artifact Analysis to scan the image for vulnerabilities. Use Cloud Key Management Service to encrypt the image to be deployed to production.
- Use Secret Manager to store the encrypted image. Deploy this image to production.

--------------------------------------------------

148. You are developing an HTTP API hosted on a Compute Engine virtual machine instance that needs to be invoked by multiple clients within the same Virtual
Private Cloud (VPC). You want clients to be able to get the IP address of the service.
What should you do?

corretta/e:
- Ensure that clients use Compute Engine internal DNS by connecting to the instance name with the url https://[INSTANCE_NAME].[ZONE].c. [PROJECT_ID].internal/.

sbagliate:
- Reserve a static external IP address and assign it to an HTTP(S) load balancing service's forwarding rule. Clients should use this IP address to connect to the service.
- Ensure that clients use Compute Engine internal DNS by connecting to the instance name with the url https://[API_NAME]/[API_VERSION]/.
- Reserve a static external IP address and assign it to an HTTP(S) load balancing service's forwarding rule. Then, define an A record in Cloud DNS. Clients should use the name of the A record to connect to the service.

--------------------------------------------------

149. Your application takes an input from a user and publishes it to the user's contacts. This input is stored in a table in Cloud Spanner. Your application is more sensitive to latency and less sensitive to consistency.
How should you perform reads from Cloud Spanner for this application?

corretta/e:
- Perform stale reads using single-read methods.

sbagliate:
- Perform strong reads using single-read methods.
- Perform stale reads using read-write transactions.
- Perform Read-Only transactions.

--------------------------------------------------

150. Your team is creating a serverless web application on Cloud Run. The application needs to access images stored in a private Cloud Storage bucket. You want to give the application Identity and Access Management (IAM) permission to access the images in the bucket, while also securing the services using Google-recommended best practices. What should you do?

corretta/e:
- Enforce public access prevention for the desired bucket. Create and update the Cloud Run service to use a user-managed service account. Grant the Storage Object Viewer IAM role on the bucket to the service account.

sbagliate:
- Enforce signed URLs for the desired bucket. Create and update the Cloud Run service to use a user-managed service account. Grant the Storage Object Viewer IAM role on the bucket to the service account.
- Enforce signed URLs for the desired bucket. Grant the Storage Object Viewer IAM role on the bucket to the Compute Engine default service account.
- Enforce public access prevention for the desired bucket. Grant the Storage Object Viewer IAM role on the bucket to the Compute Engine default service account.

--------------------------------------------------

151. You have containerized a legacy application that stores its configuration on an NFS share. You need to deploy this application to Google Kubernetes Engine
(GKE) and do not want the application serving traffic until after the configuration has been retrieved. What should you do?

corretta/e:
- Create a PersistentVolumeClaim on the GKE cluster. Access the configuration files from the volume, and start the service using an ENTRYPOINT script.

sbagliate:
- Add a startup script to the GKE instance group to mount the NFS share at node startup. Copy the configuration files into the container, and start the service using an ENTRYPOINT script.
- Use the gsutil utility to copy files from within the Docker container at startup, and start the service using an ENTRYPOINT script.
- Use the COPY statement in the Dockerfile to load the configuration into the container image. Verify that the configuration is available, and start the service using an ENTRYPOINT script.

--------------------------------------------------

152. You are deploying a microservices application to Google Kubernetes Engine (GKE). The application will receive daily updates. You expect to deploy a large number of distinct containers that will run on the Linux operating system (OS). You want to be alerted to any known OS vulnerabilities in the new containers. You want to follow Google-recommended best practices. What should you do?

corretta/e:
- Enable Container Analysis, and upload new container images to Artifact Registry. Review the vulnerability results before each deployment.

sbagliate:
- Use the gcloud CLI to call Container Analysis to scan new container images. Review the vulnerability results before each deployment.
- Enable Container Analysis, and upload new container images to Artifact Registry. Review the critical vulnerability results before each deployment.
- Use the Container Analysis REST API to call Container Analysis to scan new container images. Review the vulnerability results before each deployment.

--------------------------------------------------

153. You are developing an application hosted on Google Cloud that uses a MySQL relational database schema. The application will have a large volume of reads and writes to the database and will require backups and ongoing capacity planning. Your team does not have time to fully manage the database but can take on small administrative tasks. How should you host the database?

corretta/e:
- Configure Cloud SQL to host the database, and import the schema into Cloud SQL.

sbagliate:
- Configure Bigtable to host the database, and import the data into Bigtable.
- Configure Firestore to host the database, and import the data into Firestore.
- Deploy MySQL from the Google Cloud Marketplace to the database using a client, and import the schema.
- Configure Cloud Spanner to host the database, and import the schema into Cloud Spanner.

--------------------------------------------------

154. You are developing an external-facing application on GKE that provides a streaming API to users. You want to offer two subscription tiers, “basic" and “premium", to users based on the number of API requests that each client application is allowed to make each day. You want to design the application architecture to provide subscription tiers to users while following Google-recommended practices. What should you do?

corretta/e:
- 1. Configure the service on GKE as a backend to an Apigee proxy.
2. Provide API keys to users to identify client applications.
3. Configure a Quota policy in Apigee for API keys based on the subscription tier.

sbagliate:
- 1. Deploy the application to two GKE clusters, one for each subscription tier. Configure each cluster to have a separate Ingress.
2. Configure each cluster as a backend to an Apigee proxy.
3. Provide API keys to users to identify client applications.
4. Configure separate rate limits for client applications based on the subscription tier.
- 1. Configure the service on GKE as a backend to an Apigee proxy.
2. Provide API keys to users to identify client applications.
3. Configure a SpikeArrest policy in Apigee for API keys based on the subscription tier.
- 1. Configure the service on GKE as a backend to two new projects, each with a separate Application Load Balancer.
2. Configure the quota "Queries per second (QPS) per region per network” for each project individually.
3. Provide users with API endpoints based on the subscription tier.

--------------------------------------------------

155. You have an application running on Cloud Run that receives a large volume of traffic. You need to deploy a new version of the application. You want your deployment process to minimize the risk of downtime while following Google-recommended practices. What should you do?

corretta/e:
- Use traffic splitting to have a small percentage of users test out new features on the new revision of the application on the production Cloud Run service. If performance meets expectations, gradually increase the percentage of users until it reaches 100%.

sbagliate:
- Use Cloud Build to create a pipeline, and configure a test stage before the deployment stage. When all tests pass, deploy the application to Cloud Run, and direct 100% of users to this new version of the application. Roll back if any issues are detected.
- Use Cloud Run emulator to test changes locally before deploying the new version of the application to the production Cloud Run service.
- Use Cloud Load Balancing to route a percentage of production traffic to a separate Cloud Run service running the new version of the application. If performance meets expectations, gradually increase the percentage of users until the new Cloud Run service reaches 100%.

--------------------------------------------------

156. You are the lead developer for a company that provides a financial risk calculation API. The API is built on Cloud Run and has a gRPC interface. You frequently develop optimizations to the risk calculators. You want to enable these optimizations for select customers who registered to try out the optimizations prior to rolling out the optimization to all customers. Your CI/CD pipeline has built a new image and stored it in the Artifact Registry.

Which rollout strategy should you use?

corretta/e:
- Migrate the traffic to the new service by using a feature flag for registered customers.

sbagliate:
- Migrate the traffic to the new service by setting Cloud Run’s traffic split based on the percentage of registered customers.
- Migrate the traffic to the new service by using a blue/green deployment approach.
- Migrate the traffic to the new service and enable session affinity for Cloud Run.

--------------------------------------------------

157. Your company's development teams want to use Cloud Build in their projects to build and push Docker images to Container Registry. The operations team requires all Docker images to be published to a centralized, securely managed Docker registry that the operations team manages.
What should you do?

corretta/e:
- Create a separate project for the operations team that has Container Registry configured. Assign appropriate permissions to the Cloud Build service account in each developer team's project to allow access to the operation team's registry.

sbagliate:
- Use Container Registry to create a registry in each development team's project. Configure the Cloud Build build to push the Docker image to the project's registry. Grant the operations team access to each development team's registry.
- Create a separate project for the operations team that has Container Registry configured. Create a Service Account for each development team and assign the appropriate permissions to allow it access to the operations team's registry. Store the service account key file in the source code repository and use it to authenticate against the operations team's registry.
- Create a separate project for the operations team that has the open source Docker Registry deployed on a Compute Engine virtual machine instance. Create a username and password for each development team. Store the username and password in the source code repository and use it to authenticate against the operations team's Docker registry.

--------------------------------------------------

158. You recently deployed an Apigee API proxy to your organization across two regions. Both regions are configured with a separate backend that is hosting the API. You need to configure Apigee to route traffic to the appropriate local region backend. What should you do?

//IMG//

corretta/e:
- Configure a TargetServer for each region's backend host names. Configure the API proxy to choose the TargetServer based on the system.region.name flow variable.

sbagliate:
- Configure a regional internal Application Load Balancer in each region, and use health checks to verify that each backend is active. Create a DNS A record that contains the IP addresses of both regions' load balancers. Configure a Targetserver for each region that uses this DNS name.
- Create a TargetEndpoint with a weighted load balancing algorithm. Configure the API proxy to use the same weights for each region's backend.
- Configure a global external Application Load Balancer and configure each region’s backend with a different regional backend service. Each region communicates to this single global external Application Load Balancer as its TargetServer.

--------------------------------------------------

159. You are developing an online chat application where users can upload profile pictures. Uploaded profile pictures must comply with content policies. You need to detect inappropriate images and label those images automatically when they are uploaded. In the future, this process will need to be expanded to include additional processing tasks such as watermarking and image compression.

You want to simplify orchestration and minimize operational overhead of the image scanning and labeling steps while also ensuring that additional steps can be added and removed easily later on. What should you do?

corretta/e:
- Save user-uploaded images to a Cloud Storage bucket. Create an Eventarc trigger that connects the bucket to the Workflows event receiver when a new image is uploaded. Create a workflow in Workflows with multiple Cloud Functions that call the Vision API to process each new uploaded image.

sbagliate:
- Save user-uploaded images to a Cloud Storage bucket. Configure a Cloud Function that is triggered when a new image is uploaded and publishes a message to a Pub/Sub topic. Deploy microservices in GKE that subscribe to the Pub/Sub topic and call the Vision API to process each new uploaded image.
- Save user-uploaded images to a Cloud Storage bucket. Configure a Cloud Function that is triggered when a new image is uploaded and calls one or more Cloud Run services. Create additional Cloud Run services that call the Vision API to process each new uploaded image.
- Save user-uploaded images to a temporary Cloud Storage bucket. Implement code on the backend server to retrieve the image content and call the Vision API to process each new uploaded image.

--------------------------------------------------

160. You are planning to add unit tests to your application. You need to be able to assert that published Pub/Sub messages are processed by your subscriber in order. You want the unit tests to be cost-effective and reliable. What should you do?

corretta/e:
- Use the Pub/Sub emulator.

sbagliate:
- Add a filter by tester to the subscription.
- Implement a mocking framework.
- Create a topic and subscription for each tester.

--------------------------------------------------

161. Your application stores customers’ content in a Cloud Storage bucket, with each object being encrypted with the customer's encryption key. The key for each object in Cloud Storage is entered into your application by the customer. You discover that your application is receiving an HTTP 4xx error when reading the object from Cloud Storage. What is a possible cause of this error?

corretta/e:
- You attempted the read operation without the base64-encoded SHA256 hash of the encryption key.

sbagliate:
- You entered the same encryption algorithm specified by the customer when attempting the read operation.
- You attempted the read operation on the object with the base64-encoded SHA256 hash of the customer's key.
- You attempted the read operation on the object with the customer's base64-encoded key.

--------------------------------------------------

162. You are designing an application that consists of several microservices. Each microservice has its own RESTful API and will be deployed as a separate Kubernetes Service. You want to ensure that the consumers of these APIs aren't impacted when there is a change to your API, and also ensure that third-party systems aren't interrupted when new versions of the API are released. How should you configure the connection to the application following Google-recommended best practices?

corretta/e:
- Use an Ingress that uses the API's URL to route requests to the appropriate backend.

sbagliate:
- Combine multiple versions in the same service, and then specify the API version in the POST request.
- Leverage a Service Discovery system, and connect to the backend specified by the request.
- Use multiple clusters, and use DNS entries to route requests to separate versioned backends.

--------------------------------------------------

163. You are running a containerized application on Google Kubernetes Engine. Your container images are stored in Container Registry. Your team uses CI/CD practices. You need to prevent the deployment of containers with known critical vulnerabilities. What should you do?

corretta/e:
- • Enable the Container Scanning API to perform vulnerability scanning
• Programmatically review vulnerability reporting through the Container Scanning API, and provide an attestation that the container is free of known critical vulnerabilities
• Use Binary Authorization to implement a policy that forces the attestation to be provided before the container is deployed

sbagliate:
- • Use Web Security Scanner to automatically crawl your application
• Review your application logs for scan results, and provide an attestation that the container is free of known critical vulnerabilities
• Use Binary Authorization to implement a policy that forces the attestation to be provided before the container is deployed
- • Enable the Container Scanning API to perform vulnerability scanning
• Review vulnerability reporting in Container Registry in the Cloud Console, and provide an attestation that the container is free of known critical vulnerabilities
• Use Binary Authorization to implement a policy that forces the attestation to be provided before the container is deployed
- • Use Web Security Scanner to automatically crawl your application
• Review the scan results in the scan details page in the Cloud Console, and provide an attestation that the container is free of known critical vulnerabilities
• Use Binary Authorization to implement a policy that forces the attestation to be provided before the container is deployed

--------------------------------------------------

164. Your teammate has asked you to review the code below, which is adding a credit to an account balance in Cloud Datastore.
Which improvement should you suggest your teammate make?
//IMG//

corretta/e:
- Get and put the entity in a transaction.

sbagliate:
- Don't return the account entity from the function.
- Get the entity with an ancestor query.
- Use a strongly consistent transactional database.

--------------------------------------------------

165. Your application team is developing an ecommerce application. Your team has developed a new functionality that has a dependency on a third-party service. This third-party service will be deployed in a few days. However, you have been unable to ensure the reliability of this service. You need to choose a deployment strategy for the ecommerce application that will avoid disruption and can be rolled back quickly if issues are discovered. What should you do?

corretta/e:
- Use a feature flag to enable the new functionality to users on demand. Gradually enable the new functionality to more users.

sbagliate:
- Deploy the new functionality to all users by using a blue/green deployment strategy.
- Deploy the new functionality by using an A/B deployment strategy.
- Gradually roll out the new functionality by using a rolling updates deployment strategy. Start with a small subset of users and increase the number of users over time.

--------------------------------------------------

166. You have an on-premises application that authenticates to the Cloud Storage API using a user-managed service account with a user-managed key. The application connects to Cloud Storage using Private Google Access over a Dedicated Interconnect link. You discover that requests from the application to access objects in the Cloud Storage bucket are failing with a 403 Permission Denied error code. What is the likely cause of this issue?

corretta/e:
- The service account key has been rotated but not updated on the application server.

sbagliate:
- The permissions of the service account’s predefined role have changed.
- The Interconnect link from the on-premises data center to Google Cloud is experiencing a temporary outage.
- The folder structure inside the bucket and object paths have changed.

--------------------------------------------------

167. You have an application in production. It is deployed on Compute Engine virtual machine instances controlled by a managed instance group. Traffic is routed to the instances via a HTTP(s) load balancer. Your users are unable to access your application. You want to implement a monitoring technique to alert you when the application is unavailable.
Which technique should you choose?

corretta/e:
- Stackdriver uptime checks

sbagliate:
- Cloud Load Balancing - heath checks
- Managed instance group - heath checks
- Smoke tests

--------------------------------------------------

168. Your application is running on Compute Engine and is showing sustained failures for a small number of requests. You have narrowed the cause down to a single
Compute Engine instance, but the instance is unresponsive to SSH.
What should you do next?

corretta/e:
- Enable and check the serial port output.

sbagliate:
- Take a snapshot of the disk and attach it to a new machine.
- Delete the machine and create a new one.
- Reboot the machine.

--------------------------------------------------

169. Your analytics system executes queries against a BigQuery dataset. The SQL query is executed in batch and passes the contents of a SQL file to the BigQuery
CLI. Then it redirects the BigQuery CLI output to another process. However, you are getting a permission error from the BigQuery CLI when the queries are executed.
You want to resolve the issue. What should you do?

corretta/e:
- Grant the service account BigQuery Data Viewer and BigQuery Job User roles.

sbagliate:
- Create a view in BigQuery from the SQL query and SELECT* from the view in the CLI.
- Grant the service account BigQuery Data Editor and BigQuery Data Viewer roles.
- Create a new dataset in BigQuery, and copy the source table to the new dataset Query the new dataset and table from the CLI.

--------------------------------------------------

170. You work for an ecommerce company. Your company is migrating multiple applications to Google Cloud, and you are assisting with the migration of one of the applications. The application is currently deployed on a VM without any OS dependencies. You have created a Dockerfile and used it to upload a new image to Artifact Registry. You want to minimize the infrastructure and operational complexity. What should you do?

corretta/e:
- Deploy the image to Cloud Run.

sbagliate:
- Deploy the image to a Compute Engine instance.
- Deploy the image to a GKE Autopilot cluster.
- Deploy the image to a GKE Standard cluster.

--------------------------------------------------

171. You are a lead developer working on a new retail system that runs on Cloud Run and Firestore. A web UI requirement is for the user to be able to browse through all products. A few months after go-live, you notice that Cloud Run instances are terminated with HTTP 500: Container instances are exceeding memory limits errors during busy times. This error coincides with spikes in the number of Firestore queries.

You need to prevent Cloud Run from crashing and decrease the number of Firestore queries. You want to use a solution that optimizes system performance. What should you do?

corretta/e:
- Modify the query that returns the product list using cursors with limits.

sbagliate:
- Modify the query that returns the product list using integer offsets.
- Create a custom index over the products.
- Modify the Cloud Run configuration to increase the memory limits.

--------------------------------------------------

172. Your team is developing an ecommerce platform for your company. Users will log in to the website and add items to their shopping cart. Users will be automatically logged out after 30 minutes of inactivity. When users log back in, their shopping cart should be saved. How should you store users' session and shopping cart information while following Google-recommended best practices?

corretta/e:
- Store the session information in Memorystore for Redis or Memorystore for Memcached, and store the shopping cart information in Firestore.

sbagliate:
- Store the session information in Pub/Sub, and store the shopping cart information in Cloud SQL.
- Store the shopping cart information in a file on Cloud Storage where the filename is the SESSION ID.
- Store the session and shopping cart information in a MySQL database running on multiple Compute Engine instances.

--------------------------------------------------

173. You are designing a chat room application that will host multiple rooms and retain the message history for each room. You have selected Firestore as your database. How should you represent the data in Firestore?

corretta/e:
- Create a collection for the rooms. For each room, create a document that contains a collection for documents, each of which contains a message.

sbagliate:
- Create a collection for the rooms, and create a document for each room. Create a separate collection for messages, with one document per message. Each room’s document contains a list of references to the messages.
- Create a collection for the rooms. For each room, create a document that lists the contents of the messages
- Create a collection for the rooms. For each room, create a collection that contains a document for each message

--------------------------------------------------

174. You have deployed an HTTP(s) Load Balancer with the gcloud commands shown below.
//IMG//

Health checks to port 80 on the Compute Engine virtual machine instance are failing and no traffic is sent to your instances. You want to resolve the problem.
Which commands should you run?

corretta/e:
- gcloud compute firewall-rules create allow-lb --network load-balancer --allow tcp --source-ranges 130.211.0.0/22,35.191.0.0/16 --direction INGRESS

sbagliate:
- gcloud compute firewall-rules create allow-lb --network load-balancer --allow tcp --destination-ranges 130.211.0.0/22,35.191.0.0/16 --direction EGRESS
- gcloud compute instances add-access-config ${NAME}-backend-instance-1
- gcloud compute instances add-tags ${NAME}-backend-instance-1 --tags http-server

--------------------------------------------------

175. Your company has a BigQuery data mart that provides analytics information to hundreds of employees. One user of wants to run jobs without interrupting important workloads. This user isn't concerned about the time it takes to run these jobs. You want to fulfill this request while minimizing cost to the company and the effort required on your part.
What should you do?

corretta/e:
- Ask the user to run the jobs as batch jobs.

sbagliate:
- Create a separate project for the user to run jobs.
- Add the user as a job.user role in the existing project.
- Allow the user to run jobs when important workloads are not running.

--------------------------------------------------

176. You are developing a new application. You want the application to be triggered only when a given file is updated in your Cloud Storage bucket. Your trigger might change, so your process must support different types of triggers. You want the configuration to be simple so that multiple team members can update the triggers in the future. What should you do?

corretta/e:
- Create an Eventarc trigger that monitors your Cloud Storage bucket for a specific filename, and set the target as Cloud Run.

sbagliate:
- Configure a Firebase function that executes your application and is triggered when an object is updated in Cloud Storage.
- Configure a Cloud Function that executes your application and is triggered when an object is updated in Cloud Storage.
- Configure Cloud Storage events to be sent to Pub/Sub, and use Pub/Sub events to trigger a Cloud Build job that executes your application.

--------------------------------------------------

177. You are developing a dashboard that aggregates temperature readings from thousands of IoT devices monitoring a city's ambient temperature. You expect a large amount of viewing traffic resulting in a large amount of data egress once the dashboard is live. The dashboard temperature display data doesn't need to be real-time and can tolerate a few seconds of lag. You decide to deploy Memorystore for Redis as the storage backend. You want to ensure that the dashboard will be highly available. How should you configure the service in Memorystore for Redis?

corretta/e:
- Configure Memorystore to use read replicas.

sbagliate:
- Use Private Service Access to enable low-latency network throughput.
- Update Memorystore for Redis to the latest version.
- Set up Serverless VPC Access to avoid receiving traffic over the internet.

--------------------------------------------------

178. Your team is developing an application in Google Cloud that executes with user identities maintained by Cloud Identity. Each of your application's users will have an associated Pub/Sub topic to which messages are published, and a Pub/Sub subscription where the same user will retrieve published messages. You need to ensure that only authorized users can publish and subscribe to their own specific Pub/Sub topic and subscription. What should you do?
//IMG//

corretta/e:
- Bind the user identity to the pubsub.publisher and pubsub.subscriber roles at the resource level.

sbagliate:
- Grant the user identity a custom role that contains the pubsub.topics.create and pubsub.subscriptions.create permissions.
- Configure the application to run as a service account that has the pubsub.publisher and pubsub.subscriber roles.
- Grant the user identity the pubsub.publisher and pubsub.subscriber roles at the project level.

--------------------------------------------------

179. You have an HTTP Cloud Function that is called via POST. Each submission's request body has a flat, unnested JSON structure containing numeric and text data. After the Cloud Function completes, the collected data should be immediately available for ongoing and complex analytics by many users in parallel. How should you persist the submissions?

corretta/e:
- Transform the POST request's JSON data, and stream it into BigQuery.

sbagliate:
- Transform the POST request's JSON data, and store it in a regional Cloud SQL cluster.
- Directly persist each POST request's JSON data into Datastore.
- Persist each POST request's JSON data as an individual file within Cloud Storage, with the file name containing the request identifier.

--------------------------------------------------

180. You are supporting a business-critical application in production deployed on Cloud Run. The application is reporting HTTP 500 errors that are affecting the usability of the application. You want to be alerted when the number of errors exceeds 15% of the requests within a specific time window. What should you do?

corretta/e:
- Create an alerting policy in Cloud Monitoring that alerts you if the number of errors is above the defined threshold.

sbagliate:
- Navigate to the Cloud Run page in the Google Cloud console, and select the service from the services list. Use the Metrics tab to visualize the number of errors for that revision, and refresh the page daily.
- Create a Cloud Function that consumes the Cloud Monitoring API. Use Cloud Composer to trigger the Cloud Function daily and alert you if the number of errors is above the defined threshold.
- Create a Cloud Function that consumes the Cloud Monitoring API. Use Cloud Scheduler to trigger the Cloud Function daily and alert you if the number of errors is above the defined threshold.

--------------------------------------------------

181. You are developing an application using different microservices that must remain internal to the cluster. You want the ability to configure each microservice with a specific number of replicas. You also want the ability to address a specific microservice from any other microservice in a uniform way, regardless of the number of replicas the microservice scales to. You plan to implement this solution on Google Kubernetes Engine. What should you do?

corretta/e:
- Deploy each microservice as a Deployment. Expose the Deployment in the cluster using a Service, and use the Service DNS name to address it from other microservices within the cluster.

sbagliate:
- Deploy each microservice as a Deployment. Expose the Deployment in the cluster using an Ingress, and use the Ingress IP address to address the Deployment from other microservices within the cluster.
- Deploy each microservice as a Pod. Expose the Pod in the cluster using an Ingress, and use the Ingress IP address to address the Pod from other microservices within the cluster.
- Deploy each microservice as a Pod. Expose the Pod in the cluster using a Service, and use the Service DNS name to address the microservice from other microservices within the cluster.

--------------------------------------------------

182. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
In order for HipLocal to store application state and meet their stated business requirements, which database service should they migrate to?

corretta/e:
- Cloud Spanner

sbagliate:
- Cloud Datastore
- Cloud Memorystore as a cache
- Separate Cloud SQL clusters for each region

--------------------------------------------------

183. You are building an API that will be used by Android and iOS apps. The API must:
* Support HTTPs
* Minimize bandwidth cost
* Integrate easily with mobile apps
Which API architecture should you use?

corretta/e:
- gRPC-based APIs

sbagliate:
- RESTful APIs
- MQTT for APIs
- SOAP-based APIs

--------------------------------------------------

184. You are developing an internal application that will allow employees to organize community events within your company. You deployed your application on a single Compute Engine instance. Your company uses Google Workspace (formerly G Suite), and you need to ensure that the company employees can authenticate to the application from anywhere. What should you do?

corretta/e:
- Add an HTTP(S) load balancer in front of the instance, and set up Identity-Aware Proxy (IAP). Configure the IAP settings to allow your company domain to access the website.

sbagliate:
- Add a public IP address to your instance, and restrict access to the instance using firewall rules. Allow your company's proxy as the only source IP address.
- Add a public IP address to your instance, and allow traffic from the internet. Generate a random hash, and create a subdomain that includes this hash and points to your instance. Distribute this DNS address to your company's employees.
- Set up a VPN tunnel between your company network and your instance's VPC location on Google Cloud. Configure the required firewall rules and routing information to both the on-premises and Google Cloud networks.

--------------------------------------------------

185. You work for an ecommerce company. You are developing a new application with the following requirements:
• The application must have access to the most up-to-date data at all times.
• Due to company policy, data older than 30 days must be automatically deleted.

You need to determine which service should host the database, and how to configure the data deletion. You want to use the most efficient solution. What should you do?

corretta/e:
- Configure Bigtable to host the database. Create a garbage collection policy in Bigtable that deletes data older than 30 days.

sbagliate:
- Configure Bigtable to host the database. Create a time-to-live policy that deletes data older than 30 days.
- Configure Spanner to host the database. Create a time-to-live policy that deletes data older than 30 days.
- Configure Spanner to host the database. Use Data Catalog to delete data older than 30 days.

--------------------------------------------------

186. You have an application running in App Engine. Your application is instrumented with Stackdriver Trace. The /product-details request reports details about four known unique products at /sku-details as shown below. You want to reduce the time it takes for the request to complete.
What should you do?
//IMG//

corretta/e:
- Change /product-details to perform the requests in parallel.

sbagliate:
- Store the /sku-details information in a database, and replace the webservice call with a database query.
- Change the Persistent Disk type to SSD.
- Increase the size of the instance class.

--------------------------------------------------

187. You are building a mobile application that will store hierarchical data structures in a database. The application will enable users working offline to sync changes when they are back online. A backend service will enrich the data in the database using a service account. The application is expected to be very popular and needs to scale seamlessly and securely. Which database and IAM role should you use?

corretta/e:
- Use Firestore in Native mode and assign the roles/datastore.user role to the service account.

sbagliate:
- Use Cloud SQL, and assign the roles/cloudsql.editor role to the service account.
- Use Firestore in Datastore mode and assign the roles/datastore.viewer role to the service account.
- Use Bigtable, and assign the roles/bigtable.viewer role to the service account.

--------------------------------------------------

188. Your development team has been tasked with maintaining a .NET legacy application. The application incurs occasional changes and was recently updated. Your goal is to ensure that the application provides consistent results while moving through the CI/CD pipeline from environment to environment. You want to minimize the cost of deployment while making sure that external factors and dependencies between hosting environments are not problematic. Containers are not yet approved in your organization. What should you do?

corretta/e:
- Use Cloud Build to deploy the application as a new Compute Engine image for each build. Use this image in each environment.

sbagliate:
- Deploy the application using MS Web Deploy, and make sure to always use the latest, patched MS Windows Server base image in Compute Engine.
- Use Cloud Build to package the application, and deploy to a Google Kubernetes Engine cluster. Use namespaces to separate the environments.
- Rewrite the application using .NET Core, and deploy to Cloud Run. Use revisions to separate the environments.

--------------------------------------------------

189. You plan to deploy a new Go application to Cloud Run. The source code is stored in Cloud Source Repositories. You need to configure a fully managed, automated, continuous deployment pipeline that runs when a source code commit is made. You want to use the simplest deployment solution. What should you do?

corretta/e:
- Use Cloud Build with a trigger configured to run the container build and deploy process for each source code commit to Cloud Source Repositories.

sbagliate:
- Configure continuous deployment of new revisions from a source repository for Cloud Run using buildpacks.
- Configure a Jenkins trigger to run the container build and deploy process for each source code commit to Cloud Source Repositories.
- Configure a cron job on your workstations to periodically run gcloud run deploy --source in the working directory.

--------------------------------------------------

190. You are building an application that uses a distributed microservices architecture. You want to measure the performance and system resource utilization in one of the microservices written in Java. What should you do?

corretta/e:
- Instrument the service with Cloud Profiler to measure CPU utilization and method-level execution times in the service.

sbagliate:
- Instrument the service with Cloud Trace to measure request latency.
- Instrument the service with Debugger to investigate service errors.
- Instrument the service with OpenCensus to measure service latency, and write custom metrics to Cloud Monitoring.

--------------------------------------------------

191. You want to notify on-call engineers about a service degradation in production while minimizing development time.
What should you do?

corretta/e:
- Use Stackdriver Monitoring to monitor resources and raise alerts.

sbagliate:
- Use Cloud Function to monitor resources and raise alerts.
- Use Stackdriver Error Reporting to capture errors and raise alerts.
- Use Cloud Pub/Sub to monitor resources and raise alerts.

--------------------------------------------------

192. You are responsible for improving the security of your Cloud Run services to protect these services against supply chain threats. You need to ensure that there are adequate security controls such as SLSA Level 3 builds for container images and non-falsifiable provenance for container images by using Google Cloud tools. What should you do?

corretta/e:
- Use Cloud Build to build container images. Configure a Binary Authorization policy on the Cloud Run job.

sbagliate:
- Use Cloud Build to build container images. Use Cloud Scheduler to automate delivery of your applications to a series of target environments in a defined sequence.
- Use Cloud Deploy to generate authenticated and non-falsifiable build provenance for container images.
- Ask developers to build container images locally and ensure strict version controls by using Container Registry.

--------------------------------------------------

193. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal has connected their Hadoop infrastructure to GCP using Cloud Interconnect in order to query data stored on persistent disks.
Which IP strategy should they use?

corretta/e:
- Create manual subnets.

sbagliate:
- Provision a single instance for NAT.
- Create multiple peered VPCs.
- Create an auto mode subnet.

--------------------------------------------------

194. You are developing a new ecommerce website for your company. You want customers to receive a customized email notification when they place an order. You need to configure this email service while minimizing deployment effort. What should you do?

corretta/e:
- Create a Cloud Function that is triggered by a create type event in Firestore,

sbagliate:
- Create an email notification channel, and set up an alerting policy that is based on log metrics from a create type event.
- Create an email-sending application hosted on Compute Engine that is invoked by an HTTP request.
- Use Pub/Sub to send an email when the orders/ API returns an HTTP response of 200 OK.

--------------------------------------------------

195. Your team develops services that run on Google Cloud. You want to process messages sent to a Pub/Sub topic, and then store them. Each message must be processed exactly once to avoid duplication of data and any data conflicts. You need to use the cheapest and most simple solution. What should you do?

corretta/e:
- Process the messages with a Dataflow streaming pipeline using Apache Beam's PubSubIO package, and write the output to storage.

sbagliate:
- Process the messages with a Dataproc job, and write the output to storage.
- Process the messages with a Cloud Function, and write the results to a BigQuery location where you can run a job to deduplicate the data.
- Retrieve the messages with a Dataflow streaming pipeline, store them in Cloud Bigtable, and use another Dataflow streaming pipeline to deduplicate messages.

--------------------------------------------------

196. You are using Cloud Run to host a web application. You need to securely obtain the application project ID and region where the application is running and display this information to users. You want to use the most performant approach. What should you do?

corretta/e:
- Use HTTP requests to query the available metadata server at the http://metadata.google.internal/ endpoint with the Metadata-Flavor: Google header.

sbagliate:
- Make an API call to the Cloud Asset Inventory API from the application and format the request to include instance metadata.
- In the Google Cloud console, navigate to the Project Dashboard and gather configuration details. Navigate to the Cloud Run “Variables & Secrets” tab, and add the desired environment variables in Key:Value format.
- In the Google Cloud console, navigate to the Project Dashboard and gather configuration details. Write the application configuration information to Cloud Run's in-memory container filesystem.

--------------------------------------------------

197. Your team develops stateless services that run on Google Kubernetes Engine (GKE). You need to deploy a new service that will only be accessed by other services running in the GKE cluster. The service will need to scale as quickly as possible to respond to changing load. What should you do?

corretta/e:
- Use a Horizontal Pod Autoscaler to scale the containers, and expose them via a ClusterIP Service.

sbagliate:
- Use a Horizontal Pod Autoscaler to scale the containers, and expose them via a NodePort Service.
- Use a Vertical Pod Autoscaler to scale the containers, and expose them via a NodePort Service.
- Use a Vertical Pod Autoscaler to scale the containers, and expose them via a ClusterIP Service.

--------------------------------------------------

198. You need to deploy a new feature into production on Cloud Run. Your company’s SRE team mandates gradual deployments to avoid large downtimes caused by code change errors. You want to configure this deployment with minimal effort. What should you do?

corretta/e:
- Deploy the feature with “Serve this revision immediately” unchecked, and configure the new revision to serve a small percentage of traffic. Check for errors, and increase traffic to the revision as appropriate.

sbagliate:
- Deploy the feature with “Serve this revision immediately” checked. Check for errors, roll back to the previous revision, and repeat the process until you have verified that the deployment is bug-free.
- Configure the application code to send a small percentage of users to the newly deployed revision.
- Configure the application’s frontend load balancer to toggle between the new and old revisions.

--------------------------------------------------

199. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal is configuring their access controls.
Which firewall configuration should they implement?

corretta/e:
- Allow traffic on port 443 for a specific tag.

sbagliate:
- Allow all traffic into the network.
- Block all traffic on port 443.
- Allow all traffic on port 443 into the network.

--------------------------------------------------

200. Your organization has recently begun an initiative to replatform their legacy applications onto Google Kubernetes Engine. You need to decompose a monolithic application into microservices. Multiple instances have read and write access to a configuration file, which is stored on a shared file system. You want to minimize the effort required to manage this transition, and you want to avoid rewriting the application code. What should you do?

corretta/e:
- Create a new Filestore instance, and mount the volume as an NFS PersistentVolume.

sbagliate:
- Create a new persistent disk, and mount the volume as a shared PersistentVolume.
- Create a new ConfigMap and volumeMount to store the contents of the configuration file.
- Create a new Cloud Storage bucket, and mount it via FUSE in the container.

--------------------------------------------------

201. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

How should HipLocal redesign their architecture to ensure that the application scales to support a large increase in users?

corretta/e:
- Use Memorystore to store session information and CloudSQL to store state information. Use a Google Cloud-managed load balancer to distribute the load between instances. Use managed instance groups for scaling.

sbagliate:
- Use Google Kubernetes Engine (GKE) to run the application as a microservice. Run the MySQL database on a dedicated GKE node.
- Use multiple Compute Engine instances to run MySQL to store state information. Use a Google Cloud-managed load balancer to distribute the load between instances. Use managed instance groups for scaling.
- Use a Cloud Storage bucket to serve the application as a static website, and use another Cloud Storage bucket to store user state information.

--------------------------------------------------

202. You have developed a Python application that you want to containerize and deploy to Cloud Run. You have developed a Cloud Build pipeline with the following steps:

//IMG//


After triggering the pipeline, you notice in the Cloud Build logs that the final step of the pipeline fails and the container is unable to be deployed to Cloud Run. What is the cause of this issue, and how should you resolve it?

corretta/e:
- The Docker container image has not been pushed to Artifact Registry. Add a step to the pipeline to push the application container image to Artifact Registry, and rerun the pipeline.

sbagliate:
- The final step uses a Cloud Run instance name that does not match the container name. Update the deployment step so that the Cloud Run instance name matches the container name, and rerun the pipeline.
- Unit tests in the pipeline are failing. Update the application code so that all unit tests pass, and rerun the pipeline.
- Cloud Run does not allow unauthenticated invocations. Remove the --allow-unauthenticated parameter to enforce authentication on the application, and rerun the pipeline.

--------------------------------------------------

203. You are planning to deploy hundreds of microservices in your Google Kubernetes Engine (GKE) cluster. How should you secure communication between the microservices on GKE using a managed service?

corretta/e:
- Install Anthos Service Mesh, and enable mTLS in your Service Mesh.

sbagliate:
- Use global HTTP(S) Load Balancing with managed SSL certificates to protect your services
- Install cert-manager on GKE to automatically renew the SSL certificates.
- Deploy open source Istio in your GKE cluster, and enable mTLS in your Service Mesh

--------------------------------------------------

204. Your application requires service accounts to be authenticated to GCP products via credentials stored on its host Compute Engine virtual machine instances. You want to distribute these credentials to the host instances as securely as possible.
What should you do?

corretta/e:
- Use the instance's service account Application Default Credentials to authenticate to the required resources.

sbagliate:
- Commit the credential JSON file into your application's source repository, and have your CI/CD process package it with the software that is deployed to the instance.
- Use HTTP signed URLs to securely provide access to the required resources.
- Generate a P12 file from the GCP Console after the instance is deployed, and copy the credentials to the host instance before starting the application.

--------------------------------------------------

205. You are designing an application that shares PDF files containing time-sensitive information with users. The PDF files are saved in Cloud Storage. You need to provide secure access to the files.

You have the following requirements:
• Users should only have access to files that they are allowed to view.
• Users should be able to request to read, write, or delete the PDF files for 24 hours.

Not all users of the application have a Google account. How should you provide access to data objects?

corretta/e:
- Configure the application to generate signed URLs with an expiration time of 24 hours. Share the signed URLs with users. Attach the signed URL to the PDF files that users require access to.

sbagliate:
- Generate a service account that grants access to the POF files. Configure the application to provide users with a download link to the service account's key file. Set an expiration time of 24 hours to the service account Keys. Instruct users to authenticate by using the service account key file.
- Assign the Storage Object User IAM role to users that request access to the PDF files. Set an IAM condition on the role to expire after 24 hours.
- Provide users with the Service Account Token Creator IAM role to impersonate the application's service account. Assign the Cloud Storage User IAM role to the application's service account to access the Cloud Storage bucket. Rotate the application's service account key every 24 hours.

--------------------------------------------------

206. You are a developer at a social media company. The company runs their social media website on-premises and uses MySQL as a backend to store user profiles and user posts. Your company plans to migrate to Google Cloud, and your learn will migrate user profile information to Firestore. You are tasked with designing the Firestore collections. What should you do?

corretta/e:
- Create one root collection for user profiles, and create one subcollection for each user's posts.

sbagliate:
- Create one root collection for user profiles, and create one root collection for user posts.
- Create one root collection for user profiles, and store each user's post as a nested list in the user profile document.
- Create one root collection for user posts, and create one subcollection for each user's profile.

--------------------------------------------------

207. Your company has created an application that uploads a report to a Cloud Storage bucket. When the report is uploaded to the bucket, you want to publish a message to a Cloud Pub/Sub topic. You want to implement a solution that will take a small amount to effort to implement.
What should you do?

corretta/e:
- Configure the Cloud Storage bucket to trigger Cloud Pub/Sub notifications when objects are modified.

sbagliate:
- Create a Cloud Function that is triggered by the Cloud Storage bucket. In the Cloud Function, publish a message to the Cloud Pub/Sub topic.
- Create an App Engine application to receive the file; when it is received, publish a message to the Cloud Pub/Sub topic.
- Create an application deployed in a Google Kubernetes Engine cluster to receive the file; when it is received, publish a message to the Cloud Pub/Sub topic.

--------------------------------------------------

208. You are designing a microservices architecture for a new application that will be deployed on Cloud Run. The application requires high-throughput communication between the internal microservices. You want to use the most effective, lowest latency communication protocol for this application. What should you do?

corretta/e:
- Configure the Cloud Run service to use HTTP/2. Implement gRPC for communication between the microservices. Use streaming gRPCs when a large amount of data has to be sent.

sbagliate:
- Implement the microservices with the REST API communication protocol. Use Apigee with rate-limiting to provide the best QoS for high-priority services.
- Use SOAP to build the microservices API, and use XML as the data format for communication across the microservices. Define SOAP data contracts for each microservice.
- Use HTTP REST to communicate across the microservices. Implement pagination and add indexing to your database.

--------------------------------------------------

209. You are deploying a containerized application to GKE. You have set up a build pipeline by using Cloud Build that builds a Java application and pushes the application container image to Artifact Registry. Your build pipeline executes multiple sequential steps that reference Docker container images with the same layers.

You notice that the Cloud Build pipeline runs are taking longer than expected to complete. How should you optimize the Docker image build process?

corretta/e:
- Specify the cached image by adding the --cache-from argument in your build config file with the image as a cache source.

sbagliate:
- Store container artifacts on Cloud Storage. Configure Cloud CDN on the Cloud Storage bucket to enable caching on edge locations.
- Configure Cloud Build to use a private pool in your VPC for pipeline executions.
- Add the --squash parameter to the Docker build steps to combine newly built layers into a single layer.

--------------------------------------------------

210. You are developing a mobile application that allows users to create and manage to-do lists. Your application has the following requirements:

• Store and synchronize data between different mobile devices.
• Support offline access.
• Provide real-time updates on each user's device.

You need to implement a database solution while minimizing operational effort. Which approach should you use?

corretta/e:
- Use Firestore as the database. Configure Firestore offline persistence to cache a copy of the Firestore data. Listen to document changes to update applications whenever there are document changes.

sbagliate:
- Implement a SQLite database on each user's device. Use a scheduled job to synchronize each device database with a copy stored in Cloud Storage.
- Create a Bigtable instance. Design a database schema to avoid hotspots when writing data. Use a Bigtable change stream to capture data changes.
- Create a Cloud SQL for MySQL instance. Implement a data model to store to-do list information. Create indexes for the most heavily and frequently used queries.

--------------------------------------------------

211. Your team is building an application for a financial institution. The application's frontend runs on Compute Engine, and the data resides in Cloud SQL and one Cloud Storage bucket. The application will collect data containing PII, which will be stored in the Cloud SQL database and the Cloud Storage bucket. You need to secure the PII data. What should you do?

corretta/e:
- 1. Configure a private IP address for Cloud SQL
2. Use VPC-SC to create a service perimeter
3. Add the Cloud SQL database and the Cloud Storage bucket to the same service perimeter

sbagliate:
- 1. Create the relevant firewall rules to allow only the frontend to communicate with the Cloud SQL database
2. Using IAM, allow only the frontend service account to access the Cloud Storage bucket
- 1. Configure a private IP address for Cloud SQL
2. Use VPC-SC to create a service perimeter
3. Add the Cloud SQL database and the Cloud Storage bucket to different service perimeters
- 1. Create the relevant firewall rules to allow only the frontend to communicate with the Cloud SQL database
2. Enable private access to allow the frontend to access the Cloud Storage bucket privately

--------------------------------------------------

212. You are trying to connect to your Google Kubernetes Engine (GKE) cluster using kubectl from Cloud Shell. You have deployed your GKE cluster with a public endpoint. From Cloud Shell, you run the following command:

//IMG//


You notice that the kubectl commands time out without returning an error message. What is the most likely cause of this issue?

corretta/e:
- Your Cloud Shell external IP address is not part of the authorized networks of the cluster.

sbagliate:
- The Cloud Shell is not part of the same VPC as the GKE cluster.
- Your user account does not have privileges to interact with the cluster using kubectl.
- A VPC firewall is blocking access to the cluster’s endpoint.

--------------------------------------------------

213. You have an application running in a production Google Kubernetes Engine (GKE) cluster. You use Cloud Deploy to automatically deploy your application to your production GKE cluster. As part of your development process, you are planning to make frequent changes to the application’s source code and need to select the tools to test the changes before pushing them to your remote source code repository. Your toolset must meet the following requirements:
• Test frequent local changes automatically.
• Local deployment emulates production deployment.

Which tools should you use to test building and running a container on your laptop using minimal resources?

corretta/e:
- Minikube and Skaffold

sbagliate:
- kaniko and Tekton
- Docker Compose and dockerd
- Terraform and kubeadm

--------------------------------------------------

214. You are building a CI/CD pipeline that consists of a version control system, Cloud Build, and Container Registry. Each time a new tag is pushed to the repository, a Cloud Build job is triggered, which runs unit tests on the new code builds a new Docker container image, and pushes it into Container Registry. The last step of your pipeline should deploy the new container to your production Google Kubernetes Engine (GKE) cluster. You need to select a tool and deployment strategy that meets the following requirements:
• Zero downtime is incurred
• Testing is fully automated
• Allows for testing before being rolled out to users
• Can quickly rollback if needed

What should you do?

corretta/e:
- Trigger another Cloud Build job that uses the Kubernetes CLI tools to deploy your new container to your GKE cluster, where you can perform a shadow test.

sbagliate:
- Trigger a Spinnaker pipeline configured as an A/B test of your new code and, if it is successful, deploy the container to production.
- Trigger a Spinnaker pipeline configured as a canary test of your new code and, if it is successful, deploy the container to production.
- Trigger another Cloud Build job that uses the Kubernetes CLI tools to deploy your new container to your GKE cluster, where you can perform a canary test.

--------------------------------------------------

215. You made a typo in a low-level Linux configuration file that prevents your Compute Engine instance from booting to a normal run level. You just created the Compute Engine instance today and have done no other maintenance on it, other than tweaking files. How should you correct this error?

corretta/e:
- Configure and log in to the Compute Engine instance through the serial port, and change the file

sbagliate:
- Configure and log in to the Compute Engine instance through SSH, and change the file
- Download the file using scp, change the file, and then upload the modified version
- Configure and log in to the Compute Engine instance using a remote desktop client, and change the file

--------------------------------------------------

216. You have an application controlled by a managed instance group. When you deploy a new version of the application, costs should be minimized and the number of instances should not increase. You want to ensure that, when each new instance is created, the deployment only continues if the new instance is healthy.
What should you do?

corretta/e:
- Perform a rolling-action with maxSurge set to 0, maxUnavailable set to 1

sbagliate:
- Perform a rolling-action with maxSurge set to 1, maxUnavailable set to 0.
- Perform a rolling-action with maxHealthy set to 1, maxUnhealthy set to 0.
- Perform a rolling-action with maxHealthy set to 0, maxUnhealthy set to 1.

--------------------------------------------------

217. You want to upload files from an on-premises virtual machine to Google Cloud Storage as part of a data migration. These files will be consumed by Cloud
DataProc Hadoop cluster in a GCP environment.
Which command should you use?

corretta/e:
- gsutil cp [LOCAL_OBJECT] gs://[DESTINATION_BUCKET_NAME]/

sbagliate:
- gcloud dataproc cp [LOCAL_OBJECT] gs://[DESTINATION_BUCKET_NAME]/
- hadoop fs cp [LOCAL_OBJECT] gs://[DESTINATION_BUCKET_NAME]/
- gcloud cp [LOCAL_OBJECT] gs://[DESTINATION_BUCKET_NAME]/

--------------------------------------------------

218. You are monitoring a web application that is written in Go and deployed in Google Kubernetes Engine. You notice an increase in CPU and memory utilization. You need to determine which source code is consuming the most CPU and memory resources. What should you do?

corretta/e:
- Import the Cloud Profiler package into your application, and initialize the Profiler agent. Review the generated flame graph in the Google Cloud console to identify time-intensive functions.

sbagliate:
- Download, install, and start the Snapshot Debugger agent in your VM. Take debug snapshots of the functions that take the longest time. Review the call stack frame, and identify the local variables at that level in the stack.
- Create a Cloud Logging query that gathers the web application's logs. Write a Python script that calculates the difference between the timestamps from the beginning and the end of the application's longest functions to identity time-intensive functions.
- Import OpenTelemetry and Trace export packages into your application, and create the trace provider.
Review the latency data for your application on the Trace overview page, and identify where bottlenecks are occurring.

--------------------------------------------------

219. You are using Cloud Build build to promote a Docker image to Development, Test, and Production environments. You need to ensure that the same Docker image is deployed to each of these environments.
How should you identify the Docker image in your build?

corretta/e:
- Use the digest of the Docker image.

sbagliate:
- Use a unique Docker image name.
- Use a semantic version Docker image tag.
- Use the latest Docker image tag.

--------------------------------------------------

220. You developed a Python script that retrieves information from files that are uploaded to Cloud Storage and writes the information to Bigtable. You have completed testing on your local environment and created the python-script service account with the Bigtable User IAM role. You want to deploy the code with the appropriate authentication while following Google-recommended practices. What should you do?

corretta/e:
- 1. Deploy your code to Cloud Functions. Create a Cloud Storage trigger.
2. Configure IAM binding for authentication.

sbagliate:
- 1. Deploy your image to Cloud Run. Create a trigger in Cloud Scheduler that triggers the service every minute.
2. Create a service account key for authentication.
- 1. Deploy your image to Cloud Run. Create a trigger in Cloud Scheduler that triggers the service every minute.
2. Configure IAM binding for authentication.
- 1. Deploy your code to Cloud Functions. Create a Cloud Storage trigger.
2. Create a service account key for authentication

--------------------------------------------------

221. You are developing a web application that will be accessible over both HTTP and HTTPS and will run on Compute Engine instances. On occasion, you will need to SSH from your remote laptop into one of the Compute Engine instances to conduct maintenance on the app. How should you configure the instances while following Google-recommended best practices?

corretta/e:
- Configure Cloud Identity-Aware Proxy API for SSH access. Then configure the Compute Engine servers with private IP addresses behind an HTTP(s) load balancer for the application web traffic.

sbagliate:
- Configure the firewall rules to allow all ingress traffic to connect to the Compute Engine web servers, with each server having a unique external IP address.
- Set up a backend with Compute Engine web server instances with a private IP address behind a TCP proxy load balancer.
- Set up a backend with Compute Engine web server instances with a private IP address behind an HTTP(S) load balancer. Set up a bastion host with a public IP address and open firewall ports. Connect to the web instances using the bastion host.

--------------------------------------------------

222. You have an application that uses an HTTP Cloud Function to process user activity from both desktop browser and mobile application clients. This function will serve as the endpoint for all metric submissions using HTTP POST.
Due to legacy restrictions, the function must be mapped to a domain that is separate from the domain requested by users on web or mobile sessions. The domain for the Cloud Function is https://fn.example.com. Desktop and mobile clients use the domain https://www.example.com. You need to add a header to the function's
HTTP response so that only those browser and mobile sessions can submit metrics to the Cloud Function. Which response header should you add?

corretta/e:
- Access-Control-Allow-origin: https://www.example.com

sbagliate:
- Access-Control-Allow-Origin: *
- Access-Control-Allow-Origin: https://fn.example.com
- Access-Control-Allow-Origin: https://*.example.com

--------------------------------------------------

223. You are deploying your application on a Compute Engine instance that communicates with Cloud SQL. You will use Cloud SQL Proxy to allow your application to communicate to the database using the service account associated with the application's instance. You want to follow the Google-recommended best practice of providing minimum access for the role assigned to the service account. What should you do?

corretta/e:
- Assign the Cloud SQL Client role.

sbagliate:
- Assign the Project Owner role.
- Assign the Cloud SQL Editor role.
- Assign the Project Editor role.

--------------------------------------------------

224. Your infrastructure team uses Terraform Cloud and manages Google Cloud resources by using Terraform configuration files. You want to configure an infrastructure as code pipeline that authenticates to Google Cloud APIs. You want to use the most secure approach and minimize changes to the configuration. How should you configure the authentication?

corretta/e:
- Configure Terraform Cloud to use workload identity federation to authenticate to the Google Cloud APIs.

sbagliate:
- Create a service account that has the required permissions to manage the Google Cloud resources, and import the service account key to Terraform Cloud. Use this service account to authenticate to the Google Cloud APIs.
- Install Terraform on a Compute Engine VM. Configure the VM by using a service account that has the required permissions to manage the Google Cloud resources.
- Use Terraform on GKE. Create a Kubernetes service account to execute the Terraform code. Use workload identity federation to authenticate as the Google service account.

--------------------------------------------------

225. You have two Google Cloud projects, named Project A and Project B. You need to create a Cloud Function in Project A that saves the output in a Cloud Storage bucket in Project B. You want to follow the principle of least privilege. What should you do?

corretta/e:
- 1. Create a Google service account in Project A
2. Deploy the Cloud Function with the service account in Project A.
3. Assign this service account the roles/storage.objectCreator role on the storage bucket residing in Project B.

sbagliate:
- 1. Determine the default App Engine service account (PROJECT_ID@appspot.gserviceaccount.com) in Project B.
2. Deploy the Cloud Function with the default App Engine service account in Project A.
3. Assign the default App Engine service account the roles/storage.objectCreator role on the storage bucket residing in Project B.
- 1. Determine the default App Engine service account (PROJECT_ID@appspot.gserviceaccount.com) in Project A.
2. Deploy the Cloud Function with the default App Engine service account in Project A.
3. Assign the default App Engine service account the roles/storage.objectCreator role on the storage bucket residing in Project B.
- 1. Create a Google service account in Project B.
2. Deploy the Cloud Function with the service account in Project A.
3. Assign this service account the roles/storage.objectCreator role on the storage bucket residing in Project B.

--------------------------------------------------

226. You are in the final stage of migrating an on-premises data center to Google Cloud. You are quickly approaching your deadline, and discover that a web API is running on a server slated for decommissioning. You need to recommend a solution to modernize this API while migrating to Google Cloud. The modernized web API must meet the following requirements:

• Autoscales during high traffic periods at the end of each month
• Written in Python 3.x
• Developers must be able to rapidly deploy new versions in response to frequent code changes

You want to minimize cost, effort, and operational overhead of this migration. What should you do?

corretta/e:
- Modernize and deploy the code on App Engine standard environment.

sbagliate:
- Ask the development team to re-write the application to run as a Docker container on Google Kubernetes Engine.
- Modernize and deploy the code on App Engine flexible environment.
- Deploy the modernized application to an n1-standard-1 Compute Engine instance.

--------------------------------------------------

227. Your team uses Cloud Storage for a video and image application that was recently migrated to Google Cloud. Following a viral surge, users are reporting application instability, coinciding with a 10x increase in HTTP 429 error codes from Cloud Storage APIs. You need to resolve the errors and establish a long-term solution. You want to ensure that the application remains stable if the load increases again in the future. What should you do?

corretta/e:
- Implement a retry strategy with exponential backoff for requests that encounter HTTP 429 errors.

sbagliate:
- Optimize the application code to reduce unnecessary calls to Cloud Storage APIs to prevent HTTP 429 errors.
- Migrate all image and video data to Firestore. Replace the Cloud Storage APIs in the application code with the new Firestore database.
- Compress the video and images files to reduce their size, and minimize storage costs and bandwidth usage. Implement a custom throttling mechanism in the application that limits the number of concurrent API calls.

--------------------------------------------------

228. Your company needs a database solution that stores customer purchase history and meets the following requirements:
✑ Customers can query their purchase immediately after submission.
✑ Purchases can be sorted on a variety of fields.
✑ Distinct record formats can be stored at the same time.
Which storage option satisfies these requirements?

corretta/e:
- Firestore in Native mode

sbagliate:
- Cloud SQL using a SQL SELECT statement
- Firestore in Datastore mode using a global query
- Cloud Storage using an object read

--------------------------------------------------

229. You have deployed a Java application to Cloud Run. Your application requires access to a database hosted on Cloud SQL. Due to regulatory requirements, your connection to the Cloud SQL instance must use its internal IP address. How should you configure the connectivity while following Google-recommended best practices?

corretta/e:
- Configure your Cloud Run service to use a Serverless VPC Access connector.

sbagliate:
- Configure your Cloud Run service with a Cloud SQL connection.
- Configure your application to connect to an instance of the Cloud SQL Auth proxy.
- Configure your application to use the Cloud SQL Java connector.

--------------------------------------------------

230. Your development team has been asked to refactor an existing monolithic application into a set of composable microservices. Which design aspects should you implement for the new application? (Choose two.)

corretta/e:
- Create an API contract agreement between the microservice implementation and microservice caller.

sbagliate:
- Require asynchronous communications between all microservice implementations and microservice callers.
- Ensure that sufficient instances of the microservice are running to accommodate the performance requirements.
- Develop the microservice code in the same programming language used by the microservice caller.
- Implement a versioning scheme to permit future changes that could be incompatible with the current interface.

--------------------------------------------------

231. You configured your Compute Engine instance group to scale automatically according to overall CPU usage. However, your application's response latency increases sharply before the cluster has finished adding up instances. You want to provide a more consistent latency experience for your end users by changing the configuration of the instance group autoscaler.
Which two configuration changes should you make? (Choose two.)

corretta/e:
- 

sbagliate:
- Increase the target CPU usage for the instance group autoscaler.
- Decrease the target CPU usage for the instance group autoscaler.
- Decrease the cool-down period for instances added to the group.
- Add the label ג€AUTOSCALEג€ to the instance group template.
- Remove the health-check for individual VMs in the instance group.

--------------------------------------------------

232. Your company has a data warehouse that keeps your application information in BigQuery. The BigQuery data warehouse keeps 2 PBs of user data. Recently, your company expanded your user base to include EU users and needs to comply with these requirements:
✑ Your company must be able to delete all user account information upon user request.
✑ All EU user data must be stored in a single region specifically for EU users.
Which two actions should you take? (Choose two.)

corretta/e:
- 

sbagliate:
- Create a Cloud Storage bucket in the EU region to store information for EU users only.
- Re-upload your data using to a Cloud Dataflow pipeline by filtering your user records out.
- Use DML statements in BigQuery to update/delete user records based on their requests.
- Use BigQuery federated queries to query data from Cloud Storage.
- Create a dataset in the EU region that will keep information about EU users only.

--------------------------------------------------

233. You are using the Cloud Client Library to upload an image in your application to Cloud Storage. Users of the application report that occasionally the upload does not complete and the client library reports an HTTP 504 Gateway Timeout error. You want to make the application more resilient to errors. What changes to the application should you make?

corretta/e:
- Write an exponential backoff process around the client library call.

sbagliate:
- Create a queue for the object and inform the users that the application will try again in 10 minutes.
- Design a retry button in the application and ask users to click if the error occurs.
- Write a one-second wait time backoff process around the client library call.

--------------------------------------------------

234. Your web application is deployed to the corporate intranet. You need to migrate the web application to Google Cloud. The web application must be available only to company employees and accessible to employees as they travel. You need to ensure the security and accessibility of the web application while minimizing application changes. What should you do?

corretta/e:
- Configure Identity-Aware Proxy to allow employees to access the application through its public IP address.

sbagliate:
- Configure a Compute Engine instance that requests users to log in to their corporate account. Change the web application DNS to point to the proxy Compute Engine instance. After authenticating, the Compute Engine instance forwards requests to and from the web application.
- Configure a Compute Engine instance that requests users to log in to their corporate account. Change the web application DNS to point to the proxy Compute Engine instance. After authenticating, the Compute Engine issues an HTTP redirect to a public IP address hosting the web application.
- Configure the application to check authentication credentials for each HTTP(S) request to the application.

--------------------------------------------------

235. Your ecommerce application receives external requests and forwards them to third-party API services for credit card processing, shipping, and inventory management as shown in the diagram.

//IMG//


Your customers are reporting that your application is running slowly at unpredictable times. The application doesn’t report any metrics. You need to determine the cause of the inconsistent performance. What should you do?

corretta/e:
- Install the OpenTelemetry library for your respective language, and instrument your application.

sbagliate:
- Install the Ops Agent inside your container and configure it to gather application metrics.
- Modify your application to read and forward the X-Cloud-Trace-Context header when it calls the downstream services.
- Enable Managed Service for Prometheus on the Google Kubernetes Engine cluster to gather application metrics.

--------------------------------------------------

236. You are deploying a single website on App Engine that needs to be accessible via the URL http://www.altostrat.com/.
What should you do?

corretta/e:
- Verify domain ownership with Webmaster Central. Create a DNS CNAME record to point to the App Engine canonical name ghs.googlehosted.com.

sbagliate:
- Define a mapping in dispatch.yaml to point the domain www.altostrat.com to your App Engine service. Define an A record pointing to the single global App Engine IP address.
- Verify domain ownership with Webmaster Central. Define an A record pointing to the single global App Engine IP address.
- Define a mapping in dispatch.yaml to point the domain www.altostrat.com to your App Engine service. Create a DNS CNAME record to point to the App Engine canonical name ghs.googlehosted.com.

--------------------------------------------------

237. Your company’s development teams want to use various open source operating systems in their Docker builds. When images are created in published containers in your company’s environment, you need to scan them for Common Vulnerabilities and Exposures (CVEs). The scanning process must not impact software development agility. You want to use managed services where possible. What should you do?

corretta/e:
- Enable the Vulnerability scanning setting in the Container Registry.

sbagliate:
- Disallow the use of non-commercially supported base images in your development environment.
- Create a Cloud Function that is triggered on a code check-in and scan the code for CVEs.
- Use Cloud Monitoring to review the output of Cloud Build to determine whether a vulnerable version has been used.

--------------------------------------------------

238. You are defining your system tests for an application running in Cloud Run in a Google Cloud project. You need to create a testing environment that is isolated from the production environment. You want to fully automate the creation of the testing environment with the least amount of effort and execute automated tests. What should you do?

corretta/e:
- Using Cloud Build, execute Terraform scripts to create a new Google Cloud project and a Cloud Run instance of your application in the Google Cloud project.

sbagliate:
- Using Cloud Build, execute gcloud commands to create a new Google Cloud project and a Cloud Run instance of your application in the Google Cloud project.
- Using Cloud Build, execute gcloud commands to deploy a new Cloud Run revision in the existing Google Cloud project. Use traffic splitting to send traffic to your test environment.
- Using Cloud Build, execute a Terraform script to deploy a new Cloud Run revision in the existing Google Cloud project. Use traffic splitting to send traffic to your test environment.

--------------------------------------------------

239. Your data is stored in Cloud Storage buckets. Fellow developers have reported that data downloaded from Cloud Storage is resulting in slow API performance.
You want to research the issue to provide details to the GCP support team.
Which command should you run?

corretta/e:
- gsutil perfdiag ג€"o output.json gs://my-bucket

sbagliate:
- gsutil test ג€"o output.json gs://my-bucket
- gcloud services test ג€"o output.json gs://my-bucket
- gcloud compute scp example-instance:~/test-data ג€"o output.json gs://my-bucket

--------------------------------------------------

240. You have a web application that publishes messages to Pub/Sub. You plan to build new versions of the application locally and want to quickly test Pub/Sub integration for each new build. How should you configure local testing?

corretta/e:
- Install the Pub/Sub emulator using gcloud, and start the emulator with a valid Google Project ID. When developing locally, configure your application to use the local emulator with ${gcloud beta emulators pubsub env-init}.

sbagliate:
- Install Cloud Code on the integrated development environment (IDE). Navigate to Cloud APIs, and enable Pub/Sub against a valid Google Project ID. When developing locally, configure your application to call pubsub.googleapis.com.
- Install the Pub/Sub emulator using gcloud, and start the emulator with a valid Google Project IWhen developing locally, configure your application to use the local emulator by exporting the PUBSUB_EMULATOR_HOST variable.
- In the Google Cloud console, navigate to the API Library, and enable the Pub/Sub API. When developing locally, configure your application to call pubsub.googleapis.com.

--------------------------------------------------

241. You are developing an application that will handle requests from end users. You need to secure a Cloud Function called by the application to allow authorized end users to authenticate to the function via the application while restricting access to unauthorized users. You will integrate Google Sign-In as part of the solution and want to follow Google-recommended best practices. What should you do?

corretta/e:
- Deploy from a source code repository and grant users the roles/cloudfunctions.invoker role

sbagliate:
- Deploy from your local machine using gcloud and grant users the roles/cloudfunctions.admin role
- Deploy from your local machine using gcloud and grant users the roles/cloudfunctions.developer role
- Deploy from a source code repository and grant users the roles/cloudfunctions.viewer role.

--------------------------------------------------

242. You recently migrated an on-premises monolithic application to a microservices application on Google Kubernetes Engine (GKE). The application has dependencies on backend services on-premises, including a CRM system and a MySQL database that contains personally identifiable information (PII). The backend services must remain on-premises to meet regulatory requirements.

You established a Cloud VPN connection between your on-premises data center and Google Cloud. You notice that some requests from your microservices application on GKE to the backend services are failing due to latency issues caused by fluctuating bandwidth, which is causing the application to crash. How should you address the latency issues?

corretta/e:
- Increase the number of Cloud VPN tunnels for the connection between Google Cloud and the on-premises services

sbagliate:
- Use Memorystore to cache frequently accessed PII data from the on-premises MySQL database
- Use Istio to create a service mesh that includes the microservices on GKE and the on-premises services
- Decrease the network layer packet size by decreasing the Maximum Transmission Unit (MTU) value from its default value on Cloud VPN

--------------------------------------------------

243. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

A recent security audit discovers that HipLocal’s database credentials for their Compute Engine-hosted MySQL databases are stored in plain text on persistent disks. HipLocal needs to reduce the risk of these credentials being stolen. What should they do?

corretta/e:
- Grant the roles/secretmanager.secretAccessor role to the Compute Engine service account. Store and access the database credentials with the Secret Manager API.

sbagliate:
- Create a service account and grant it the roles/iam.serviceAccountUser role. Impersonate as this account and authenticate using the Cloud SQL Proxy.
- Create a service account and download its key. Use the key to authenticate to Cloud Key Management Service (KMS) to obtain a key used to decrypt the database credentials.
- Create a service account and download its key. Use the key to authenticate to Cloud Key Management Service (KMS) to obtain the database credentials.

--------------------------------------------------

244. You need to deploy a new European version of a website hosted on Google Kubernetes Engine. The current and new websites must be accessed via the same HTTP(S) load balancer's external IP address, but have different domain names. What should you do?

corretta/e:
- Modify the existing Ingress resource with a host rule matching the new domain

sbagliate:
- Generate a new Ingress resource and specify the existing IP address as the kubernetes.io/ingress.global-static-ip-name annotation value
- Define a new Ingress resource with a host rule matching the new domain
- Create a new Service of type LoadBalancer specifying the existing IP address as the loadBalancerIP

--------------------------------------------------

245. Your ecommerce application has a rapidly growing user base, and it is experiencing performance issues due to excessive requests to your backend API. Your team develops and manages this API. The Cloud SQL backend database is struggling to handle the high demand, leading to latency and timeouts. You need to implement a solution that optimizes API performance and improves user experience. What should you do?

corretta/e:
- Use Apigee to expose your API. Use Memorystore for Redis to cache frequently accessed data. Implement exponential backoff in the application to retry failed requests.

sbagliate:
- Use Cloud Load Balancing to expose your API. Use Cloud CDN in front of the load balancer to cache responses. Implement exponential backoff to retry failed requests.
- Use Apigee to expose your API. Implement rate limiting and access control policies in Apigee to control API traffic. Use Pub/Sub to queue requests to prevent database overload.
- Use Cloud Load Balancing to expose your API. Increase the memory for the database instances to handle more concurrent requests. Implement a custom rate-limiting mechanism in your application code to control API requests.

--------------------------------------------------

246. You recently migrated a monolithic application to Google Cloud by breaking it down into microservices. One of the microservices is deployed using Cloud
Functions. As you modernize the application, you make a change to the API of the service that is backward-incompatible. You need to support both existing callers who use the original API and new callers who use the new API. What should you do?

corretta/e:
- Leave the original Cloud Function as-is and deploy a second Cloud Function with the new API. Use Cloud Endpoints to provide an API gateway that exposes a versioned API.

sbagliate:
- Leave the original Cloud Function as-is and deploy a second Cloud Function that includes only the changed API. Calls are automatically routed to the correct function.
- Re-deploy the Cloud Function after making code changes to support the new API. Requests for both versions of the API are fulfilled based on a version identifier included in the call.
- Leave the original Cloud Function as-is and deploy a second Cloud Function with the new API. Use a load balancer to distribute calls between the versions.

--------------------------------------------------

247. Your team is responsible for maintaining an application that aggregates news articles from many different sources. Your monitoring dashboard contains publicly accessible real-time reports and runs on a Compute Engine instance as a web application. External stakeholders and analysts need to access these reports via a secure channel without authentication. How should you configure this secure channel?

corretta/e:
- Add an HTTP(S) load balancer in front of the monitoring dashboard. Set up a Google-managed SSL certificate on the load balancer for traffic encryption.

sbagliate:
- Use Cloud Scheduler to trigger Cloud Build every hour to create an export from the reports. Store the reports in a public Cloud Storage bucket.
- Add a public IP address to the instance. Use the service account key of the instance to encrypt the traffic.
- Add an HTTP(S) load balancer in front of the monitoring dashboard. Configure Identity-Aware Proxy to secure the communication channel.

--------------------------------------------------

248. You are developing a corporate tool on Compute Engine for the finance department, which needs to authenticate users and verify that they are in the finance department. All company employees use G Suite.
What should you do?

corretta/e:
- Enable Cloud Identity-Aware Proxy on the HTTP(s) load balancer and restrict access to a Google Group containing users in the finance department. Verify the provided JSON Web Token within the application.

sbagliate:
- Configure Cloud Armor Security Policies to restrict access to only corporate IP address ranges. Issue client side certificates to everybody in the finance team and verify the certificates in the application.
- Configure Cloud Armor Security Policies to restrict access to only corporate IP address ranges. Verify the provided JSON Web Token within the application.
- Enable Cloud Identity-Aware Proxy on the HTTP(s) load balancer and restrict access to a Google Group containing users in the finance department. Issue client-side certificates to everybody in the finance team and verify the certificates in the application.

--------------------------------------------------

249. Your company has a new security initiative that requires all data stored in Google Cloud to be encrypted by customer-managed encryption keys. You plan to use Cloud Key Management Service (KMS) to configure access to the keys. You need to follow the "separation of duties" principle and Google-recommended best practices. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Grant the roles/cloudkms.admin role to the owner of the project where the keys from Cloud KMS are being used.
- Provision Cloud KMS in its own project.
- Provision Cloud KMS in the project where the keys are being used.
- Grant an owner role for the Cloud KMS project to a different user than the owner of the project where the keys from Cloud KMS are being used.
- Do not assign an owner to the Cloud KMS project.

--------------------------------------------------

250. You plan to deploy a new application revision with a Deployment resource to Google Kubernetes Engine (GKE) in production. The container might not work correctly. You want to minimize risk in case there are issues after deploying the revision. You want to follow Google-recommended best practices. What should you do?

corretta/e:
- Perform a rolling update with a PodDisruptionBudget of 80%.

sbagliate:
- Convert the Deployment to a StatefulSet, and perform a rolling update with a HorizontalPodAutoscaler scale-down policy value of 0.
- Perform a rolling update with a HorizontalPodAutoscaler scale-down policy value of 0.
- Convert the Deployment to a StatefulSet, and perform a rolling update with a PodDisruptionBudget of 80%.

--------------------------------------------------

251. Your application is running as a container in a Google Kubernetes Engine cluster. You need to add a secret to your application using a secure approach. What should you do?

corretta/e:
- Store the credential in Secret Manager. Create a Google service account (GSA) to read the credential from Secret Manager. Create a Kubernetes service account (KSA) to run the container. Use Workload Identity to configure your KSA to act as a GSA.

sbagliate:
- Enable Application-layer Secret Encryption on the cluster using a Cloud Key Management Service (KMS) key.
- Store the credential in Cloud KMS. Create a Google service account (GSA) to read the credential from Cloud KMS. Export the GSA as a .json file, and pass the .json file to the container as a volume which can read the credential from Cloud KMS.
- Create a Kubernetes Secret, and pass the Secret as an environment variable to the container.

--------------------------------------------------

252. Case study -
This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.
To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.
At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an
All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.

Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.

Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.

Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.

Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.

Technical Requirements -
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.
HipLocal's data science team wants to analyze user reviews.
How should they prepare the data?

corretta/e:
- Use the Cloud Data Loss Prevention API for de-identification of the review dataset.

sbagliate:
- Use the Cloud Natural Language Processing API for de-identification of the review dataset.
- Use the Cloud Natural Language Processing API for redaction of the review dataset.
- Use the Cloud Data Loss Prevention API for redaction of the review dataset.

--------------------------------------------------

253. You are developing an application that will be launched on Compute Engine instances into multiple distinct projects, each corresponding to the environments in your software development process (development, QA, staging, and production). The instances in each project have the same application code but a different configuration. During deployment, each instance should receive the application's configuration based on the environment it serves. You want to minimize the number of steps to configure this flow. What should you do?

corretta/e:
- In each project, configure a metadata key ג€environmentג€ whose value is the environment it serves. Use your deployment tool to query the instance metadata and configure the application based on the ג€environmentג€ value.

sbagliate:
- When creating your instances, configure a startup script using the gcloud command to determine the project name that indicates the correct environment.
- During each instance launch, configure an instance custom-metadata key named ג€environmentג€ whose value is the environment the instance serves. Use your deployment tool to query the instance metadata, and configure the application based on the ג€environmentג€ value.
- Deploy your chosen deployment tool on an instance in each project. Use a deployment job to retrieve the appropriate configuration file from your version control system, and apply the configuration when deploying the application on each instance.

--------------------------------------------------

254. You maintain a CI/CD pipeline for an application running on GKE. You use Cloud Build to create container images and push the images to Artifact Registry. When you build the image, you use the latest tag in your pipeline.

You recently had to roll back a deployment 24 hours after rollout. The rollback process was difficult because the latest tag had been overwritten. You need to prevent this issue in the future. You want to use the most efficient approach. What should you do?

corretta/e:
- Build a separate Docker image for each new version of the application, and tag it with the version number.

sbagliate:
- Rebuild the Docker image for each environment, and tag it with the specific environment name.
- Implement Helm charts to manage your container deployments.
- Use a Docker registry to store the container images, and create separate repositories for each version of the application.

--------------------------------------------------

255. You are compiling a compliance report on vulnerability metadata for a specific set of images identified by Artifact Analysis. Metadata from images scanned more than 30 days ago are missing from the compliance report. You need to access the vulnerability metadata for these older images. What should you do?

corretta/e:
- Check Artifact Analysis storage buckets in Cloud Storage.

sbagliate:
- Create a Pub/Sub subscription to pull from Artifact Analysis topics.
- Check Cloud Trace logs for Artifact Analysis findings.
- Push or pull the images from Artifact Registry.

--------------------------------------------------

256. You want to use the Stackdriver Logging Agent to send an application's log file to Stackdriver from a Compute Engine virtual machine instance.
After installing the Stackdriver Logging Agent, what should you do first?

corretta/e:
- Configure the application log file as a custom source.

sbagliate:
- Create a Stackdriver Logs Export Sink with a filter that matches the application's log entries.
- Enable the Error Reporting API on the project.
- Grant the instance full access to all Cloud APIs.

--------------------------------------------------

257. You are working on a new application that is deployed on Cloud Run and uses Cloud Functions. Each time new features are added, new Cloud Functions and Cloud Run services are deployed. You use ENV variables to keep track of the services and enable interservice communication, but the maintenance of the ENV variables has become difficult. You want to implement dynamic discovery in a scalable way. What should you do?

corretta/e:
- Create a Service Directory namespace. Use API calls to register the services during deployment, and query during runtime.

sbagliate:
- Configure your microservices to use the Cloud Run Admin and Cloud Functions APIs to query for deployed Cloud Run services and Cloud Functions in the Google Cloud project.
- Rename the Cloud Functions and Cloud Run services endpoint is using a well-documented naming convention.
- Deploy Hashicorp Consul on a single Compute Engine instance. Register the services with Consul during deployment, and query during runtime.

--------------------------------------------------

258. You have an application running in production on Cloud Run. Your team needs to change one of the application’s services to return a new field. You want to test the new revision on 10% of your clients using the least amount of effort. You also need to keep your service backward compatible.

What should you do?

corretta/e:
- Update the current service with the new changes. Deploy the new revision with no traffic allocated. Split the traffic between the current service and the new revision.

sbagliate:
- Update the current service with the new changes. Deploy the new revision. After the deployment, split the traffic between the current service and the new revision.
- Replace the current service with the new revision. Deploy the new revision with no traffic allocated. After the deployment, split the traffic between the previous service and the new revision.
- Replace the current service with the new revision. Deploy the new revision. Create a load balancer to split the traffic between the previous service and the new revision.

--------------------------------------------------

259. Your company has deployed a new API to App Engine Standard environment. During testing, the API is not behaving as expected. You want to monitor the application over time to diagnose the problem within the application code without redeploying the application.
Which tool should you use?

corretta/e:
- Stackdriver Debug Logpoints

sbagliate:
- Stackdriver Debug Snapshots
- Stackdriver Monitoring
- Stackdriver Trace

--------------------------------------------------

260. Your application is logging to Stackdriver. You want to get the count of all requests on all /api/alpha/* endpoints.
What should you do?

corretta/e:
- Add a Stackdriver counter metric for endpoint:/api/alpha/*.

sbagliate:
- Export the logs to Cloud Storage and count lines matching /api/alpha.
- Add a Stackdriver counter metric for path:/api/alpha/.
- Export the logs to Cloud Pub/Sub and count lines matching /api/alpha.

--------------------------------------------------

261. You are using Cloud Run to host a global ecommerce web application. Your company’s design team is creating a new color scheme for the web app. You have been tasked with determining whether the new color scheme will increase sales. You want to conduct testing on live production traffic. How should you design the study?

corretta/e:
- Use an external HTTP(S) load balancer to route a predetermined percentage of traffic to two different color schemes of your application. Analyze the results to determine whether there is a statistically significant difference in sales.

sbagliate:
- Use an external HTTP(S) load balancer to route traffic to the original color scheme while the new deployment is created and tested. After testing is complete, reroute all traffic to the new color scheme. Analyze the results to determine whether there is a statistically significant difference in sales.
- Enable a feature flag that displays the new color scheme to half of all users. Monitor sales to see whether they increase for this group of users.
- Use an external HTTP(S) load balancer to mirror traffic to the new version of your application. Analyze the results to determine whether there is a statistically significant difference in sales.

--------------------------------------------------

262. You are developing a web application by using Cloud Run and Cloud Storage. You are notified of a production issue that you need to troubleshoot immediately. You need to implement a workaround that requires you to execute a script on a Git repository. Your corporate laptop is unavailable but you have your personal computer. You can use your corporate credentials to access the required Git repository and Google Cloud resources. You want to fix the issue as quickly and efficiently as possible while minimizing additional cost. What should you do?

corretta/e:
- Connect to the Google Cloud console and open Cloud Shell on your personal computer. Clone the Git repository and execute the workaround script. Ensure that the issue has been fixed.

sbagliate:
- Create and launch a workstation with Cloud Workstations on your personal computer. Authenticate and set up API access in the workstation. Clone the Git repository and execute the workaround script. Ensure that the issue has been fixed.
- Install VS Code and the extension Cloud Code for VS Code on your personal computer. Check the Cloud Run logs in Cloud Code to confirm the error. Execute the workaround script. Ensure that the issue has been fixed.
- Download and install the gcloud CLI on your personal computer. Authenticate and set up API access. Clone the Git repository and execute the workaround script. Ensure that the issue has been fixed.

--------------------------------------------------

263. Your team has created an application that is hosted on a Google Kubernetes Engine (GKE) cluster. You need to connect the application to a legacy REST service that is deployed in two GKE clusters in two different regions. You want to connect your application to the target service in a way that is resilient. You also want to be able to run health checks on the legacy service on a separate port. How should you set up the connection? (Choose two.)

corretta/e:
- 

sbagliate:
- Use Traffic Director with a sidecar proxy to connect the application to the service.
- Configure the legacy service's firewall to allow health checks originating from the proxy.
- Use a proxyless Traffic Director configuration to connect the application to the service.
- Configure the legacy service's firewall to allow health checks originating from the Traffic Director control plane.
- Configure the legacy service's firewall to allow health checks originating from the application.

--------------------------------------------------

264. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question, refer to the HipLocal case study.

HipLocal is expanding into new locations. They must capture additional data each time the application is launched in a new European country. This is causing delays in the development process due to constant schema changes and a lack of environments for conducting testing on the application changes. How should they resolve the issue while meeting the business requirements?

corretta/e:
- Migrate data to Firestore in Native mode and set up instances in Europe and North America. Instruct the development teams to use the Cloud SDK to emulate a local Firestore in Native mode development environment.

sbagliate:
- Move from Cloud SQL to MySQL hosted on Compute Engine. Replicate hosts across regions in the Americas and Europe. Provide developers with local MySQL instances to conduct testing on the application changes.
- Migrate data to Bigtable. Instruct the development teams to use the Cloud SDK to emulate a local Bigtable development environment.
- Create new Cloud SQL instances in Europe and North America for testing and deployment. Provide developers with local MySQL instances to conduct testing on the application changes.

--------------------------------------------------

265. Your development team is using Cloud Build to promote a Node.js application built on App Engine from your staging environment to production. The application relies on several directories of photos stored in a Cloud Storage bucket named webphotos-staging in the staging environment. After the promotion, these photos must be available in a Cloud Storage bucket named webphotos-prod in the production environment. You want to automate the process where possible. What should you do?

corretta/e:
- Add a build step in the cloudbuild.yaml file before the promotion step with the arguments:

sbagliate:
- Add a startup script in the application's app.yami file to move the photos from webphotos-staging to webphotos-prod.
- Add a build step in the cloudbuild.yaml file before the promotion step with the arguments:
- Manually copy the photos to webphotos-prod.

--------------------------------------------------

266. You have a mixture of packaged and internally developed applications hosted on a Compute Engine instance that is running Linux. These applications write log records as text in local files. You want the logs to be written to Cloud Logging. What should you do?

corretta/e:
- Install a Google version of fluentd on the Compute Engine instance.

sbagliate:
- Install a Google version of collectd on the Compute Engine instance.
- Using cron, schedule a job to copy the log files to Cloud Storage once a day.
- Pipe the content of the files to the Linux Syslog daemon.

--------------------------------------------------

267. You recently developed a new application. You want to deploy the application on Cloud Run without a Dockerfile. Your organization requires that all container images are pushed to a centrally managed container repository. How should you build your container using Google Cloud services? (Choose two.)

corretta/e:
- 

sbagliate:
- Push your source code to Artifact Registry.
- Include the --source flag with the gcloud run deploy CLI command.
- Use the pack build command with pack CLI.
- Submit a Cloud Build job to push the image.
- Include the --platform=kubernetes flag with the gcloud run deploy CLI command.

--------------------------------------------------

268. You are developing a Java Web Server that needs to interact with Google Cloud services via the Google Cloud API on the user's behalf. Users should be able to authenticate to the Google Cloud API using their Google Cloud identities. Which workflow should you implement in your web application?

corretta/e:
- 1. When a user arrives at your application, route them to a Google Cloud consent screen with a list of requested permissions that prompts the user to sign in with SSO to their Google Account.
2. After the user signs in and provides consent, your application receives an authorization code from a Google server.
3. The application requests a Google Server to exchange the authorization code with an access token.
4. The Google server responds with the access token that is used by the application to call the Google Cloud API.

sbagliate:
- 1. When a user arrives at your application, prompt them for their Google username and password.
2. Store an SHA password hash in your application's database along with the user's username.
3. The application authenticates to the Google Cloud API using HTTPs requests with the user's username and password hash in the Authorization request header.
- 1. When a user arrives at your application, route them to a Google Cloud consent screen with a list of requested permissions that prompts the user to sign in with SSO to their Google Account.
2. After the user signs in and provides consent, your application receives an authorization code from a Google server.
3. The Google server returns the authorization code to the user, which is stored in the browser's cookies.
4. The user authenticates to the Google Cloud API using the authorization code in the cookie.
- 1. When a user arrives at your application, prompt them for their Google username and password.
2. Forward the user's username and password in an HTTPS request to the Google Cloud authorization server, and request an access token.
3. The Google server validates the user's credentials and returns an access token to the application.
4. The application uses the access token to call the Google Cloud API.

--------------------------------------------------

269. You are developing a short-term image hosting service where end users around the world can upload images that are up to 20MB, and the images will be automatically deleted after 10 days. You need to determine how the images should be stored while minimizing cost. How should you store the images?

corretta/e:
- Write the image to a Cloud Storage bucket. Create a lifecycle configuration that deletes objects 10 days older than their creation date.

sbagliate:
- Write the images to Bigtable. Configure a garbage collection policy for the column family that deletes cells 10 days older than their creation date.
- Write the images to Spanner. Configure a row deletion policy on the table that deletes rows 10 days older than their creation date.
- Write the images to Firestore. Deploy a Cloud Scheduler-invoked Cloud Run service that queries for documents written 10 days prior to today and deletes them.

--------------------------------------------------

270. You are building a highly available and globally accessible application that will serve static content to users. You need to configure the storage and serving components. You want to minimize management overhead and latency while maximizing reliability for users. What should you do?

corretta/e:
- 1. Create a Standard storage class, multi-regional Cloud Storage bucket. Put the static content in the bucket.
2. Reserve an external IP address, and create an external HTTP(S) load balancer.
3. Enable Cloud CDN, and send traffic to your backend bucket.

sbagliate:
- 1. Create a Standard storage class, regional Cloud Storage bucket. Put the static content in the bucket
2. Reserve an external IP address, and create an external HTTP(S) load balancer
3. Enable Cloud CDN, and send traffic to your backend bucket
- 1. Create an unmanaged instance group. Replicate the static content across the VMs.
2. Create an external HTTP(S) load balancer
3. Enable Cloud CDN, and send traffic to the unmanaged instance group.
- 1. Create a managed instance group. Replicate the static content across the virtual machines (VMs)
2. Create an external HTTP(S) load balancer.
3. Enable Cloud CDN, and send traffic to the managed instance group.

--------------------------------------------------

271. You are evaluating developer tools to help drive Google Kubernetes Engine adoption and integration with your development environment, which includes VS Code and IntelliJ. What should you do?

corretta/e:
- Use Cloud Code to develop applications.

sbagliate:
- Use the Cloud Shell integrated Code Editor to edit code and configuration files.
- Use a Cloud Notebook instance to ingest and process data and deploy models.
- Use Cloud Shell to manage your infrastructure and applications from the command line.

--------------------------------------------------

272. You are a developer that works for a local concert venue. Customers use your company’s website to purchase tickets for events. You need to provide customers with immediate confirmation when a selected seat has been reserved. How should you design the ticket ordering process?

corretta/e:
- Submit the seat reservation in an HTTP POST request to an Application Load Balancer. Configure the Application Load Balancer to distribute the request to a Compute Engine managed instance group that processes the reservation.

sbagliate:
- Publish the seat reservation to a Pub/Sub topic. Configure the backend service to use Eventarc to process the seat reservation on GKE.
- Add the seat reservation to a Cloud Tasks queue, which triggers Workflows to process the seat reservation.
- Upload the seat reservation to a Cloud Storage bucket, which triggers an event to a Cloud Run service that processes the orders.

--------------------------------------------------

273. You are deploying a microservices application to GKE. One microservice needs to download files from a Cloud Storage bucket. You have an IAM service account with the Storage Object Viewer role on the project with the bucket. You need to configure your application to access the Cloud Storage bucket while following Google-recommended practices. What should you do?

corretta/e:
- Create a Kubernetes service account. Use an IAM policy to bind the IAM service account to a Kubernetes service account. Annotate the Kubernetes ServiceAccount object with the name of the bound IAM service account. Assign the Kubernetes ServiceAccount to the Pods that need to access the bucket.

sbagliate:
- Create a Kubernetes service account. Create a Kubernetes secret with a base64-encoded IAM service account key file. Annotate the Kubernetes secret with the Kubernetes service account. Assign the Kubernetes ServiceAccount to the Pods that need to access the bucket.
- Assign the IAM service account to the cluster’s node pool. Configure the application to authenticate to the bucket by using Application Default Credentials.
- Assign the IAM service account to the cluster’s node pool. Encrypt the IAM service account key file by using a symmetric block cipher, and store the encrypted file on a persistent volume. Store the encryption key in Secret Manager.

--------------------------------------------------

274. You are a developer at a large organization. You are deploying a web application to Google Kubernetes Engine (GKE). The DevOps team has built a CI/CD pipeline that uses Cloud Deploy to deploy the application to Dev, Test, and Prod clusters in GKE. After Cloud Deploy successfully deploys the application to the Dev cluster, you want to automatically promote it to the Test cluster. How should you configure this process following Google-recommended best practices?

corretta/e:
- 1. Create a Cloud Build trigger that listens for SUCCEEDED Pub/Sub messages from the clouddeploy-operations topic.
2. Configure Cloud Build to include a step that promotes the application to the Test cluster.

sbagliate:
- 1. Create a Cloud Build pipeline that uses the gke-deploy builder.
2. Create a Cloud Build trigger that listens for SUCCEEDED Pub/Sub messages from the cloud-builds topic.
3. Configure this pipeline to run a deployment step to the Test cluster.
- 1. Create a Cloud Function that calls the Google Cloud Deploy API to promote the application to the Test cluster.
2. Configure this function to be triggered by SUCCEEDED Pub/Sub messages from the clouddeploy-operations topic.
- 1. Create a Cloud Function that calls the Google Cloud Deploy API to promote the application to the Test cluster.
2. Configure this function to be triggered by SUCCEEDED Pub/Sub messages from the cloud-builds topic.

--------------------------------------------------

275. You plan to make a simple HTML application available on the internet. This site keeps information about FAQs for your application. The application is static and contains images, HTML, CSS, and Javascript. You want to make this application available on the internet with as few steps as possible.
What should you do?

corretta/e:
- Upload your application to Cloud Storage.

sbagliate:
- Upload your application to an App Engine environment.
- Create a Compute Engine instance with Apache web server installed. Configure Apache web server to host the application.
- Containerize your application first. Deploy this container to Google Kubernetes Engine (GKE) and assign an external IP address to the GKE pod hosting the application.

--------------------------------------------------

276. You work for an organization that manages an ecommerce site. Your application is deployed behind a global HTTP(S) load balancer. You need to test a new product recommendation algorithm. You plan to use A/B testing to determine the new algorithm’s effect on sales in a randomized way. How should you test this feature?

corretta/e:
- Split traffic between versions using weights.

sbagliate:
- Enable the new recommendation feature flag on a single instance.
- Mirror traffic to the new version of your application.
- Use HTTP header-based routing.

--------------------------------------------------

277. You need to configure a Deployment on Google Kubernetes Engine (GKE). You want to include a check that verifies that the containers can connect to the database. If the Pod is failing to connect, you want a script on the container to run to complete a graceful shutdown. How should you configure the Deployment?

corretta/e:
- Create the Deployment with a livenessProbe for the container that will fail if the container can't connect to the database. Configure a Prestop lifecycle handler that runs the shutdown script if the container is failing.

sbagliate:
- Create two jobs: one that checks whether the container can connect to the database, and another that runs the shutdown script if the Pod is failing.
- Create the Deployment with an initContainer that checks the service availability. Configure a Prestop lifecycle handler that runs the shutdown script if the Pod is failing.
- Create the Deployment with a PostStart lifecycle handler that checks the service availability. Configure a PreStop lifecycle handler that runs the shutdown script if the container is failing.

--------------------------------------------------

278. Your team detected a spike of errors in an application running on Cloud Run in your production project. The application is configured to read messages from Pub/Sub topic A, process the messages, and write the messages to topic B. You want to conduct tests to identify the cause of the errors. You can use a set of mock messages for testing. What should you do?

corretta/e:
- Deploy the Pub/Sub and Cloud Run emulators on your local machine. Deploy the application locally, and change the logging level in the application to DEBUG or INFO. Write mock messages to topic A, and then analyze the logs.

sbagliate:
- Use the Google Cloud console to write mock messages to topic A. Change the logging level in the application to DEBUG or INFO, and then analyze the logs.
- Deploy the Pub/Sub emulator on your local machine. Point the production application to your local Pub/Sub topics. Write mock messages to topic A, and then analyze the logs.
- Use the gcloud CLI to write mock messages to topic A. Change the logging level in the application to DEBUG or INFO, and then analyze the logs.

--------------------------------------------------

279. Your team recently deployed an application on Google Kubernetes Engine (GKE). You are monitoring your application and want to be alerted when the average memory consumption of your containers is under 20% or above 80%. How should you configure the alerts?

corretta/e:
- In Cloud Monitoring, create an alerting policy to notify you if the average memory consumption is outside the defined range.

sbagliate:
- Create a Cloud Function that runs on a schedule, executes kubectl top on all the workloads on the cluster, and sends an email alert if the average memory consumption is outside the defined range.
- Write a script that pulls the memory consumption of the instance at the OS level and sends an email alert if the average memory consumption is outside the defined range.
- Create a Cloud Function that consumes the Monitoring API. Create a schedule to trigger the Cloud Function hourly and alert you if the average memory consumption is outside the defined range.

--------------------------------------------------

280. You work on an application that relies on Cloud Spanner as its main datastore. New application features have occasionally caused performance regressions. You want to prevent performance issues by running an automated performance test with Cloud Build for each commit made. If multiple commits are made at the same time, the tests might run concurrently. What should you do?

corretta/e:
- Create a new Cloud Spanner instance for every build. Load the required data. Delete the Cloud Spanner instance after the test is run.

sbagliate:
- Create a new project with a random name for every build. Load the required data. Delete the project after the test is run.
- Create a project with a Cloud Spanner instance and the required data. Adjust the Cloud Build build file to automatically restore the data to its previous state after the test is run.
- Start the Cloud Spanner emulator locally. Load the required data. Shut down the emulator after the test is run.

--------------------------------------------------

281. You are developing a scalable web application for internal users. Your organization uses Google Workspace. You need to set up authentication to the application for the users, and then deploy the application on Google Cloud. You plan to use cloud-native features, and you want to minimize infrastructure management effort. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Configure Identity Aware Proxy, and grant the roles/iap.httpsResourceAccessor IAM role to the users that need to access the application.
- Configure Cloud SQL database with a table containing the users and password hashes. Add an authentication screen to ensure that only internal users can access the application.
- Configure Identity Aware Proxy, and grant the roles/iap.tunnelResourceAccessor IAM role to the users that need to access the application.
- Create a Compute Engine VM, configure a web server, and deploy the application in a VPC.
- Containerize the application, and deploy it as a Cloud Run service.

--------------------------------------------------

282. You are developing an application that needs to store files belonging to users in Cloud Storage. You want each user to have their own subdirectory in Cloud Storage. When a new user is created, the corresponding empty subdirectory should also be created. What should you do?

corretta/e:
- Create an object with the name of the subdirectory ending with a trailing slash ('/') that is zero bytes in length.

sbagliate:
- Create an object with the name of the subdirectory that is zero bytes in length and has WRITER access control list permission.
- Create an object with the name of the subdirectory that is zero bytes in length. Set the Content-Type metadata to CLOUDSTORAGE_FOLDER.
- Create an object with the name of the subdirectory, and then immediately delete the object within that subdirectory.

--------------------------------------------------

283. Your team is writing a backend application to implement the business logic for an interactive voice response (IVR) system that will support a payroll application. The IVR system has the following technical characteristics:

• Each customer phone call is associated with a unique IVR session.
• The IVR system creates a separate persistent gRPC connection to the backend for each session.
• If the connection is interrupted, the IVR system establishes a new connection, causing a slight latency for that call.

You need to determine which compute environment should be used to deploy the backend application. Using current call data, you determine that:

• Call duration ranges from 1 to 30 minutes.
• Calls are typically made during business hours.
• There are significant spikes of calls around certain known dates (e.g., pay days), or when large payroll changes occur.

You want to minimize cost, effort, and operational overhead. Where should you deploy the backend application?

corretta/e:
- Cloud Run

sbagliate:
- Compute Engine
- Google Kubernetes Engine cluster in Standard mode
- Cloud Functions

--------------------------------------------------

284. Your team is developing unit tests for Cloud Function code. The code is stored in a Cloud Source Repositories repository. You are responsible for implementing the tests. Only a specific service account has the necessary permissions to deploy the code to Cloud Functions. You want to ensure that the code cannot be deployed without first passing the tests. How should you configure the unit testing process?

corretta/e:
- Configure Cloud Build to run the unit tests, using the specific service account as the build agent. If the code passes the tests, Cloud Build deploys the Cloud Function.

sbagliate:
- Configure Cloud Build to deploy the Cloud Function. If the code passes the tests, a deployment approval is sent to you.
- Configure Cloud Build to run the unit tests. If the code passes the tests, the developer deploys the Cloud Function.
- Configure Cloud Build to deploy the Cloud Function, using the specific service account as the build agent. Run the unit tests after successful deployment.

--------------------------------------------------

285. You are a lead developer at an organization that recently integrated several Google Cloud services. These services are located within Virtual Private Cloud (VPC) environments that are secured with VPC Service Controls and Private Service Connect endpoints. Developers across your organization use different operating systems, development frameworks, and integrated development environments (IDEs). You need to recommend a developer environment that will ensure consistency in the developer process and improve the overall developer experience. You want this solution to:

• Enforce consistent security controls.
• Have access to Google Cloud resources and applications within the VPC.
• Allow the installation of custom tools and utilities on the development environments.

What solution should you recommend?

corretta/e:
- Use Cloud Workstations with preconfigured base images. For custom tools and utilities, use custom images that are rebuilt weekly.

sbagliate:
- Use the Cloud Code extension with the IDEs that are used across the organization. Use Identity-Aware Proxy to enable access to the services in the VPC.
- Use the Cloud Code extension with the IDEs that are used across the organization. Configure Cloud VPN to enable VPC access.
- Use Cloud Workstations, and allow developers to create their own custom images.

--------------------------------------------------

286. You are developing a public web application on Cloud Run. You expose the Cloud Run service directly with its public IP address. You are now running a load test to ensure that your application is resilient against high traffic loads. You notice that your application performs as expected when you initiate light traffic. However, when you generate high loads, your web server runs slowly and returns error messages. How should you troubleshoot this issue?

corretta/e:
- Check whether the Cloud Run service has scaled to a number of instances that equals the max-instances value. If necessary, increase the max-instances value.

sbagliate:
- Check the network traffic to Cloud Run in Cloud Monitoring to validate whether a traffic spike occurred. If necessary, enable traffic splitting on the Cloud Run instance to route some of the traffic to a previous instance revision.
- Check the min-instances value for your Cloud Run service. If necessary, increase the min-instances value to match the maximum number of virtual users in your load test.
- Check whether Cloud Armor is detecting distributed denial of service (DDoS) attacks and is blocking traffic before the traffic is routed to your Cloud Run service. If necessary, disable any Cloud Armor policies in your project.

--------------------------------------------------

287. You are running an application on App Engine that you inherited. You want to find out whether the application is using insecure binaries or is vulnerable to XSS attacks.
Which service should you use?

corretta/e:
- Cloud Security Scanner

sbagliate:
- Stackdriver Debugger
- Cloud Amor
- Stackdriver Error Reporting

--------------------------------------------------

288. You have a container deployed on Google Kubernetes Engine. The container can sometimes be slow to launch, so you have implemented a liveness probe. You notice that the liveness probe occasionally fails on launch. What should you do?

corretta/e:
- Add a startup probe.

sbagliate:
- Increase the initial delay for the liveness probe.
- Add a readiness probe.
- Increase the CPU limit for the container.

--------------------------------------------------

289. You have an analytics application that runs hundreds of queries on BigQuery every few minutes using BigQuery API. You want to find out how much time these queries take to execute.
What should you do?

corretta/e:
- Use Stackdriver Monitoring to plot query execution times.

sbagliate:
- Use Stackdriver Trace to plot query execution time.
- Use Stackdriver Monitoring to plot slot usage.
- Use Stackdriver Trace to plot API execution time.

--------------------------------------------------

290. You need to deploy an internet-facing microservices application to Google Kubernetes Engine (GKE). You want to validate new features using the A/B testing method. You have the following requirements for deploying new container image releases:
• There is no downtime when new container images are deployed.
• New production releases are tested and verified using a subset of production users.

What should you do?

corretta/e:
- 1. Install the Anthos Service Mesh on your GKE cluster.
2. Create two Deployments on the GKE cluster, and label them with different version names.
3. Implement an Istio routing rule to send a small percentage of traffic to the Deployment that references the new version of the application.

sbagliate:
- 1. Implement a rolling update pattern by replacing the Pods gradually with the new release version.
2. Validate the application's performance for the new subset of users during the rollout, and roll back if an issue arises.
- 1. Configure your CI/CD pipeline to update the Deployment manifest file by replacing the container version with the latest version.
2. Recreate the Pods in your cluster by applying the Deployment manifest file.
3. Validate the application's performance by comparing its functionality with the previous release version, and roll back if an issue arises.
- 1. Create a second namespace on GKE for the new release version.
2. Create a Deployment configuration for the second namespace with the desired number of Pods.
3. Deploy new container versions in the second namespace.
4. Update the Ingress configuration to route traffic to the namespace with the new container versions.

--------------------------------------------------

291. You are developing a single-player mobile game backend that has unpredictable traffic patterns as users interact with the game throughout the day and night. You want to optimize costs by ensuring that you have enough resources to handle requests, but minimize over-provisioning. You also want the system to handle traffic spikes efficiently. Which compute platform should you use?

corretta/e:
- Cloud Run

sbagliate:
- Compute Engine with unmanaged instance groups
- Google Kubernetes Engine using cluster autoscaling
- Compute Engine with managed instance groups

--------------------------------------------------

292. You are designing a Node.js-based mobile news feed application that stores data on Google Cloud. You need to select the application's database. You want the database to have zonal resiliency out of the box, low latency responses, ACID compliance, an optional middle tier, semi-structured data storage, and network-partition-tolerant and offline-mode client libraries. What should you do?

corretta/e:
- Configure Firestore and use the Firestore client library in the app.

sbagliate:
- Configure Bigtable and use the Bigtable client in the app.
- Configure BigQuery and use the BigQuery REST API in the app.
- Configure Cloud SQL and use the Google Client Library for Cloud SQL in the app.

--------------------------------------------------

293. Your company has a BigQuery dataset named "Master" that keeps information about employee travel and expenses. This information is organized by employee department. That means employees should only be able to view information for their department. You want to apply a security framework to enforce this requirement with the minimum number of steps.
What should you do?

corretta/e:
- Create a dataset named Master dataset. Create a separate view for each department in the Master dataset. Give employees access to the specific view for their department.

sbagliate:
- Create a dataset named Master dataset. Create a separate table for each department in the Master dataset. Give employees access to the specific table for their department.
- Create a separate dataset for each department. Create a data pipeline for each department to copy appropriate information from the Master dataset to the specific dataset for the department. Give employees the permission to this department-specific dataset.
- Create a separate dataset for each department. Create a view with an appropriate WHERE clause to select records from a particular dataset for the specific department. Authorize this view to access records from your Master dataset. Give employees the permission to this department-specific dataset.

--------------------------------------------------

294. You are a developer working with the CI/CD team to troubleshoot a new feature that your team introduced. The CI/CD team used HashiCorp Packer to create a new Compute Engine image from your development branch. The image was successfully built, but is not booting up. You need to investigate the issue with the CI/
CD team. What should you do?

corretta/e:
- Check Compute Engine OS logs using the serial port, and check the Cloud Logging logs to confirm access to the serial port.

sbagliate:
- Shut down the deployed virtual machine, export the disk, and then mount the disk locally to access the boot logs.
- Create a new feature branch, and ask the build team to rebuild the image.
- Install Packer locally, build the Compute Engine image locally, and then run it in your personal Google Cloud project.

--------------------------------------------------

295. You are developing a web application that will be deployed to production on Cloud Run. The application consists of multiple microservices, some of which will be publicly accessible and others that will only be accessible after authentication by Google identities. You need to ensure that only authenticated users can access the restricted services, while allowing unrestricted access to the public services of the application. You want to use the most secure approach while minimizing management overhead and complexity. How should you configure access?

corretta/e:
- Configure separate Cloud Run services for the public and restricted microservices. Enable Identity-Aware Proxy (IAP) only for the restricted services, and configure the Cloud Run ingress settings to ‘Internal and Cloud Load Balancing’.

sbagliate:
- Enable Identity-Aware Proxy (IAP) for all microservices. Develop a new microservice that checks the authentication requirements for each application and controls access to the respective services.
- Use Cloud Endpoints with Firebase Authentication for all microservices. Configure Firebase rules to manage access control lists (ACLs) for each service, allowing access to the public services.
- Enable Identity-Aware Proxy (IAP) for all microservices. Manage access control lists (ACLs) for the restricted services, and configure allAuthenticatedUsers access to the public services.

--------------------------------------------------

296. Your team has created an application that is hosted on a Google Kubemetes Engine (GKE) cluster. You need to connect the application to a legacy REST service that is deployed in two GKE clusters in two different regions. You want to connect your application to the legacy service in a way that is resilient and requires the fewest number of steps. You also want to be able to run probe-based health checks on the legacy service on a separate port. How should you set up the connection? (Choose two.)

corretta/e:
- 

sbagliate:
- Configure the legacy service's firewall to allow health checks originating from the application.
- Use Traffic Director with a sidecar proxy to connect the application to the service.
- Set up a proxyless Traffic Director configuration for the application.
- Configure the legacy service's firewall to allow health checks originating from the sidecar proxy.
- Configure the legacy service's firewall to allow health checks originating from the Traffic Director control plane.

--------------------------------------------------

297. You recently developed an application that monitors a large number of stock prices. You need to configure Pub/Sub to receive messages and update the current stock price in an in-memory database. A downstream service needs the most up-to-date prices in the in-memory database to perform stock trading transactions. Each message contains three pieces or information:

• Stock symbol
• Stock price
• Timestamp for the update

How should you set up your Pub/Sub subscription?

corretta/e:
- Create a pull subscription with ordering enabled, using the stock symbol as the ordering key.

sbagliate:
- Create a push subscription with both ordering and exactly-once delivery turned off.
- Create a push subscription with exactly-once delivery enabled.
- Create a pull subscription with both ordering and exactly-once delivery turned off.

--------------------------------------------------

298. Your application is composed of a set of loosely coupled services orchestrated by code executed on Compute Engine. You want your application to easily bring up new Compute Engine instances that find and use a specific version of a service. How should this be configured?

corretta/e:
- Define your service endpoint information as metadata that is retrieved at runtime and used to connect to the desired service.

sbagliate:
- Define your service endpoint information as label data that is retrieved at runtime and used to connect to the desired service.
- Define your service to use a fixed hostname and port to connect to the desired service. Replace the service at the endpoint with your new version.
- Define your service endpoint information to be retrieved from an environment variable at runtime and used to connect to the desired service.

--------------------------------------------------

299. Your API backend is running on multiple cloud providers. You want to generate reports for the network latency of your API.
Which two steps should you take? (Choose two.)

corretta/e:
- 

sbagliate:
- Use Stackdriver Profiler to generate report.
- Use Zipkin collector to gather data.
- Use Stackdriver Debugger to generate report.
- Use Fluentd agent to gather data.
- Use Stackdriver Trace to generate reports.

--------------------------------------------------

300. You are a developer at a financial institution. You use Cloud Shell to interact with Google Cloud services. User data is currently stored on an ephemeral disk; however, a recently passed regulation mandates that you can no longer store sensitive information on an ephemeral disk. You need to implement a new storage solution for your user data. You want to minimize code changes. Where should you store your user data?

corretta/e:
- Store user data on a persistent disk in a Compute Engine instance.

sbagliate:
- Store user data in a Cloud Storage bucket.
- Store user data on a Cloud Shell home disk, and log in at least every 120 days to prevent its deletion.
- Store user data in BigQuery tables.

--------------------------------------------------

301. You work for a financial services company that has a container-first approach. Your team develops microservices applications. A Cloud Build pipeline creates the container image, runs regression tests, and publishes the image to Artifact Registry. You need to ensure that only containers that have passed the regression tests are deployed to Google Kubernetes Engine (GKE) clusters. You have already enabled Binary Authorization on the GKE clusters. What should you do next?

corretta/e:
- Create an attestor and a policy. After a container image has successfully passed the regression tests, use Cloud Build to run Kritis Signer to create an attestation for the container image.

sbagliate:
- Set the Pod Security Standard level to Restricted for the relevant namespaces. Use Cloud Build to digitally sign the container images that have passed the regression tests.
- Create an attestor and a policy. Create an attestation for the container images that have passed the regression tests as a step in the Cloud Build pipeline.
- Deploy Voucher Server and Voucher Client components. After a container image has successfully passed the regression tests, run Voucher Client as a step in the Cloud Build pipeline.

--------------------------------------------------

302. You are a SaaS provider deploying dedicated blogging software to customers in your Google Kubernetes Engine (GKE) cluster. You want to configure a secure multi-tenant platform to ensure that each customer has access to only their own blog and can't affect the workloads of other customers. What should you do?

corretta/e:
- Deploy a namespace per tenant and use Network Policies in each blog deployment.

sbagliate:
- Enable Application-layer Secrets on the GKE cluster to protect the cluster.
- Build a custom image of the blogging software and use Binary Authorization to prevent untrusted image deployments.
- Use GKE Audit Logging to identify malicious containers and delete them on discovery.

--------------------------------------------------

303. You are developing an online gaming platform as a microservices application on Google Kubernetes Engine (GKE). Users on social media are complaining about long loading times for certain URL requests to the application. You need to investigate performance bottlenecks in the application and identify which HTTP requests have a significantly high latency span in user requests. What should you do?

corretta/e:
- Instrument your microservices by installing the OpenTelemetry tracing package. Update your application code to send traces to Trace for inspection and analysis. Create an analysis report on Trace to analyze user requests.

sbagliate:
- Install tcpdump on your GKE nodes. Run tcpdump to capture network traffic over an extended period of time to collect data. Analyze the data files using Wireshark to determine the cause of high latency.
- Update your microservices to log HTTP request methods and URL paths to STDOUT. Use the logs router to send container logs to Cloud Logging. Create filters in Cloud Logging to evaluate the latency of user requests across different methods and URL paths.
- Configure GKE workload metrics using kubectl. Select all Pods to send their metrics to Cloud Monitoring. Create a custom dashboard of application metrics in Cloud Monitoring to determine performance bottlenecks of your GKE cluster.

--------------------------------------------------

304. You are developing an ecommerce application that stores customer, order, and inventory data as relational tables inside Cloud Spanner. During a recent load test, you discover that Spanner performance is not scaling linearly as expected. Which of the following is the cause?

corretta/e:
- The use of Version 1 UUIDs as primary keys that increase monotonically.

sbagliate:
- The use of LIKE instead of STARTS_WITH keyword for parameterized SQL queries.
- The use of 64-bit numeric types for 32-bit numbers.
- The use of the STRING data type for arbitrary-precision values.

--------------------------------------------------

305. You are writing a single-page web application with a user-interface that communicates with a third-party API for content using XMLHttpRequest. The data displayed on the UI by the API results is less critical than other data displayed on the same web page, so it is acceptable for some requests to not have the API data displayed in the UI. However, calls made to the API should not delay rendering of other parts of the user interface. You want your application to perform well when the API response is an error or a timeout.
What should you do?

corretta/e:
- Set the asynchronous option for your request to the API to true and omit the widget displaying the API results when a timeout or error is encountered.

sbagliate:
- Catch timeout or error exceptions from the API call and display the error response in the UI widget.
- Catch timeout or error exceptions from the API call and keep trying with exponential backoff until the API response is successful.
- Set the asynchronous option for your requests to the API to false and omit the widget displaying the API results when a timeout or error is encountered.

--------------------------------------------------

306. You are working on a social media application. You plan to add a feature that allows users to upload images. These images will be 2 MB `" 1 GB in size. You want to minimize their infrastructure operations overhead for this feature.
What should you do?

corretta/e:
- Change the application to create signed URLs for Cloud Storage. Transfer these signed URLs to the client application to upload images to Cloud Storage.

sbagliate:
- Set up a web server on GCP to accept user images and create a file store to keep uploaded files. Change the application to retrieve images from the file store.
- Create a separate bucket for each user in Cloud Storage. Assign a separate service account to allow write access on each bucket. Transfer service account credentials to the client application based on user information. The application uses this service account to upload images to Cloud Storage.
- Change the application to accept images directly and store them in the database that stores other user information.

--------------------------------------------------

307. Your company uses Cloud Logging to manage large volumes of log data. You need to build a real-time log analysis architecture that pushes logs to a third-party application for processing. What should you do?

corretta/e:
- Create a Cloud Logging log export to Pub/Sub.

sbagliate:
- Create a Cloud Logging log export to Cloud Storage.
- Create a Cloud Function to read Cloud Logging log entries and send them to the third-party application.
- Create a Cloud Logging log export to BigQuery.

--------------------------------------------------

308. Your team develops services that run on Google Kubernetes Engine. Your team's code is stored in Cloud Source Repositories. You need to quickly identify bugs in the code before it is deployed to production. You want to invest in automation to improve developer feedback and make the process as efficient as possible.
What should you do?

corretta/e:
- Use Cloud Build to automate building container images from code based on Git tags.

sbagliate:
- Use Cloud Build to automate building container images from code based on forked versions.
- Use Spinnaker to automate deploying container images to the production environment.
- Use Spinnaker to automate building container images from code based on Git tags.

--------------------------------------------------

309. You have an application deployed in Google Kubernetes Engine (GKE). You need to update the application to make authorized requests to Google Cloud managed services. You want this to be a one-time setup, and you need to follow security best practices of auto-rotating your security keys and storing them in an encrypted store. You already created a service account with appropriate access to the Google Cloud service. What should you do next?

corretta/e:
- Assign the Google Cloud service account to your GKE Pod using Workload Identity.

sbagliate:
- Export the Google Cloud service account, and upload it to HashiCorp Vault to generate a dynamic service account for your application.
- Export the Google Cloud service account, and embed it in the source code of the application.
- Export the Google Cloud service account, and share it with the Pod as a Kubernetes Secret.

--------------------------------------------------

310. Your team is developing a new application using a PostgreSQL database and Cloud Run. You are responsible for ensuring that all traffic is kept private on Google
Cloud. You want to use managed services and follow Google-recommended best practices. What should you do?

corretta/e:
- 1. Enable Cloud SQL and Cloud Run in the same project. 2. Configure a private IP address for Cloud SQL. Enable private services access. 3. Create a Serverless VPC Access connector. 4. Configure Cloud Run to use the connector to connect to Cloud SQL.

sbagliate:
- 1. Install PostgreSQL on a Compute Engine VM, and enable Cloud Run in different projects. 2. Configure a private IP address for the VM. Enable private services access. 3. Create a Serverless VPC Access connector. 4. Set up a VPN connection between the two projects. Configure Cloud Run to use the connector to access the VM hosting PostgreSQL
- 1. Install PostgreSQL on a Compute Engine virtual machine (VM), and enable Cloud Run in the same project. 2. Configure a private IP address for the VM. Enable private services access. 3. Create a Serverless VPC Access connector. 4. Configure Cloud Run to use the connector to connect to the VM hosting PostgreSQL.
- 1. Use Cloud SQL and Cloud Run in different projects. 2. Configure a private IP address for Cloud SQL. Enable private services access. 3. Create a Serverless VPC Access connector. 4. Set up a VPN connection between the two projects. Configure Cloud Run to use the connector to connect to Cloud SQL.

--------------------------------------------------

311. You are tasked with using C++ to build and deploy a microservice for an application hosted on Google Cloud. The code needs to be containerized and use several custom software libraries that your team has built. You do not want to maintain the underlying infrastructure of the application. How should you deploy the microservice?

corretta/e:
- Use Cloud Build to create the container, and deploy it on Cloud Run.

sbagliate:
- Use Cloud Functions to deploy the microservice.
- Use Cloud Shell to containerize your microservice, and deploy it on standard Google Kubernetes Engine.
- Use Cloud Shell to containerize your microservice, and deploy it on a Container-Optimized OS Compute Engine instance.

--------------------------------------------------

312. You are developing an application that uses microservices architecture that includes Cloud Run, Bigtable, and Pub/Sub. You want to conduct the testing and debugging process as quickly as possible to create a minimally viable product with minimal cost. What should you do?

corretta/e:
- Use emulators to test the functionality of cloud resources locally, and deploy the code to your Google Cloud project.

sbagliate:
- Use Cloud Shell Editor and Cloud Shell to deploy the application, and test the functionality by using the Google Cloud console in the project.
- Use Cloud Build to create a pipeline, and add the unit testing stage and the manual approval stage. Deploy the code to your Google Cloud project.
- Use Cloud Code to develop, deploy, and test microservices resources. Use Cloud Logging to review the resource logs.

--------------------------------------------------

313. Your application is built as a custom machine image. You have multiple unique deployments of the machine image. Each deployment is a separate managed instance group with its own template. Each deployment requires a unique set of configuration values. You want to provide these unique values to each deployment but use the same custom machine image in all deployments. You want to use out-of-the-box features of Compute Engine.
What should you do?

corretta/e:
- Place the unique configuration values in the instance template instance metadata.

sbagliate:
- Place the unique configuration values in a Cloud Bigtable table.
- Place the unique configuration values in the instance template startup script.
- Place the unique configuration values in the persistent disk.

--------------------------------------------------

314. Your company wants to expand their users outside the United States for their popular application. The company wants to ensure 99.999% availability of the database for their application and also wants to minimize the read latency for their users across the globe.
Which two actions should they take? (Choose two.)

corretta/e:
- 

sbagliate:
- Create a minimum of two Cloud Spanner instances in separate regions with at least one node.
- Create a cluster with at least 3 Spanner nodes.
- Create a cluster with at least 1 Spanner node.
- Create a Cloud Dataflow pipeline to replicate data across different databases.
- Create a multi-regional Cloud Spanner instance with "nam3" configuration.
- Create a multi-regional Cloud Spanner instance with "nam-asia-eur1" configuration.

--------------------------------------------------

315. You are developing an application that will allow clients to download a file from your website for a specific period of time. How should you design the application to complete this task while following Google-recommended best practices?

corretta/e:
- Generate and assign a Cloud Storage-signed URL for the file. Make the URL available for the client to download.

sbagliate:
- Create a temporary Cloud Storage bucket with time expiration specified, and give download permissions to the bucket. Copy the file, and send it to the client.
- Configure the application to send the file to the client as an email attachment.
- Generate the HTTP cookies with time expiration specified. If the time is valid, copy the file from the Cloud Storage bucket, and make the file available for the client to download.

--------------------------------------------------

316. You are a developer at a company that operates an ecommerce website. The website stores the customer order data in a Cloud SQL for PostgreSQL database. Data scientists on the marketing team access this data to run their reports. Every time they run these reports, the website's performance is negatively affected. You want to provide access to up-to-date customer order datasets without affecting your website. What should you do?

corretta/e:
- Set up a BigQuery dataset for the data science team. Configure Datastream to replicate the relevant Cloud SQL tables in BigQuery.

sbagliate:
- Set up a Bigtable table for the data science team. Configure the application to perform dual writes to both Cloud SQL and Bigtable simultaneously.
- Create a clone of the PostgreSQL database instance for the data science team. Schedule a job to create a new clone every 15 minutes.
- Configure Cloud Scheduler to run an hourly Cloud Function that exports the data from the Cloud SQL database into CSV format and sends the data to a Cloud Storage bucket.

--------------------------------------------------

317. You have two tables in an ANSI-SQL compliant database with identical columns that you need to quickly combine into a single table, removing duplicate rows from the result set.
What should you do?

corretta/e:
- Use the UNION operator in SQL to combine the tables.

sbagliate:
- Use the UNION ALL operator in SQL to combine the tables.
- Use the JOIN operator in SQL to combine the tables.
- Use nested WITH statements to combine the tables.

--------------------------------------------------

318. You are developing an application that will allow users to read and post comments on news articles. You want to configure your application to store and display user-submitted comments using Firestore. How should you design the schema to support an unknown number of comments and articles?

corretta/e:
- Store each comment in a subcollection of the article.

sbagliate:
- Add each comment to an array property on the article.
- Store each comment in a document, and add the comment's key to an array property on the article.
- Store each comment in a document, and add the comment's key to an array property on the user profile.

--------------------------------------------------

319. Case study -

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.


To start the case study -
To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.


Company Overview -
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.


Executive Statement -
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.


Solution Concept -
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data, and that they analyze and respond to any issues that occur.


Existing Technical Environment -
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application well, but has limited experience in global scale applications. Their existing technical environment is as follows:
• Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
• State is stored in a single instance MySQL database in GCP.
• Release cycles include development freezes to allow for QA testing.
• The application has no logging.
• Applications are manually deployed by infrastructure engineers during periods of slow traffic on weekday evenings.
• There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.


Business Requirements -
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
• Expand availability of the application to new regions.
• Support 10x as many concurrent users.
• Ensure a consistent experience for users when they travel to different regions.
• Obtain user activity metrics to better understand how to monetize their product.
• Ensure compliance with regulations in the new regions (for example, GDPR).
• Reduce infrastructure management time and cost.
• Adopt the Google-recommended practices for cloud computing.
○ Develop standardized workflows and processes around application lifecycle management.
○ Define service level indicators (SLIs) and service level objectives (SLOs).


Technical Requirements -
• Provide secure communications between the on-premises data center and cloud-hosted applications and infrastructure.
• The application must provide usage metrics and monitoring.
• APIs require authentication and authorization.
• Implement faster and more accurate validation of new features.
• Logging and performance metrics must provide actionable information to be able to provide debugging information and alerts.
• Must scale to meet user demand.


For this question refer to the HipLocal case study.

HipLocal wants to reduce the latency of their services for users in global locations. They have created read replicas of their database in locations where their users reside and configured their service to read traffic using those replicas. How should they further reduce latency for all database interactions with the least amount of effort?

corretta/e:
- Migrate the database to Cloud Spanner and use it to serve all global user traffic.

sbagliate:
- Migrate the services to Google Kubernetes Engine and use a load balancer service to better scale the application.
- Migrate the database to Firestore in Datastore mode and use it to serve all global user traffic.
- Migrate the database to Bigtable and use it to serve all global user traffic.

--------------------------------------------------

320. You recently developed a web application to transfer log data to a Cloud Storage bucket daily. Authenticated users will regularly review logs from the prior two weeks for critical events. After that, logs will be reviewed once annually by an external auditor. Data must be stored for a period of no less than 7 years. You want to propose a storage solution that meets these requirements and minimizes costs. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Use the Bucket Lock feature to set the retention policy on the data.
- Create a lifecycle management policy to set the storage class to Coldline for objects older than 14 days.
- Run a scheduled job to set the storage class to Coldline for objects older than 14 days.
- Create a lifecycle management policy to set the storage class to Nearline for objects older than 14 days.
- Create a JSON Web Token (JWT) for users needing access to the Coldline storage buckets.

--------------------------------------------------

321. Your application is deployed on hundreds of Compute Engine instances in a managed instance group (MIG) in multiple zones. You need to deploy a new instance template to fix a critical vulnerability immediately but must avoid impact to your service. What setting should be made to the MIG after updating the instance template?

corretta/e:
- Set the Minimum Wait time to 0 seconds.

sbagliate:
- Set the Update mode to Opportunistic.
- Set the Max Surge to 100%.
- Set the Maximum Unavailable to 100%.

--------------------------------------------------

322. Your company is planning to migrate their on-premises Hadoop environment to the cloud. Increasing storage cost and maintenance of data stored in HDFS is a major concern for your company. You also want to make minimal changes to existing data analytics jobs and existing architecture.
How should you proceed with the migration?

corretta/e:
- Create a Cloud Dataproc cluster on Google Cloud Platform, and then migrate your Hadoop code objects to the new cluster. Move your data to Cloud Storage and leverage the Cloud Dataproc connector to run jobs on that data.

sbagliate:
- Create a Cloud Dataproc cluster on Google Cloud Platform, and then migrate your Hadoop environment to the new Cloud Dataproc cluster. Move your HDFS data into larger HDD disks to save on storage costs.
- Create Compute Engine instances with HDD instead of SSD to save costs. Then perform a full migration of your existing environment into the new one in Compute Engine instances.
- Migrate your data stored in Hadoop to BigQuery. Change your jobs to source their information from BigQuery instead of the on-premises Hadoop environment.

--------------------------------------------------

323. You support an application that uses the Cloud Storage API. You review the logs and discover multiple HTTP 503 Service Unavailable error responses from the
API. Your application logs the error and does not take any further action. You want to implement Google-recommended retry logic to improve success rates.
Which approach should you take?

corretta/e:
- Retry each failure at increasing time intervals up to a maximum number of tries.

sbagliate:
- Retry the failures in batch after a set number of failures is logged.
- Retry each failure at decreasing time intervals up to a maximum number of tries.
- Retry each failure at a set time interval up to a maximum number of times.

--------------------------------------------------

324. Your service adds text to images that it reads from Cloud Storage. During busy times of the year, requests to Cloud Storage fail with an HTTP 429 "Too Many
Requests" status code.
How should you handle this error?

corretta/e:
- Retry the request with a truncated exponential backoff strategy.

sbagliate:
- Change the storage class of the Cloud Storage bucket to Multi-regional.
- Request a quota increase from the GCP Console.
- Add a cache-control header to the objects.

--------------------------------------------------

325. You have a Cloud Run service that needs to connect to a Cloud SQL instance in a different project. You provisioned the Cloud Run service account with the Cloud SQL Client IAM role on the project that is hosting Cloud SQL. However, when you test the connection, the connection fails. You want to fix the connection failure while following Google-recommended practices. What should you do?

corretta/e:
- Enable the Cloud SQL Admin API in both projects.

sbagliate:
- Request additional API quota for Cloud SQL Auth Proxy,
- Migrate the Cloud SQL instance into the same project as the Cloud Run service.
- Add the cloudsql.instances.connect IAM permission to the Cloud Run service account.

--------------------------------------------------

326. You want to create `fully baked` or `golden` Compute Engine images for your application. You need to bootstrap your application to connect to the appropriate database according to the environment the application is running on (test, staging, production). What should you do?

corretta/e:
- When creating the Compute Engine instance, create a metadata item with a key of ג€DATABASEג€ and a value for the appropriate database connection string. In your application, query the metadata server for the ג€DATABASEג€ value, and use the value to connect to the appropriate database.

sbagliate:
- When creating the Compute Engine instance, create a metadata item with a key of ג€DATABASEג€ and a value for the appropriate database connection string. In your application, read the ג€DATABASEג€ environment variable, and use the value to connect to the appropriate database.
- Embed the appropriate database connection string in the image. Create a different image for each environment.
- When creating the Compute Engine instance, add a tag with the name of the database to be connected. In your application, query the Compute Engine API to pull the tags for the current instance, and use the tag to construct the appropriate database connection string.

--------------------------------------------------

327. You are developing a new image processing application that needs to handle various tasks, such as resizing, cropping, and watermarking images. You also need to monitor the workflow and ensure that it scales efficiently when there are large volumes of images. You want to automate the image processing tasks and workflow monitoring with the least effort. What should you do?

corretta/e:
- Implement Workflows to orchestrate the image processing tasks. Use Cloud Logging for workflow monitoring.

sbagliate:
- Employ Cloud Composer to manage the image processing workflows. Use Dataproc for workflow monitoring and analytics.
- Use Cloud Build to trigger Cloud Functions for the image processing tasks. Use Cloud Monitoring for workflow monitoring.
- Use Cloud Run to deploy the image processing functions. Use Apigee to expose the API. Use Cloud Logging for workflow monitoring.

--------------------------------------------------

328. You recently developed a new service on Cloud Run. The new service authenticates using a custom service and then writes transactional information to a Cloud
Spanner database. You need to verify that your application can support up to 5,000 read and 1,000 write transactions per second while identifying any bottlenecks that occur. Your test infrastructure must be able to autoscale. What should you do?

corretta/e:
- Create a Google Kubernetes Engine cluster running the Locust or JMeter images to dynamically generate load tests. Analyze the results using Cloud Trace.

sbagliate:
- Create a Cloud Task to generate a test load. Use Cloud Scheduler to run 60,000 Cloud Task transactions per minute for 10 minutes. Analyze the results using Cloud Monitoring.
- Create a Compute Engine instance that uses a LAMP stack image from the Marketplace, and use Apache Bench to generate load tests against the service. Analyze the results using Cloud Trace.
- Build a test harness to generate requests and deploy it to Cloud Run. Analyze the VPC Flow Logs using Cloud Logging.

--------------------------------------------------

329. You are designing a schema for a table that will be moved from MySQL to Cloud Bigtable. The MySQL table is as follows:
//IMG//

How should you design a row key for Cloud Bigtable for this table?

corretta/e:
- Set Account_id_Event_timestamp as a key.

sbagliate:
- Set Event_timestamp as a key.
- Set Event_timestamp_Account_id as a key.
- Set Account_id as a key.

--------------------------------------------------

330. You are configuring a continuous integration pipeline using Cloud Build to automate the deployment of new container images to Google Kubernetes Engine (GKE). The pipeline builds the application from its source code, runs unit and integration tests in separate steps, and pushes the container to Container Registry. The application runs on a Python web server.

The Dockerfile is as follows:


FROM python:3.7-alpine -

COPY . /app -

WORKDIR /app -
RUN pip install -r requirements.txt
CMD [ "gunicorn", "-w 4", "main:app" ]

You notice that Cloud Build runs are taking longer than expected to complete. You want to decrease the build time. What should you do? (Choose two.)

corretta/e:
- 

sbagliate:
- Store application source code on Cloud Storage, and configure the pipeline to use gsutil to download the source code.
- Deploy a Container Registry on a Compute Engine VM in a VPC, and use it to store the final images.
- Select a virtual machine (VM) size with higher CPU for Cloud Build runs.
- Change the base image in the Dockerfile to ubuntu:latest, and install Python 3.7 using a package manager utility.
- Cache the Docker image for subsequent builds using the -- cache-from argument in your build config file.

--------------------------------------------------

331. You recently deployed an application to GKE where Pods are writing files to a Compute Engine persistent disk. You have created a PersistentVolumeClaim (PVC) and a PersistentVolume (PV) object on Kubernetes for the disk, and you reference the PVC in the deployment manifest file.

You recently expanded the size of the persistent disk because the application has used up almost all of the disk space. You have logged on to one of the Pods, and you notice that the disk expansion is not visible in the container file system. What should you do?

corretta/e:
- Set the spec.resources.requests.storage value of the PVC object to match the size of the persistent disk. Apply the updated configuration by using kubectl.

sbagliate:
- In the Pod, resize the disk partition to the maximum value by using the fdisk or parted utility.
- Recreate the application Pods by running the kubectl delete deployment DEPLOYMENT_NAME && kubectl apply deployment.yaml command, where the DEPLOYMENT_NAME parameter is the name of your deployment and deployment.yaml is its manifest file.
- Set the spec.capacity.storage value of the PV object to match the size of the persistent disk. Apply the updated configuration by using kubectl.

--------------------------------------------------

332. You noticed that your application was forcefully shut down during a Deployment update in Google Kubernetes Engine. Your application didn’t close the database connection before it was terminated. You want to update your application to make sure that it completes a graceful shutdown. What should you do?

corretta/e:
- Update your code to process a received SIGTERM signal to gracefully disconnect from the database.

sbagliate:
- Configure a PreStop hook to shut down your application.
- Configure a PodDisruptionBudget to prevent the Pod from being forcefully shut down.
- Increase the terminationGracePeriodSeconds for your application.

--------------------------------------------------

333. You are deploying your application to a Compute Engine virtual machine instance with the Stackdriver Monitoring Agent installed. Your application is a unix process on the instance. You want to be alerted if the unix process has not run for at least 5 minutes. You are not able to change the application to generate metrics or logs.
Which alert condition should you configure?

corretta/e:
- Metric absence

sbagliate:
- Metric threshold
- Uptime check
- Process health

--------------------------------------------------

334. You are using Cloud Build for your CI/CD pipeline to complete several tasks, including copying certain files to Compute Engine virtual machines. Your pipeline requires a flat file that is generated in one builder in the pipeline to be accessible by subsequent builders in the same pipeline. How should you store the file so that all the builders in the pipeline can access it?

corretta/e:
- Output the file contents to a file in /workspace. Read from the same /workspace file in the subsequent build step.

sbagliate:
- Store and retrieve the file contents using Compute Engine instance metadata.
- Use gsutil to output the file contents to a Cloud Storage object. Read from the same object in the subsequent build step.
- Add a build argument that runs an HTTP POST via curl to a separate web server to persist the value in one builder. Use an HTTP GET via curl from the subsequent build step to read the value.

--------------------------------------------------

335. You recently deployed a Go application on Google Kubernetes Engine (GKE). The operations team has noticed that the application's CPU usage is high even when there is low production traffic. The operations team has asked you to optimize your application's CPU resource consumption. You want to determine which Go functions consume the largest amount of CPU. What should you do?

corretta/e:
- Modify your Go application to capture profiling data. Analyze the CPU metrics of your application in flame graphs in Profiler.

sbagliate:
- Connect to your GKE nodes using SSH. Run the top command on the shell to extract the CPU utilization of your application.
- Deploy a Fluent Bit daemonset on the GKE cluster to log data in Cloud Logging. Analyze the logs to get insights into your application code’s performance.
- Create a custom dashboard in Cloud Monitoring to evaluate the CPU performance metrics of your application.

--------------------------------------------------

336. You recently joined a new team that has a Cloud Spanner database instance running in production. Your manager has asked you to optimize the Spanner instance to reduce cost while maintaining high reliability and availability of the database. What should you do?

corretta/e:
- Use Cloud Monitoring to monitor the CPU utilization, and reduce Spanner processing units by small increments until you find the minimum capacity required.

sbagliate:
- Use Cloud Logging to check for error logs, and reduce Spanner processing units by small increments until you find the minimum capacity required.
- Use Snapshot Debugger to check for application errors, and reduce Spanner processing units by small increments until you find the minimum capacity required.
- Use Cloud Trace to monitor the requests per sec of incoming requests to Spanner, and reduce Spanner processing units by small increments until you find the minimum capacity required.

--------------------------------------------------

337. You want to re-architect a monolithic application so that it follows a microservices model. You want to accomplish this efficiently while minimizing the impact of this change to the business.
Which approach should you take?

corretta/e:
- Replace the application's features with appropriate microservices in phases.

sbagliate:
- Build a new application with the appropriate microservices separate from the monolith and replace it when it is complete.
- Deploy the application to Compute Engine and turn on autoscaling.
- Refactor the monolithic application with appropriate microservices in a single effort and deploy it.

--------------------------------------------------

338. Your security team is auditing all deployed applications running in Google Kubernetes Engine. After completing the audit, your team discovers that some of the applications send traffic within the cluster in clear text. You need to ensure that all application traffic is encrypted as quickly as possible while minimizing changes to your applications and maintaining support from Google. What should you do?

corretta/e:
- Install Istio, enable proxy injection on your application namespace, and then enable mTLS.

sbagliate:
- Define Trusted Network ranges within the application, and configure the applications to allow traffic only from those networks.
- Use an automated process to request SSL Certificates for your applications from Let's Encrypt and add them to your applications.
- Use Network Policies to block traffic between applications.

--------------------------------------------------

339. You are developing a secure document sharing platform. The platform allows users to share documents with other users who may be external to their organization. Access to these documents should be revoked after a configurable time period. The documents are stored in Cloud Storage. How should you configure Cloud Storage to support this functionality?

corretta/e:
- Generate a signed URL for each document the user wants to share.

sbagliate:
- Grant the Storage Object Viewer IAM role to all authenticated users.
- Create signed policy documents on the Cloud Storage bucket.
- Apply access control list (ACL) permissions to the Cloud Storage bucket.

--------------------------------------------------

340. You work for an organization that manages an online ecommerce website. Your company plans to expand across the world; however, the estore currently serves one specific region. You need to select a SQL database and configure a schema that will scale as your organization grows. You want to create a table that stores all customer transactions and ensure that the customer (CustomerId) and the transaction (TransactionId) are unique. What should you do?

corretta/e:
- Create a Cloud Spanner table that has TransactionId and CustomerId configured as primary keys. Use a random string (UUID) for the TransactionId.

sbagliate:
- Create a Cloud SQL table that has TransactionId and CustomerId configured as primary keys. Use an incremental number for the TransactionId.
- Create a Cloud Spanner table that has TransactionId and CustomerId configured as primary keys. Use an incremental number for the TransactionId.
- Create a Cloud SQL table that has TransactionId and CustomerId configured as primary keys. Use a random string (UUID) for the Transactionid.

--------------------------------------------------

341. You are a developer at a regulated financial company and are the lead of a risk calculation application that is running on Cloud Run. Binary Authorization for Cloud Run has been enabled as an organization policy, and there is one attestor. All applications in the company are attested. Each application's image is deployed as part of a CI/CD pipeline during a 1-hour change window at 11 PM local time. There is a new security issue that requires you to deploy a critical fix before the next change window. You have created a new image with the fix, and your manager has approved the image in an email message. What should you do?

corretta/e:
- Use the breakglass approach to deploy the image.

sbagliate:
- Add the image to the exempt image patterns in the Binary Authorization policy.
- Sign the image with your private key and ask the project admin to change the public key in the attestor.
- Change the organization policy to temporarily disable Binary Authorization, and deploy the image.

--------------------------------------------------

342. You are deploying a Python application to Cloud Run using Cloud Source Repositories and Cloud Build. The Cloud Build pipeline is shown below:

//IMG//


You want to optimize deployment times and avoid unnecessary steps. What should you do?

corretta/e:
- Add the --cache-from argument to the Docker build step in your build config file.

sbagliate:
- Remove the step that pushes the container to Artifact Registry.
- Deploy a new Docker registry in a VPC, and use Cloud Build worker pools inside the VPC to run the build pipeline.
- Store image artifacts in a Cloud Storage bucket in the same region as the Cloud Run instance.

--------------------------------------------------

343. You are developing a new web application using Cloud Run and committing code to Cloud Source Repositories. You want to deploy new code in the most efficient way possible. You have already created a Cloud Build YAML file that builds a container and runs the following command: gcloud run deploy. What should you do next?

corretta/e:
- Create a build trigger that runs the build file in response to a repository code being pushed to the development branch.

sbagliate:
- Create a Pub/Sub topic to be notified when code is pushed to the repository. Create a Pub/Sub trigger that runs the build file when an event is published to the topic.
- Create a webhook build trigger that runs the build file in response to HTTP POST calls to the webhook URL.
- Create a Cron job that runs the following command every 24 hours: gcloud builds submit.

--------------------------------------------------

344. One of your deployed applications in Google Kubernetes Engine (GKE) is having intermittent performance issues. Your team uses a third-party logging solution. You want to install this solution on each node in your GKE cluster so you can view the logs. What should you do?

corretta/e:
- Deploy the third-party solution as a DaemonSet

sbagliate:
- Deploy the third-party solution using Terraform and deploy the logging Pod as a Kubernetes Deployment
- Use SSH to connect to the GKE node, and install the software manually
- Modify your container image to include the monitoring software

--------------------------------------------------

345. You are using Cloud Build to build and test application source code stored in Cloud Source Repositories. The build process requires a build tool not available in the Cloud Build environment.
What should you do?

corretta/e:
- Build a custom cloud builder image and reference the image in your build steps.

sbagliate:
- Include the binary in your Cloud Source Repositories repository and reference it in your build scripts.
- Download the binary from the internet during the build process.
- Ask to have the binary added to the Cloud Build environment by filing a feature request against the Cloud Build public Issue Tracker.

--------------------------------------------------

346. You are currently pushing container images to Artifact Registry and deploying a containerized microservices application to GKE. After deploying the application, you notice that the services do not behave as expected. You use the kubectl get pods command to inspect the state of the application Pods, and discover that one of the Pods has a state of CrashLoopBackoff. How should you troubleshoot the Pod?

corretta/e:
- Run the kubectl logs POD_NAME command where the POD_NAME parameter is the name of the problematic Pod. Analyze the logs of the Pod from previous runs to determine the root cause of failed start attempts of the Pod.

sbagliate:
- Execute the gcloud projects get-iam-policy PROJECT_ID command where the PROJECT_ID parameter is the name of the project where your Artifact Registry resides. Inspect the IAM bindings of the node pool s service account. Validate if the service account has the roles/artifactregistry.reader role.
- In the Google Cloud console, navigate to Cloud Logging in the project of the cluster’s VPC. Enter a filter to show denied egress traffic to the Private Google Access CIDR range. Validate if egress traffic is denied from your GKE cluster to the Private Google Access CIDR range.
- Connect to the problematic Pod by running the kubectl exec -it POD_NAME - /bin/bash command where the POD_NAME parameter is the name of the problematic Pod. Inspect the logs in the /var/log/messages folder to determine the root cause.

--------------------------------------------------

347. This architectural diagram depicts a system that streams data from thousands of devices. You want to ingest data into a pipeline, store the data, and analyze the data using SQL statements. Which Google Cloud services should you use for steps 1, 2, 3, and 4?

//IMG//

corretta/e:
- 1. Pub/Sub
2. Dataflow
3. Firestore
4. BigQuery

sbagliate:
- 1. Dataflow
2. Pub/Sub
3. Firestore
4. BigQuery
- 1. Pub/Sub
2. Dataflow
3. BigQuery
4. Firestore
- 1. App Engine
2. Pub/Sub
3. BigQuery
4. Firestore

--------------------------------------------------

348. You are load testing your server application. During the first 30 seconds, you observe that a previously inactive Cloud Storage bucket is now servicing 2000 write requests per second and 7500 read requests per second. Your application is now receiving intermittent 5xx and 429 HTTP responses from the Cloud Storage
JSON API as the demand escalates. You want to decrease the failed responses from the Cloud Storage API.
What should you do?

corretta/e:
- Limit the upload rate from your application clients so that the dormant bucket's peak request rate is reached more gradually.

sbagliate:
- Use the XML API instead of the JSON API for interfacing with Cloud Storage.
- Distribute the uploads across a large number of individual storage buckets.
- Pass the HTTP response codes back to clients that are invoking the uploads from your application.

--------------------------------------------------

349. You are a developer at a large organization. You have an application written in Go running in a production Google Kubernetes Engine (GKE) cluster. You need to add a new feature that requires access to BigQuery. You want to grant BigQuery access to your GKE cluster following Google-recommended best practices. What should you do?

corretta/e:
- Create a Google service account and a Kubernetes service account. Configure Workload Identity on the GKE cluster, and reference the Kubernetes service account on the application Deployment.

sbagliate:
- Create a Google service account with BigQuery access. Add the Google service account JSON key to Secret Manager, and use an init container to access the secret for the application to use.
- Create a Google service account with BigQuery access. Add the JSON key to Secret Manager, and use the Go client library to access the JSON key.
- Create a Google service account with BigQuery access. Add the Google service account JSON key as a Kubernetes secret, and configure the application to use this secret.

--------------------------------------------------

350. You recently developed an application that monitors a large number of stock prices. You need to configure Pub/Sub to receive a high volume messages and update the current stock price in a single large in-memory database. A downstream service needs the most up-to-date prices in the in-memory database to perform stock trading transactions. Each message contains three pieces or information:
• Stock symbol
• Stock price
• Timestamp for the update

How should you set up your Pub/Sub subscription?

corretta/e:
- Create a pull subscription with exactly-once delivery enabled.

sbagliate:
- Create a push subscription with both ordering and exactly-once delivery turned off.
- Create a push subscription with exactly-once delivery enabled.
- Create a pull subscription with both ordering and exactly-once delivery turned off.

--------------------------------------------------

351. Your company just experienced a Google Kubernetes Engine (GKE) API outage due to a zone failure. You want to deploy a highly available GKE architecture that minimizes service interruption to users in the event of a future zone failure. What should you do?

corretta/e:
- Deploy Regional clusters

sbagliate:
- Deploy Zonal clusters
- Deploy Multi-Zone clusters
- Deploy GKE on-premises clusters

--------------------------------------------------

352. A governmental regulation was recently passed that affects your application. For compliance purposes, you are now required to send a duplicate of specific application logs from your application’s project to a project that is restricted to the security team. What should you do?

corretta/e:
- Create user-defined log buckets in the security team’s project. Configure a Cloud Logging sink to route your application’s logs to log buckets in the security team’s project.

sbagliate:
- Create a job that copies the System Event logs from the _Required log bucket into the security team’s log bucket in their project.
- Modify the _Default log bucket sink rules to reroute the logs into the security team’s log bucket.
- Create a job that copies the logs from the _Required log bucket into the security team’s log bucket in their project.

--------------------------------------------------

353. Your team manages a large Google Kubernetes Engine (GKE) cluster. Several application teams currently use the same namespace to develop microservices for the cluster. Your organization plans to onboard additional teams to create microservices. You need to configure multiple environments while ensuring the security and optimal performance of each team’s work. You want to minimize cost and follow Google-recommended best practices. What should you do?

corretta/e:
- Create a new namespace for each team in the existing cluster, and define resource quotas.

sbagliate:
- Create new role-based access controls (RBAC) for each team in the existing cluster, and define resource quotas.
- Create a new GKE cluster for each team.
- Create a new namespace for each environment in the existing cluster, and define resource quotas.

--------------------------------------------------

354. Your team currently uses Bigtable as their database backend. In your application's app profile, you notice that the connection to the Bigtable cluster is specified as single-cluster routing, and the cluster’s connection logic is configured to conduct manual failover when the cluster is unavailable. You want to optimize the application code to have more efficient and highly available Bigtable connectivity. What should you do?

corretta/e:
- Configure the app profile to use multi-cluster routing.

sbagliate:
- Configure a Dataflow template, and use a Beam connector to stream data changes.
- Set up Memcached so that queries hit the cache layer first and automatically get data from Bigtable in the event of a cache miss.
- Increase the Bigtable client’s connection pool size.

--------------------------------------------------

355. You need to migrate a standalone Java application running in an on-premises Linux virtual machine (VM) to Google Cloud in a cost-effective manner. You decide not to take the lift-and-shift approach, and instead you plan to modernize the application by converting it to a container. How should you accomplish this task?

corretta/e:
- Use Jib to build a Docker image from your source code, and upload it to Artifact Registry. Deploy the application in a GKE cluster, and test the application.

sbagliate:
- Use Migrate for Anthos to migrate the VM to your Google Kubernetes Engine (GKE) cluster as a container.
- Export the VM as a raw disk and import it as an image. Create a Compute Engine instance from the Imported image.
- Use Migrate for Compute Engine to migrate the VM to a Compute Engine instance, and use Cloud Build to convert it to a container.

--------------------------------------------------

356. Your company recently modernized their monolith ecommerce site to a microservices application in GKE. Your team uses Google Cloud's operations suite for monitoring and logging. You want to improve the logging indexing and searchabilty in Cloud Logging across your microservices with the least amount of effort. What should you do?

corretta/e:
- Update your microservices code to emit logs in JSON format.

sbagliate:
- Instrument your microservices code with OpenTelemetry libraries.
- Reconfigure your applications to write logs to an emptyDir volume. Configure a sidecar agent to read the logs and send them to the Cloud Logging API.
- Ask the SRE team to enable Managed Service for Prometheus on your GKE cluster.

--------------------------------------------------

357. You work for an ecommerce company. You are designing a new Orders API that will be exposed through Apigee. In your Apigee organization, you created two new environments named orders-test and orders-prod. You plan to use unique URLs named test.lnk-42.com/api/v1/orders and Ink-42.com/api/v1/orders for each environment. You need to ensure that each environment only uses the assigned URL. What should you do?

corretta/e:
- 1. Attach orders-test to the test environment group, and attach orders-prod to the production environment group.
2. Add each hostname to the appropriate environment group.

sbagliate:
- 1. Attach orders-test and orders-prod to the orders environment group.
2. Add each hostname to the appropriate environment.
- 1. Attach orders-test and orders-prod to the orders environment group.
2. Add each hostname to the orders environment group.
- 1. Attach orders-test to the test environment group, and attach orders-prod to the production environment group.
2. Add each hostname to the appropriate environment.

--------------------------------------------------

358. You need to migrate an internal file upload API with an enforced 500-MB file size limit to App Engine.
What should you do?

corretta/e:
- Use signed URLs to upload files.

sbagliate:
- Use FTP to upload files.
- Change the API to be a multipart file upload API.
- Use CPanel to upload files.

--------------------------------------------------

359. You are developing a web application that contains private images and videos stored in a Cloud Storage bucket. Your users are anonymous and do not have Google Accounts. You want to use your application-specific logic to control access to the images and videos. How should you configure access?

corretta/e:
- Generate a signed URL that grants read access to the bucket. Allow users to access the URL after authenticating through your web application.

sbagliate:
- Cache each web application user's IP address to create a named IP table using Google Cloud Armor. Create a Google Cloud Armor security policy that allows users to access the backend bucket.
- Configure Identity-Aware Proxy (IAP) to authenticate users into the web application. Allow users to access the bucket after authenticating through IAP.
- Grant the Storage Object Viewer IAM role to allUsers. Allow users to access the bucket after authenticating through your web application.

--------------------------------------------------
