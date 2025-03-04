FROM maven:3.9.9-amazoncorretto-21-debian-bookworm AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Usar la imagen de Amazon Corretto 21 para la etapa de ejecución
FROM amazoncorretto:21-alpine
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/target/DH_project-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]