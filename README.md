# Vehicle Management Application

This project combines a **Spring Boot** backend with an **Angular** portal. It uses **Docker** and **Docker Compose** for simplified deployment.

---

## 📦 Project Structure

```
- backend/          # Spring Boot application
- portal/           # Angular application
- doc/              # Documentation
- docker-compose.demo.yml
```

---
## ⚙️ Single click Running

Open docker-compose.demo.yml and run all services


## ⚙️ Building and Running

### 1️⃣ Build the Spring Boot Backend

Navigate to the `backend/` directory:

```bash
./mvnw clean package -DskipTests
```

This generates a JAR file in `backend/target/`.

---

### 2️⃣ Build the Angular Portal

Navigate to the `portal/` directory:

```bash
npm install
npm run build:prod
```

The production-ready files will be in `portal/dist/`.

---

### 3️⃣ Dockerfile Overview

- **Backend Dockerfile** (`backend/Dockerfile`):

- **Portal Dockerfile** (`portal/Dockerfile`):

✅ Make sure to include a `nginx.conf` file in the `portal/` directory for proper routing support in your Angular app.

---

### 4️⃣ Docker Compose Configuration

The `docker-compose.demo.yml` file orchestrates backend, portal and database:

---

### 5️⃣ Run Everything with Docker Compose

From the project root:

```bash
docker-compose -f docker-compose.demo.yml up -d --build --force-recreate
```

This will:
✅ Build backend and portal images
✅ Run database on [jdbc:postgresql://db:5432/vehicle-db](jdbc:postgresql://db:5432/vehicle-db)
✅ Run backend on [http://localhost:8080](http://localhost:8080)  
✅ Run portal on [http://localhost:3000](http://localhost:3000)

---

## 🚀 Access

- **Backend**: [http://localhost:8080](http://localhost:8080)
- **API description**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **Portal**: [http://localhost:3000](http://localhost:3000)

---

### 📝 Additional Notes

- If you need to update the backend or portal, rebuild their respective images by running:
  ```bash
  docker-compose build backend
  docker-compose build portal
  ```
  Then restart:
  ```bash
  docker-compose up
  ```

- Update `nginx.conf` in the `portal/` directory as needed for SPA (single-page application) routing.

`nginx.conf` is for fly.io deployment
`nginx.demo.conf` is for docker-compose deployment

- If you switch to a different parent POM in the backend, remember to adjust the `<license>` and `<developers>` elements in `pom.xml` if needed.

- For local development without Docker, you can:
    - Run the backend:
      ```bash
      ./mvnw spring-boot:run
      ```
    - Serve the Angular portal:
      ```bash
      npm start
      ```
  And they’ll be accessible at their respective ports.

---

Enjoy building your app! 🚀

### Reference Documentation

For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.4.5/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.4.5/maven-plugin/build-image.html)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/3.4.5/reference/actuator/index.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.4.5/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Rest Repositories](https://docs.spring.io/spring-boot/3.4.5/how-to/data-access.html#howto.data-access.exposing-spring-data-repositories-as-rest)
* [Flyway Migration](https://docs.spring.io/spring-boot/3.4.5/how-to/data-initialization.html#howto.data-initialization.migration-tool.flyway)
* [Spring Security](https://docs.spring.io/spring-boot/3.4.5/reference/web/spring-security.html)
* [Spring Web](https://docs.spring.io/spring-boot/3.4.5/reference/web/servlet.html)

### Guides

The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
* [Accessing Neo4j Data with REST](https://spring.io/guides/gs/accessing-neo4j-data-rest/)
* [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the
parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

