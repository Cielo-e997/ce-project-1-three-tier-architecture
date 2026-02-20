# Failover Test

To validate basic high availability behavior, a simple failover test was performed.

## Test Performed

- One application instance was stopped manually.
- The Application Load Balancer health checks detected the instance as unhealthy.
- The instance was removed from the target group automatically.
- Traffic continued to be served by the remaining healthy instances.

## Result

The application remained accessible through the Load Balancer without interruption.

This confirms that traffic distribution and basic failover behavior are functioning as expected within the current architecture.
