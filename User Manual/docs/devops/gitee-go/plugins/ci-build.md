---
title: Cloud compilation plugin
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/ci-build
origin-url: 
---
## 1. Maven Build

- Supported Versions
  - Maven: 2.2.1, 3.2.5, 3.3.9, 3.5.2, 3.5.3, 3.5.4, 3.6.1, 3.6.3
  Eight versions
  - JDK: 6, 7, 8, 9, 10, 11, 13, 17 eight versions
- Base image
  - CentOS Linux release 8.3.2011
  - Built-in Ali Source Maven Repository
- Field description
  - Visual configuration
      ![Maven Build](https://images.gitee.ru/uploads/images/2021/1223/110651_ed109977_5192864.png )
        ```yaml
        - step: build@maven
          name: build_maven
          displayName: Maven Build
          # Support versions 6, 7, 8, 9, 10, 11
          jdkVersion: 8
Eight versions supported: 2.2.1, 3.2.5, 3.3.9, 3.5.2, 3.5.3, 3.5.4, 3.6.1, 3.6.3
          mavenVersion: 3.3.9
          # Build command
          commands:
            - mvn -B clean package -Dmaven.test.skip=true
# Optional field. When enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days
          artifacts:
Build artifact name, used as a unique identifier for the artifact and can be passed down, supports customization, default is BUILD_ARTIFACT. In downstream, you can refer to the artifact address using ${BUILD_ARTIFACT}.
            - name: BUILD_ARTIFACT
Path to obtain the build artifacts, which refers to the location of the built artifacts after the code is compiled, such as jar files in the target directory. The current directory is the root directory of the code repository.
              path:
                - ./target
        ```

## 2. Gradle Build

- Supported Versions
- Gradle: Supports four versions - 4.1, 4.2, 4.3, and 4.4
  - JDK: 6, 7, 8, 9, 10, 11, 13, 17 eight versions
- Base image
  - CentOS Linux release 8.3.2011
  - Built-in Ali Source Maven Repository
- Field description
  - Visual configuration
![Gradle Build](https://images.gitee.ru/uploads/images/2021/1223/111207_480ff9f9_5192864.png)

```yaml
- step: build@gradle
    name: build_gradle
    displayName: Gradle Build
    jdkVersion: 8
    gradleVersion: 4.4
    # Build Command
    commands:
    - chmod +x ./gradlew
    - ./gradlew build
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # The artifact retrieval path refers to the location of the build artifact after the code is compiled, such as the jar package usually located in the target directory. The current directory is the root directory of the code repository
        path:
        - ./build
```

3. Ant build

- Supported Versions
- Ant: Supports versions 1.6.5, 1.7.1, 1.8.4, 1.9.16, 1.10.9, 1.10.11
  Six versions
  - JDK: 6, 7, 8, 9, 10, 11 six versions
- Base image
  - CentOS Linux release 8.3.2011
- Field description
  - Visual configuration
![Ant Build](https://images.gitee.ru/uploads/images/2021/1223/111310_a781a8e5_5192864.png)

```yaml
- step: build@ant
    name: build_ant
    displayName: Ant build
    jdkVersion: 8
    antVersion: 1.9.16
    # Build Command
    commands:
    - ant
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # The artifact retrieval path refers to the location of the build artifact after the code is compiled, such as the jar package usually located in the target directory. The current directory is the root directory of the code repository
        path:
        - ./build
```

## 4. Golang Build

- Supported Versions
  - Golang：1.8、1.10、1.11、1.12、1.13、1.14、1.15、1.16
- Base image
  - CentOS Linux release 8.3.2011
- Field description
  - Visual configuration
    ![Golang Build](https://images.gitee.ru/uploads/images/2021/1223/111340_cb49be89_5192864.png )

```yaml
- step: build@golang
    name: build_golang
    displayName: Golang Build
    golangVersion: 1.12
    # Build Command
    commands: |
        mkdir output
        GOOS=linux GOARCH=amd64 go build -o output/main.amd64 main.go
        GOOS=linux GOARCH=386 go build -o output/main.linux32 main.go
        GOOS=windows GOARCH=amd64 go build -o output/main.win64.exe main.go
        GOOS=windows GOARCH=386 go build -o output/main.win32.exe main.go
        GOOS=darwin GOARCH=amd64 go build -o output/main.darwin main.go 
        chmod +X output/main.linux32
        ./output/main.linux32
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # Build artifact retrieval path, which refers to the location of the build artifact after the code is compiled
        path:
        - ./output
```

## 5. Node.js Build

- Supported Versions
  - Node.js：8.16.2, 10.17.0, 12.16.1, 14.16.0, 15.12.0
- Base image
  - Based on CentOS 7.6, including git, wget, Python3, and other common tools
- Field description
  - Visual configuration
    ![Node.js](https://images.gitee.ru/uploads/images/2021/1223/111529_996855b3_5192864.png )

```yaml
- step: build@nodejs
    name: build_nodejs
    displayName: NodeJs Build
    nodeVersion: 14.16.0
- **Build Command**: Install dependencies -> Clear remnants of the previous build -> Execute the build [Please fill in according to the actual output of the project].
    commands:
    - npm install && rm -rf ./dist && npm run build
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # Build artifact retrieval path, which refers to the location of the build artifact after the code is compiled
        path:
        - ./dist
```

- Attention
  - Replace the build command and packaging directory according to the project being packaged
- If other build tools such as yarn, pnpm, etc. are used in the project, please install them globally before installing dependencies. If using yarn, add 'npm i -g yarn' before 'npm install' as shown in the following figure:
![Node.js Attention](https://images.gitee.ru/uploads/images/2021/1223/111841_3e39ff71_5192864.png)

## 6. PHP Construction

- Supported Versions
  - PHP: Supports 5.6, 7.0, 7.1, 7.2, 7.3, 7.4, 8.0, 8.1 eight versions.
- Base image
  - CentOS Linux release 8.3.2011
- Field description
  - Visual configuration
![PHP Build](https://images.gitee.ru/uploads/images/2021/1223/112044_dcbd267d_5192864.png)

```yaml
- step: build@php
    name: build_php
    displayName: PHP Build
    phpVersion: 8.0
    # Build Command
    commands:
    - php --version
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # Build artifact retrieval path, which refers to the location of the build artifact after the code is compiled
        path:
        - ./
```

## 7. Python Build

- Supported Versions
Python: Supports 2.7, 3.6, 3.7, 3.8, and 3.9 versions
- Base image
  - CentOS Linux release 8.3.2011
- Field description
  - Visual configuration
![Python Build](https://images.gitee.ru/uploads/images/2021/1223/111952_dd85e88a_5192864.png)

```yaml
- step: build@python
    name: build_python
    displayName: Python Build
    pythonVersion: 3.9
    # Build Command
    commands: 
    - python3 -m pip install --upgrade pip
    - pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    - pip3 install -r requirements.txt
    - python3 ./main.py
# Optional field. If enabled, it means that the build artifacts will be temporarily stored but not uploaded to the artifact repository. They will be automatically cleared after 7 days.
    artifacts:
The name of the artifact, which serves as a unique identifier for the artifact and can be passed down. It can be customized and defaults to BUILD_ARTIFACT. In downstream, it can be referenced by ${BUILD_ARTIFACT} to obtain the artifact's address.
    - name: BUILD_ARTIFACT
        # Build artifact retrieval path, which refers to the location of the build artifact after the code is compiled
        path:
        - ./
```

## 9. GCC Build

- Supported Versions
- GCC: Supports six versions - 4.8, 5.5, 6.5, 8.4, 9.4, 10.3
- Base image
- Based on Ubuntu 20.04, including git, wget, zip, unzip, p7zip, jq
- Field description
  - Visual configuration
    ![Image Description](https://images.gitee.ru/uploads/images/2022/0518/114438_59f3cc2e_10531940.png )

```yaml
steps:
    - step: build@gcc
    name: build_gcc
    displayName: GCC Build
    gccVersion: 4.8.5
    commands:
        - gcc -V
    artifacts:
        - name: BUILD_ARTIFACT
        path:
            - ./target
    ```