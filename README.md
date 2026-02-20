# 3-Tier Cloud Architecture Deployment on Amazon Web Services

## Project Overview

This project implements a production-style three-tier architecture on Amazon Web Services in the eu-central-1 region. The goal was to design and deploy a secure, highly available, and properly segmented infrastructure following cloud best practices.

The architecture is divided into three logical layers:

- Presentation Layer – Application Load Balancer
- Application Layer – Multiple Amazon Elastic Compute Cloud instances
- Data Layer – Isolated database placeholder instance

The infrastructure was built manually to demonstrate understanding of networking, security boundaries, high availability, and cost considerations.

---

## Architecture Summary

The environment is deployed inside a custom Virtual Private Cloud using a /16 CIDR block. The network is segmented into six subnets across two Availability Zones:

- Two public subnets for the Application Load Balancer
- Two private subnets for the application servers
- Two isolated private subnets for the data layer

An Internet Gateway enables public access to the load balancer, while a Network Address Translation Gateway allows outbound internet access from private subnets when required. Administrative access to private instances is handled through a bastion host located in a public subnet.

Three application servers are deployed across two Availability Zones to ensure high availability. A separate instance simulates the database layer and resides in an isolated subnet without public exposure.

---

## Traffic Flow and Layer Interaction

Users access the system through the public Domain Name System of the Application Load Balancer. The load balancer acts as the single entry point to the application and distributes incoming traffic across three private application servers.

Each application instance exposes a health endpoint that allows the load balancer to verify availability. If an instance becomes unhealthy, it is automatically removed from rotation.

Application servers communicate internally with the data layer using private network addresses. The database instance does not have a public IP address and is not reachable from the internet. Its security configuration allows traffic only from the application layer.

In practice:

- Internet traffic reaches only the Application Load Balancer.
- Application servers are never directly exposed.
- The data layer is accessible only from the application layer.
- Network segmentation enforces clear separation between tiers.

---

## Security Design

Security Groups were designed to follow the principle of least privilege and strict layer isolation:

- The Application Load Balancer allows inbound HTTP traffic from the internet.
- Application servers accept traffic only from the load balancer security group.
- The data layer accepts connections only from the application layer security group.
- No private instance is publicly accessible.
- Administrative access is performed exclusively through the bastion host.

This structure minimizes exposure and reduces the attack surface of the environment.

---

## High Availability

The architecture spans multiple Availability Zones to improve resilience. The Application Load Balancer distributes traffic evenly across application instances. Health checks ensure that only healthy instances receive traffic.

If one instance or Availability Zone fails, the system continues operating without direct user impact.

---

## Validation and Testing

The architecture was validated through:

- Verifying traffic distribution by refreshing the load balancer endpoint and observing different instance identifiers.
- Testing the health check endpoint to confirm instance monitoring.
- Confirming that the database port is reachable from the application layer but not exposed publicly.

These tests ensure that the separation between layers and security rules function as intended.

---

## Cost Considerations

The environment was built using Amazon Elastic Compute Cloud instances eligible for the Free Tier where possible. However, certain services such as the Network Address Translation Gateway and Application Load Balancer generate hourly charges.

A detailed monthly cost estimation and optimization strategy are provided in the COSTS.md document.

---

## Author

Cielo Escobar
