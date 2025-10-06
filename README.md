# 🧩 Order Management System (OMS)

| CI Status | License |
|------------|----------|
| [![CI](https://github.com/hirannor/oms-hexagonal-architecture-ddd/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hirannor/oms-hexagonal-architecture-ddd/actions/workflows/ci.yml) | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Commons Clause](https://img.shields.io/badge/Commons-Clause-red.svg)](https://commonsclause.com/) |

---

## 🧭 Overview

The **Order Management System (OMS)** is a **full-stack demo project** that showcases  
modern enterprise application design using **Hexagonal Architecture**, **Domain-Driven Design (DDD)**,  
and **event-driven communication** between bounded contexts.

### Tech Highlights
- **Backend:** Spring Boot 3 · Java 21 · Hexagonal Architecture · DDD · RabbitMQ · PostgreSQL
- **Frontend:** Angular 20 (Nx Monorepo + NgRx) · PrimeNG · TypeScript
- **API Contract:** Centralized [OpenAPI 3.0.3](openapi/) definitions shared between backend & frontend

> 📘 For in-depth domain and backend design details, see [oms-backend/README.md](oms-backend/README.md).

---

## ⚙️ Architecture Overview

### Backend — Hexagonal (Ports & Adapters)

| Layer | Responsibility |
|:------|:----------------|
| **Domain** | Core business logic, aggregates, and domain events. |
| **Application** | Use-case orchestration and coordination between domain and adapters. |
| **Adapters** | Persistence, messaging, web, and external system integrations. |

The architecture enforces clear separation through **ArchUnit** tests and follows a strict dependency flow:


### Frontend — Nx Modular Architecture
The Angular workspace mirrors backend boundaries:
- `libs/feature-*` → domain-aligned feature modules
- `libs/api/*-data-access` → generated TypeScript clients from OpenAPI
- `libs/shared-*` → reusable UI & utility modules

---

## 🧩 Domain Model

| Aggregate | Responsibility |
|------------|----------------|
| **Customer** | Represents a system user; handles registration, authentication, and profile management. |
| **Order** | Full order lifecycle (creation → payment → shipment → delivery → refund); emits events like `OrderCreated`, `OrderPaid`. |
| **Basket** | Shopping cart per customer; add/remove products and initiate checkout. |
| **Product** | Catalog item with immutable attributes (id, name, price, currency). |
| **Inventory** | Tracks stock; supports `reserve`, `release`, `deduct`; prevents overselling. |
| **Payment** | Lifecycle via Stripe (`INITIALIZED → SUCCEEDED/FAILED/CANCELED`); emits events like `PaymentSucceeded`. |

All aggregates emit **domain events**, which are persisted and published asynchronously for eventual consistency.

---

## 📡 Messaging & Event Flow

The backend leverages an **Outbox Pattern + RabbitMQ** setup for guaranteed, reliable delivery:

1. Domain events are persisted in the **Outbox** table (same transaction).
2. A scheduled job publishes events from Outbox → RabbitMQ exchange.
3. Rabbit listeners consume messages and re-emit them as in-app events.

This ensures **exactly-once semantics** and stable inter-module communication.

---

## 🌐 Frontend (Angular + Nx + NgRx)

### Key Concepts
- Modular feature libraries for each domain (`auth`, `basket`, `order`, `product`, etc.)
- Typed REST clients generated from `/openapi` using:
  ```bash
  npm run generate:apis
