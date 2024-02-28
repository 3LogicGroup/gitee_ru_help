---
slug: /enterprise/pipeline/questions/deploy-error
---

To troubleshoot self-hosted deployment failures, you can look into the following areas:

- Visit the host group management-host management page to confirm if the host is offline. If it is offline, you can use the host reconnection script to restore online status;
Check whether the network environment of the corresponding host is normal and whether it can access the external network. If it cannot be accessed, please restore the host network.
- Check if the corresponding host is missing the software packages for host deployment, such as 'wget', 'curl', 'git', etc.
- Check if the host task concurrency is set properly;