---
title: What is Git
origin-url: https://gitee.ru/help/articles/4104
---

Git is a distributed version control system developed by Linus Torvalds to help manage the development of the Linux kernel.

Unlike commonly used version control tools like CVS and Subversion, Git adopts a distributed version control system, which eliminates the need for server-side software support (note: this depends on the type of server used, the interaction with the server is different when using protocols like HTTP or Git). This makes it extremely convenient for publishing and exchanging source code.

Just like many great events in life, Git was born in a time of great turmoil and innovation. The Linux kernel open source project has a large number of participants. Most of the Linux kernel maintenance work is spent on tedious tasks of submitting patches and maintaining archives (1991-2002). By 2002, the entire project team started using the distributed version control system BitKeeper to manage and maintain the code.

By 2005, the commercial company that developed BitKeeper ended its cooperation with the Linux kernel open source community and revoked the free usage rights of BitKeeper. This forced the Linux open source community (especially Linus Torvalds, the creator of Linux) to learn a lesson and develop their own version control system to avoid repeating the same mistakes. They formulated several goals for the new system:

 - Speed
 - Simple design
- Strong support for non-linear development mode (allowing thousands of parallel developments)
 - Fully distributed
 - Ability to efficiently manage large-scale projects like the Linux kernel (in terms of speed and data volume)

Since its birth in 2005, Git has become more mature and perfect. It is highly user-friendly while still retaining its initial goals. It is extremely fast and suitable for managing large projects. It also has an incredible non-linear branch management system that can handle various complex project development needs. Although Git was initially developed to assist in the development of the Linux kernel, we have found that it is also used in many other free software projects.