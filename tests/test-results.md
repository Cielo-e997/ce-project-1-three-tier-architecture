# Test Results

The tests defined in the test plan were executed and the following results were observed:

1. Load Balancer Access Test  
The Application Load Balancer DNS was accessible from a browser and returned the expected application response.

2. Traffic Distribution Test  
After refreshing the page multiple times, different instance IDs and Availability Zones were displayed. This confirmed that traffic was being distributed across the three application instances.

3. Health Check Test  
The `/health` endpoint returned "OK", and all instances were reported as healthy in the target group configuration.

4. Database Connectivity Test  
The application tier was able to reach the database port internally. External access to the database was not possible, confirming proper isolation.

5. Security Isolation Test  
Application and database instances were not directly accessible from the public internet. Access was only possible through the bastion host.
