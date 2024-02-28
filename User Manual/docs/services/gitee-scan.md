---
title: GiteeScan
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4294
---

GiteeScan is a brand new code quality analysis tool provided by Gitee. It scans the repository code from both code defects and code conventions, checks for vulnerabilities, and safeguards code quality improvement.

Section 1: Global Settings

In Gitee, users can initiate code quality analysis in two ways:

1. Enter the specified repository and select the repository branch to initiate a full scan.
2. Enable automatic code scanning for incremental changes when creating a new Pull Request.

In the enterprise view, administrators can go to 'Management - Extension Applications' and find the 'GiteeScan' item, which is enabled by default.

﻿﻿![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162627_6d48da5b_5370906.png )

Once the feature is enabled, it means that users can initiate full scans of any repository branch and incremental scans of newly created Pull Requests within the enterprise.

Section 2: Initiating Scan

### 2.1 Full Scan

1. First, make sure that the switch for full scan is turned on in GiteeScan.

![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162640_c4817fdd_5370906.png )

2. Then go to the repository page you want to scan and select [Service-GiteeScan]:

﻿﻿![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162651_0dd481c9_5370906.png )

3. Select New scan on the GiteeScan page:

![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162920_692207b5_5370906.png )

4. Fill in the corresponding content and initiate a full scan:

![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162933_a7a9808c_5370906.png )
﻿﻿
5. After scanning, click on the "View" option in the list to view the scan report.

![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162946_3c15c02d_5370906.png )
﻿﻿
![Image Description](https://images.gitee.ru/uploads/images/2020/0316/162952_af1db618_5370906.png )

### 2.2 Incremental Scanning

1. First, make sure that the switch for incremental scan is turned on in GiteeScan.

![Image Description](https://images.gitee.ru/uploads/images/2020/0316/163039_2dfa083f_5370906.png )

2. After creating a Pull Request, go to the corresponding Pull Request to view the scan report.

﻿﻿![Image Description](https://images.gitee.ru/uploads/images/2020/0316/163030_c1ca6e7d_5370906.png )

To view the specific rules for defect scanning and specification scanning, please go to [Gitee Scan Scanning Rule Set](https://gitee.ru/oschina/gitee-scan-rules.git)