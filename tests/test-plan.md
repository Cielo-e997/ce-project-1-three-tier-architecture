# Test Plan

The following tests were performed to validate the three-tier architecture:

1. Load Balancer Access Test
- Access the public DNS of the Application Load Balancer
- Confirm that the application responds correctly

2. Traffic Distribution Test
- Refresh the Load Balancer multiple times
- Confirm that different instance IDs appear

3. Health Check Test
- Access the /health endpoint
- Confirm that it returns status OK

4. Database Connectivity Test
- Verify that the application tier can reach the database port internally
- Confirm that the database is not publicly accessible

5. Security Isolation Test
- Confirm that application and database instances cannot be accessed directly from the internet
