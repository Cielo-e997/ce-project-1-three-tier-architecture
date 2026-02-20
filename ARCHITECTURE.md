# Architecture

## Overview

This project deploys a three-tier architecture on Amazon Web Services in the eu-central-1 region. The goal is to separate responsibilities across layers, enforce network isolation, and achieve high availability across multiple Availability Zones.

The three layers are:

- **Presentation Layer:** Application Load Balancer (internet-facing)
- **Application Layer:** Amazon Elastic Compute Cloud instances in private subnets
- **Data Layer:** Isolated Amazon Elastic Compute Cloud instance used as a database placeholder

---

## Network Design

### Virtual Private Cloud and Addressing

A dedicated Virtual Private Cloud was created using a /16 CIDR block. A /16 provides enough room for growth and keeps subnet planning flexible without being overly complex.

### Subnet Segmentation (6 subnets across 2 Availability Zones)

The Virtual Private Cloud is segmented into six subnets across two Availability Zones:

- **Public subnets (2):** used for the Application Load Balancer and the bastion host
- **Private application subnets (2):** used for the application servers (no public IP addresses)
- **Private data subnets (2):** used for the data layer (isolated, no direct internet routing)

This separation enforces clear boundaries between tiers and allows independent routing and security controls per layer.

### Internet Gateway and Public Routing

An Internet Gateway is attached to the Virtual Private Cloud to allow inbound and outbound internet connectivity for resources in public subnets. Public subnets route 0.0.0.0/0 traffic to the Internet Gateway.

### Network Address Translation Gateway for Private Subnets

A Network Address Translation Gateway enables outbound internet access for instances in private subnets (for example, to install packages or download updates) while keeping them unreachable from the public internet.

**Trade-off:** A Network Address Translation Gateway increases cost, but it keeps private instances private and aligns with production best practices.

---

## Compute Layer Design

### Bastion Host

A bastion host was deployed in a public subnet to provide a controlled administrative entry point. Private instances remain inaccessible from the internet, and Secure Shell access is performed only through the bastion.

**Reasoning:** This reduces the attack surface and avoids exposing Secure Shell directly on private instances.

### Application Servers

Three application servers are deployed in private subnets across two Availability Zones. Each instance runs a lightweight Node.js web application that displays:

- Instance identifier
- Availability Zone
- Database connectivity status (simulated)
- Health endpoint at `/health`

---

## Load Balancing and Health Checks

An Application Load Balancer is deployed across two public subnets (two Availability Zones). It listens on Hypertext Transfer Protocol port 80 and forwards traffic to the application target group.

The target group is configured with a health check path of `/health`. If an instance fails health checks, it is removed from rotation automatically.

This provides:

- A single stable entry point (load balancer Domain Name System)
- Distribution of traffic across multiple instances
- Automatic handling of unhealthy targets

---

## Data Layer Design

The data layer is implemented as an isolated Amazon Elastic Compute Cloud instance in a private data subnet without a public IP address. It is reachable only via the internal network and only from the application layer security group.

For validation purposes, a listener on the database port was used to confirm controlled connectivity from the application layer.

**Reasoning:** The data layer should never be directly reachable from the internet, and access should be restricted to only the tier that needs it.

---

## Availability and Resilience

The architecture spans multiple Availability Zones. The Application Load Balancer and the application servers are distributed across Availability Zones to avoid a single-zone dependency.

If an application instance becomes unhealthy, the load balancer stops sending traffic to it. This improves resilience and supports a basic failover model.

---

## Design Decisions and Trade-offs

- **Multi-AZ deployment:** improves availability, slightly increases complexity
- **Private subnets for application and data tiers:** improves security, requires a Network Address Translation Gateway for outbound access
- **Bastion host:** improves administrative security, requires careful access control
- **Database placeholder instead of managed database:** faster to implement for the lab, but a managed database service would be preferred for production

---

## Production Improvements (High Level)

For a production deployment, the next steps would typically include:

- Auto Scaling Group for the application tier
- Hypertext Transfer Protocol Secure using a certificate from AWS Certificate Manager
- Managed database service such as Amazon Relational Database Service (with Multi-AZ)
- Centralized logging and monitoring (Amazon CloudWatch, alarms, dashboards)
- Infrastructure as Code (Terraform or AWS CloudFormation)
