Demo Script – 3-Tier Cloud Architecture

Slide 1 – Introduction

Today I will present the three-tier architecture I designed and deployed on AWS.
The goal of this project was to build a secure and highly available infrastructure separating the presentation, application, and data layers.

⸻

Slide 2 – Project Objective

The main objective was to implement proper network segmentation, control communication between layers using security groups, and deploy the system across two Availability Zones to improve availability and resilience.

⸻

Slide 3 – Overall Architecture

This diagram shows the complete system.
Traffic enters through an internet-facing Application Load Balancer.
The Load Balancer distributes requests to multiple EC2 instances running in private subnets.
The application layer communicates internally with the data layer, which is isolated from direct internet access.

⸻

Slide 4 – Network Design

The VPC uses a /16 CIDR block and is divided into six subnets across two Availability Zones.
	•	Two public subnets host the Application Load Balancer.
	•	Two private subnets host the application servers.
	•	Two isolated private subnets host the data layer.

A NAT Gateway allows outbound internet access from private subnets without exposing them to inbound traffic.

⸻

Slide 5 – Application Load Balancer

The Application Load Balancer listens on port 80 and forwards traffic to a target group.

It performs health checks on the application instances to ensure that only healthy instances receive traffic.
This improves reliability and helps prevent downtime.

⸻

Slide 6 – Target Group & Health Checks

Here we can see that all instances are marked as healthy.

The application exposes a /health endpoint, which is used by the Load Balancer to verify instance status.
If an instance fails the health check, it is automatically removed from traffic rotation.

⸻

Slide 7 – Application in Action

Now I access the application through the Load Balancer DNS.

When refreshing the page multiple times, the Instance ID changes.
This confirms that traffic is being distributed across multiple EC2 instances, demonstrating load balancing and high availability.

⸻

Slide 8 – Security Architecture

Each tier has its own Security Group with clearly defined rules.
	•	The Load Balancer allows HTTP traffic from the internet.
	•	The Application tier only allows traffic from the Load Balancer Security Group.
	•	The Data tier only allows database port access from the Application Security Group.

This enforces the principle of least privilege and ensures no direct internet access to private tiers.

⸻

Slide 9 – End-to-End Traffic Flow

This diagram illustrates how a user request travels through the system.

A client sends a request to the Application Load Balancer.
The Load Balancer forwards the request to a healthy EC2 instance in the application tier.
The application processes the request and communicates with the data layer if needed.
The response is then returned securely back to the client.

⸻

Slide 10 – Cost & Improvements

If this architecture runs continuously outside the Free Tier, the estimated monthly cost would be approximately 100 to 120 US dollars.

I reached this estimation by considering:
	•	Five EC2 instances running 24 hours per day
	•	One Application Load Balancer
	•	One NAT Gateway
	•	Standard low traffic assumptions

The NAT Gateway represents one of the highest fixed costs in small environments, followed by the EC2 instances.

This estimation assumes no heavy scaling and low traffic usage.

For future improvements, I would consider implementing Auto Scaling to reduce compute costs during low traffic periods and optimizing network components where possible.
