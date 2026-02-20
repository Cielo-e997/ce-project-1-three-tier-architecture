# Security

## General Approach

Security in this project was designed around a simple idea: each layer should only talk to what it actually needs. Nothing more.

The architecture is divided into presentation, application, and data tiers, and each one has its own Security Group. This makes it easier to control traffic between layers and avoid accidental exposure.

The application and database instances are placed in private subnets and do not have public IP addresses. They cannot be reached directly from the internet.

Administrative access is done through a bastion host located in a public subnet. This acts as a controlled entry point instead of exposing Secure Shell on every instance.

---

## Security Groups

The Application Load Balancer is the only component that accepts traffic from the public internet. It allows HTTP (port 80) from anywhere (0.0.0.0/0). In a real production setup, this would typically be HTTPS only.

The application servers only allow inbound traffic from the Load Balancer Security Group on port 80. They do not accept traffic directly from the internet. Secure Shell access is allowed only from the bastion host Security Group.

The database instance allows traffic on port 3306 only from the application Security Group. This ensures that only the application layer can reach the data layer. Secure Shell is again restricted to the bastion host.

The bastion host allows Secure Shell from my public IP address. This prevents unrestricted remote access.

This structure keeps each tier isolated and enforces the principle of least privilege.

---

## Network Isolation

Public subnets contain only the Load Balancer and the bastion host.

Application servers live in private subnets and use a Network Address Translation Gateway for outbound internet access when required (for example, installing packages). They are not reachable from outside the Virtual Private Cloud.

The data layer is placed in a separate private subnet and does not have a public IP address. It is reachable only through internal networking from the application layer.

This separation reduces the attack surface and limits the impact of a potential compromise in one tier.

---

## Identity and Access Management Considerations

For this lab, access control was primarily handled through network segmentation and Security Groups.

In a production environment, the following improvements would be recommended:

- Assign dedicated IAM roles to application instances
- Avoid storing secrets directly in code
- Use AWS Systems Manager instead of Secure Shell where possible
- Enable logging and monitoring with CloudWatch

---

## Security Considerations and Improvements

A few areas could be strengthened for a production deployment:

- Replace HTTP with HTTPS using AWS Certificate Manager
- Replace the database placeholder with Amazon Relational Database Service
- Implement Auto Scaling for the application tier
- Enable VPC Flow Logs for deeper network visibility

Overall, the environment follows a layered security model, where exposure is minimized and access between components is tightly controlled.
