# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=builder app/target/vehicle-management-*.jar app.jar
RUN chmod +x app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=test","-jar","app.jar"]