---
title: Плагин тестового класса
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/unit-test
origin-url: 
---

Gitee Go предоставляет готовые возможности модульного тестирования для основных языков, что упрощает модульное тестирование кода.

Gitee Go в настоящее время поддерживает модульное тестирование для следующих языков.: 

Java Maven

Java Gradle

Использование:
При создании или редактировании конвейера, выбор группы плагинов тестового класса позволяет вам просмотреть шаблоны плагинов тестового класса, которые в настоящее время поддерживаются Gitee Go. Нажмите «Настроить», чтобы быстро использовать возможности модульного тестирования.
![Описание изображения](https://images.gitee.ru/uploads/images/2022/0518/112712_e3b4f82a_10531940.png )

### 1. Модульный тест Maven

- Поддерживаемые версии
  - Maven: 2.2.1, 3.2.5, 3.3.9, 3.5.2, 3.5.3, 3.5.4, 3.6.1, 3.6.3
  Восемь версий
  - JDK: 6, 7, 8, 9, 10, 11, 13, 17 - итого восемь версий
- Базовое изображение
  - CentOS Linux версия 8.3.2011
  - Встроенный репозиторий Ali Source Maven.
- Описание поля
  - Визуальная конфигурация
![Maven](https://images.gitee.ru/uploads/images/2022/0518/104702_759ab8d1_10531940.png )

- yml

```yaml
 stages:
  - name: stage-2b2e07612
displayName: Unit Test
    strategy: naturally
    trigger: auto
    executor: []
    steps:
      - step: ut@maven
        name: unit_test_maven
displayName: Maven Unit Test
        jdkVersion: '8'
        mavenVersion: 3.3.9
        commands:
          - '# Maven test default command'
          - mvn -B test -Dmaven.test.failure.ignore=true
          - mvn surefire-report:report-only
          - mvn site -DgenerateReports=false
          - '# Maven test Jacoco command'
          - '# When using Jacoco to calculate coverage, please change the test report directory to ./target/site/jacoco'
          - '# mvn clean test'
          - Maven test Cobertura command
          - '# When using Cobertura to calculate coverage, please change the test report directory to ./target/site/cobertura'
          - '# mvn cobertura:cobertura'
        report:
          path: ./target/site
          index: surefire-report.html
        settings: []
```

### 2. Модульное тестирование Gradle

- Поддерживаемые версии
- Gradle: Поддерживает четыре версии - 4.1, 4.2, 4.3, и 4.4
  - JDK: 6, 7, 8, 9, 10, 11, 13, 17 восемь версий
- Базовое изображение
  - CentOS Linux версия 8.3.2011
  - Встроенный репозиторий Ali Source Maven.
- Описание поля
  - Визуальная конфигурация
![Gradle](https://images.gitee.ru/uploads/images/2022/0518/111925_a27eba13_10531940.png )
- yml

```yaml
stages:
  - name: stage-2b2e07612
displayName: Unit Test
    strategy: naturally
    trigger: auto
    executor: []
    steps:
      - step: ut@gradle
        name: unit_test_gradle
displayName: Gradle unit test
        jdkVersion: '8'
        gradleVersion: '4.4'
        commands:
          - '# Gradle test default command'
          - ./gradlew test
        report:
          path: build/reports/tests/test
          index: index.html