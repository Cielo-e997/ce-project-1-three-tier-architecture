# Cost Analysis

## General Perspective

This environment was built as a lab project using Free Tier eligible instances where possible. However, if this architecture were running continuously outside of the Free Tier, it would generate monthly costs.

The following is a rough estimation based on typical pricing in the eu-central-1 region. These numbers are approximate and assume low traffic.

---

## Compute (EC2 Instances)

The deployment includes:

- 3 application servers
- 1 database placeholder instance
- 1 bastion host

If each instance ran continuously for a full month (around 730 hours), and assuming a small instance type such as t3.micro, the cost per instance would likely be around 8–12 USD per month.

That would result in roughly:

5 instances × ~10 USD ≈ 50 USD per month

This is only an estimate and would vary depending on instance type and usage.

---

## Application Load Balancer

The Application Load Balancer is billed hourly and based on usage.

Even with low traffic, it typically costs around 20–30 USD per month if running continuously.

---

## NAT Gateway

The NAT Gateway is usually the most expensive component in small environments.

It is billed per hour and per amount of data processed. Even with minimal traffic, a NAT Gateway can cost roughly 30–40 USD per month if left running continuously.

---

## Estimated Monthly Total

Adding everything together, a rough monthly estimate for this environment running 24/7 would be:

Around 100–120 USD per month.

This does not include significant data transfer or scaling under heavy traffic.

---

## Cost Optimization Thoughts

For a real production setup, several improvements could reduce cost:

- Using Auto Scaling so not all instances run at all times
- Evaluating whether a NAT Gateway is necessary or if VPC endpoints could replace it
- Using Reserved Instances or Savings Plans
- Shutting down non-production environments outside business hours

For a lab project, the most important cost control strategy is stopping or terminating resources when they are not actively being used.
