FROM gradle:8.7.0-jdk17 AS build
WORKDIR /app

COPY build.gradle settings.gradle gradlew gradle/ ./
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew
RUN ./gradlew --no-daemon build -x test || true

COPY src ./src
RUN ./gradlew --no-daemon bootJar -x test
