# Tienda Spring Boot

## Descripción
Este es un proyecto de tienda en línea desarrollado con Spring Boot. Permite la gestión de productos, clientes, pedidos y pagos.

## Tecnologías utilizadas
- Java 17
- Spring Boot 3
- Spring Data JPA
- Hibernate
- MySQL

## Instalación y configuración

1. Clonar el repositorio:
   ```bash
   https://github.com/DanielCaicedo26/TrabajoSprintBoot.git
   ```

2. Configurar la base de datos en `application.properties`:
   ```properties
   spring.application.name=demo
   # URL del servidor y base de datos
   spring.datasource.url=jdbc:mysql://localhost:3306/ventaproducto
   # Usuario de la base de datos
   spring.datasource.username=root
   # Contraseña del usuario de la base de datos
   spring.datasource.password=
   # Driver MySQL
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

   spring.jpa.hibernate.ddl-auto=create
   spring.jpa.show-sql=true

   server.port=8080
   ```

## Endpoints principales

| Método | Endpoint          | Descripción            |
|---------|------------------|------------------------|
| GET     | /productos       | Listar productos      |
| POST    | /productos       | Crear producto        |
| GET     | /clientes        | Listar clientes       |
| POST    | /clientes        | Crear cliente         |
| POST    | /pedidos         | Crear pedido          |

## Contacto
Desarrollado por Daniel Caicedo Trujillo. Para consultas, envía un correo a Daniel3204155185@gmail.com


