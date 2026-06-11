# DecodeLabs — Project 3: Database Integration
**Stack:** Node.js · Express · PostgreSQL · Prisma ORM

---

## Project Structure

```
project3/
├── prisma/
│   ├── schema.prisma      ← Database schema (Users + Posts)
│   └── seed.js            ← Sample data seeder
├── src/
│   ├── controllers/
│   │   ├── userController.js   ← CRUD logic for Users
│   │   └── postController.js   ← CRUD logic for Posts
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js     ← Global error handling
│   ├── prismaClient.js         ← Prisma singleton
│   └── index.js                ← App entry point
├── .env.example
└── package.json
```

---

## Setup Instructions

### 1. Install PostgreSQL & create a database
```sql
CREATE DATABASE decodelabs_db;
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your DB credentials
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/decodelabs_db"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Prisma Migration (creates the tables)
```bash
npx prisma migrate dev --name init
```

### 5. Seed Sample Data (optional)
```bash
npm run db:seed
```

### 6. Start the Server
```bash
npm run dev    # development
npm start      # production
```

---

## API Endpoints

### Users
| Method | Endpoint       | Description    |
|--------|----------------|----------------|
| POST   | /api/users     | Create a user  |
| GET    | /api/users     | Get all users  |
| GET    | /api/users/:id | Get by ID      |
| PUT    | /api/users/:id | Update a user  |
| DELETE | /api/users/:id | Delete a user  |

### Posts
| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| POST   | /api/posts                  | Create a post         |
| GET    | /api/posts                  | Get all posts         |
| GET    | /api/posts?published=true   | Filter by status      |
| GET    | /api/posts/:id              | Get by ID             |
| PUT    | /api/posts/:id              | Update a post         |
| DELETE | /api/posts/:id              | Delete a post         |

---

## Database Schema

```
Users                       Posts
──────────────────          ──────────────────────────
id          PK              id          PK
name                        title
email       UNIQUE          content
createdAt                   published   default false
updatedAt                   authorId    FK → Users.id
                            createdAt
                            updatedAt
```
Relationship: One User → Many Posts (1:Many)

---

## Key Concepts Demonstrated
- Schema Design — Relational tables with primary & foreign keys
- ORM (Prisma) — Type-safe queries, no raw SQL needed
- CRUD — Mapped to RESTful HTTP methods (POST/GET/PUT/DELETE)
- Data Integrity — UNIQUE on email, NOT NULL enforced by Prisma
- Error Handling — Centralized middleware for Prisma-specific errors
- Security — Prisma uses parameterized queries by default (SQL injection safe)
