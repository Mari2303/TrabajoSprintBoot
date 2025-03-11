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
   git clone https://github.com/tu_usuario/tienda-springboot.git
   cd tienda-springboot
   ```

2. Configurar la base de datos en `application.properties`:
   ```properties
spring.application.name=demo
#url del servidor y base datos
#spring.datasource.url=jdbc:mysql://direcciónip:puerto/DBName
spring.datasource.url=jdbc:mysql://localhost:3306/ventaproducto
#user DB manager
spring.datasource.username=root
#password user db manager
spring.datasource.password=
#driver mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true

server.port=8080 spring.datasource.url=jdbc:mysql://localhost:3306/tienda
   spring.datasource.username=root
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update
   ````



## Endpoints principales





## Contacto
Desarrollado por Daniel Caicedo Trujill. Para consultas, envía un correo a Daniel3204155185@gmail.com

