// ─────────────────────────────────────────────────
//  src/db.js — Prisma Client Singleton
//  Prevents multiple connections in development
// ─────────────────────────────────────────────────

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "error", "warn"], // logs every SQL query in dev
});

module.exports = prisma;
