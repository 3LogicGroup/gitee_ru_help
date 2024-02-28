---
title: What is Git
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4104
---

Git is a distributed version control system developed by Linus Torvalds to help manage Linux kernel development.

Unlike commonly used version control tools like CVS, Subversion, etc., Git adopts a distributed version control system, which does not require server-side software support (note: this depends on the type of server used, there are differences when using http protocol or git protocol, and there is still interaction with the server when pushing and pulling). This makes the release and exchange of source code extremely convenient. Git is very fast, which is important for large projects like the Linux kernel. Git's most impressive feature is its merge tracing capability.

Like many great events in life, Git was born in a time of great innovation and controversy. The Linux kernel open source project has a large number of participants. The majority of Linux kernel maintenance work was spent on the tedious tasks of submitting patches and archiving (1991-2002). By 2002, the entire project team began using the distributed version control system BitKeeper to manage and maintain the code.

By 2005, the commercial company developing BitKeeper ended its cooperation with the Linux kernel open-source community and revoked the rights to use BitKeeper for free. This forced the Linux open-source community (especially Linux creator Linus Torvalds) to learn a lesson and develop their own version control system to avoid repeating the same mistake. They set several goals for the new system.

- Speed
- Simple Design
- Strong support for non-linear development mode (allowing thousands of parallel branches)
- Fully Distributed
- Ability to efficiently manage super large-scale projects like the Linux kernel (in terms of speed and data volume)

Since its birth in 2005, Git has become more and more mature and perfect. It is highly user-friendly while still maintaining its initial goals. It is extremely fast and suitable for managing large projects. It also has an incredible non-linear branch management system that can handle various complex project development requirements. Although Git was initially developed to assist in the development of the Linux kernel, we have found that it is also used in many other free software projects.