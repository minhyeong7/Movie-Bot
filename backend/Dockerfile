# 1. Build stage
FROM gradle:8.7.0-jdk17 AS build
WORKDIR /app
COPY . .

RUN sed -i 's/\r$//' gradlew && chmod +x gradlew
RUN ./gradlew --no-daemon clean bootJar -x test

# 2. Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75"

EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT} $JAVA_OPTS -jar app.jar"]
