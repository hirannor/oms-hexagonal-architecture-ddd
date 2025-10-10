# 🧩 OMS Frontend

**OMS Frontend** is the **Angular 20** client application for the [Order Management System (OMS)](https://github.com/hirannor/oms-hexagonal-architecture-ddd) —  
a full-stack demo project showcasing modern enterprise design using **Hexagonal Architecture**, **Domain-Driven Design (DDD)**, and **event-driven communication**.

Built as a modular **Nx monorepo**, this frontend consumes the OMS backend’s REST APIs (OpenAPI 3.0-generated clients),  
leveraging **NgRx** for state management, **PrimeNG** for UI, and **clean architecture** principles throughout.

---

## 🚀 Tech Stack

| Layer            | Technology                                             |
| ---------------- | ------------------------------------------------------ |
| Framework        | **Angular 20 (Standalone Components)**                 |
| Workspace        | **Nx Monorepo**                                        |
| State Management | **NgRx** (store, effects, actions, selectors)          |
| API Integration  | **OpenAPI Generator (TypeScript Angular client)**      |
| UI Library       | **PrimeNG 20+**                                        |
| Styling          | **SCSS + Tailwind-inspired utilities**                 |
| Auth             | **JWT-based Authentication (via OMS Backend)**         |
| Tooling          | **TypeScript**, **ESLint**, **Prettier**, **Nx Cloud** |

---

## 🧱 Core Libraries Overview

| Project / Library                                | Description                                                                                                                                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **@oms-frontend/shared**                         | Core shared utilities, interceptors, layout, guards, and reusable UI components.                                                                                                                     |
| **@oms-frontend/models**                         | Domain representation models shared across all frontend projects.                                                                                                                                    |
| **@oms-frontend/api/api-`<domain>`-data-access** | Auto-generated OpenAPI REST clients for each domain (e.g. `api-auth-data-access`, `api-order-data-access`, `api-product-data-access`).                                                               |
| **@oms-frontend/`<domain>`-data-access**         | Contains the NgRx store, effects, facade, and service layer for each bounded context. Effects use the service layer, which wraps the generated OpenAPI client and maps responses into domain models. |
| **@oms-frontend/order**                          | Feature & UI libs for order management.                                                                                                                                                              |
| **@oms-frontend/basket**                         | Feature & UI libs for basket and checkout.                                                                                                                                                           |
| **@oms-frontend/customer**                       | Feature & UI libs for customer profiles.                                                                                                                                                             |
| **@oms-frontend/product**                        | Feature & UI libs for product listing & details.                                                                                                                                                     |
| **@oms-frontend/auth**                           | Feature & UI libs for authentication and login.                                                                                                                                                      |

---

## 🧑‍💻 Development

Start the frontend app:

```bash
npx nx serve oms-app
```
