---
title: GiteeAndroidBuildOnline (APK Online Build)
authors:
  - name: likui
    url: https://gitee.ru/nocnob
origin-url: https://gitee.ru/help/articles/4249
---

Android build environment

- Ubuntu 20.04
- Android NDK r19c
- Gradle 6.9.1 (used when no version is specified)
- Kotlin version 1.3.31
- OpenJDK version 8/11/17, default 8

## Steps to Use

1. Management -> Basic Info -> Language: `Android`:
    ![](./assets/apk-1.png)
1. Repository Homepage -> Download APK:
    ![](./assets/apk-2.png)
1. Create a build, select the build version, Java version, and fill in the build type:
    ![](./assets/apk-3.png)
1. Build process:
    ![](./assets/apk-4.png)
1. Build completed:
    ![](./assets/apk-5.png)

## Android Project Build Example

Take [gitee-sample/android-kotlin](https://gitee.ru/gitee-sample/android-kotlin/tree/openjdk-11) as an example.

### Directory Structure

Standard Android project directory structure is recommended, such as:

```text
.
├── app
│   ├── build.gradle
│   └── src
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│ └── gradle-wrapper.properties  # Optional
├── gradle.properties
├── gradlew                            # Required
├── gradlew.bat
└── settings.gradle
```

- When the 'gradle/wrapper/gradle-wrapper.properties' file exists, Gitee will read and modify the file.
* `gradlew` is required and must have executable permissions, it will be executed during the build.

### Build process:

1. Check if it is a standard gradle project
1. Modify the `distributionUrl` property in `gradle/wrapper/gradle-wrapper.properties` to speed up the gradle download, for example:

    ```diff
    -distributionUrl=https\://services.gradle.org/distributions/gradle-7.3.3-bin.zip
    +distributionUrl=file:///data/android/gradle-zip/gradle-7.3.3-bin.zip
    ```

1. (Optional) Handle Signature Configuration
1. Execute 'gradlew'. To speed up the build process, the internal Maven mirror 'maven.local' on Gitee will be used.
1. (Optional) Signing
1. After a successful build, upload the apk. Any newly created `*.apk` file in the directory will be uploaded.

## About Signatures

> Android systems require that all APKs be signed with a certificate before they can be installed on a device or updated.

To protect the application signing key and keystore, it is not recommended to put the related information in the Git repository. However, missing the related content will cause errors in APK packaging or the generated APK file cannot be directly installed on the Android system. To address this, Gitee provides an optional feature: preserving the signing configuration.

### Select "Keep Signature Configuration"

Gitee will not modify the configuration file.

If there are signature-related configuration items in the configuration file, but the signature-related files cannot be accessed, the build will fail.

### Uncheck "Keep Signature Configuration"

When 'Keep Signature Configuration' is **not** selected, Gitee will perform the following operations:

1. Delete the signature-related configuration in `build.gradle` file, represented by shell script as follows:

```bash
readarray -d '' bfs < <(find apk-repo/ -type f -name "build.gradle" -print0)
for bf in ${bfs[@]}
do
sed -i \
    -e "/keyAlias\s/d" \
    -e "/keyPassword\s/d" \
    -e "/storeFile\s/d" \
    -e "/storePassword\s/d" \
    -e "/signingConfig\ssigningConfigs/d" \
    ${bf}
done
```

2. Generate a random keystore using the command tool keytool.
3. Sign the apk file using the apksigner command-line tool