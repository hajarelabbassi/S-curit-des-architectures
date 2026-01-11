# E-Commerce Microservice Platform


---

## Visual Tour

### Products – `http://localhost:4200/products`
Product catalog .

<img width="1887" height="851" alt="image" src="https://github.com/user-attachments/assets/9a41cd91-b24c-4660-8332-991f4e9ec6b8" />


### Customers – `http://localhost:4200/customers`
Customer directory .

<img width="1872" height="886" alt="image" src="https://github.com/user-attachments/assets/e2125ee4-c1fa-433e-accd-1e42a7316ca9" />

### Orders Timeline – `http://localhost:4200/orders/<customerId>`
Timeline of bills for a given customer.

<img width="1882" height="821" alt="image" src="https://github.com/user-attachments/assets/47677033-08d2-429a-b316-b6cd6f0dd4f9" />

### Order Details – `http://localhost:4200/order-details/<billId>`
Detailed bill with line items and totals.

<img width="1872" height="863" alt="image" src="https://github.com/user-attachments/assets/fd366abb-b201-40a9-b515-e8d2b05355cf" />

### Eureka Dashboard – `http://localhost:8761`
Service discovery status page.

<img width="1881" height="928" alt="image" src="https://github.com/user-attachments/assets/414e17d8-8bba-4a3d-a17f-47f6208ae263" />

### REST APIs via Gateway
- Customers – `http://localhost:8888/customer-service/api/customers`

<img width="1446" height="967" alt="image" src="https://github.com/user-attachments/assets/451832c0-8560-4280-8a2c-639d8a448e7c" />

- Inventory – `http://localhost:8888/inventory-service/api/products`

<img width="1327" height="958" alt="image" src="https://github.com/user-attachments/assets/f85b5bfe-1e3f-4998-900b-7529f7186101" />

- Billing – `http://localhost:8888/billing-service/api/bills`

<img width="1226" height="964" alt="image" src="https://github.com/user-attachments/assets/55be6d93-6ac4-4c94-a1b6-efd1e8957c71" />

---


---



## Technology Highlights

- **Spring Boot 3.x / Java 21**
- **Spring Cloud 2025.x** (Config, Netflix Eureka, Gateway, OpenFeign)
- **Maven** build + wrapper scripts for every service
- **Angular 17** with standalone components, HttpClient, Bootstrap 5
- **Responsive design** with hero sections, card grids, and status states
- **H2** in-memory databases with Spring Data REST for rapid prototyping
- **Bootstrap** Bootstrap features style web graphics
---

## Getting Started

### Prerequisites
- Java 21+
- Maven 3.9+
- Node.js 18+ & npm 10+

### Clone
```bash
git clone <repo-url>
cd micro-service-full-projet-main
```

---

## Running the Microservices

> Recommend starting a terminal per service (or use Spring Boot dashboard). Order matters: infrastructure before domain services.

1. **Discovery Service**
   ```bash
   cd micro-service/discovery-service
   ./mvnw spring-boot:run
   # http://localhost:8761
   ```
2. **Config Service**
   ```bash
   cd micro-service/config-service
   ./mvnw spring-boot:run
   ```
3. **Gateway Service**
   ```bash
   cd micro-service/gateway-service
   ./mvnw spring-boot:run
   # Gateway available on http://localhost:8888
   ```
4. **Customer Service**
   ```bash
   cd micro-service/customer-service
   ./mvnw spring-boot:run
   ```
5. **Inventory Service**
   ```bash
   cd micro-service/inventory-service
   ./mvnw spring-boot:run
   ```
6. **Billing Service**
   ```bash
   cd micro-service/billing-service
   ./mvnw spring-boot:run
   ```

All services fetch configuration from the Git-backed config repo declared in `config-service` (`micro-service/config-repo` by default).

---

## Running the Angular Frontend

```bash
cd ecom-web-app
npm install
npm run start
# Angular dev server on http://localhost:4200
```

Screens currently implemented:
- `/products` – Product catalog in responsive cards
- `/customers` – Customer directory with CTA for orders
- `/orders/:customerId` – Timeline of all bills for a given customer
- `/order-details/:billId` – Detailed bill summary with itemized totals

The UI consumes data via the Spring Cloud Gateway (`http://localhost:8888/...`) so ensure the back end is up before browsing.

---

#
