require('dotenv').config();
const express = require('express');
const prisma = require('./prismaClient');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🚀 DecodeLabs Project 3 - Database Integration API',
    status: 'running',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
    },
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global error handler
app.use(errorHandler);

// Start server
async function main() {
  await prisma.$connect();
  console.log('✅ Connected to PostgreSQL via Prisma');

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 API Docs:`);
    console.log(`   GET    /api/users`);
    console.log(`   POST   /api/users`);
    console.log(`   GET    /api/users/:id`);
    console.log(`   PUT    /api/users/:id`);
    console.log(`   DELETE /api/users/:id`);
    console.log(`   GET    /api/posts`);
    console.log(`   POST   /api/posts`);
    console.log(`   GET    /api/posts/:id`);
    console.log(`   PUT    /api/posts/:id`);
    console.log(`   DELETE /api/posts/:id`);
  });
}

main().catch((err) => {
  console.error('❌ Failed to start:', err);
  process.exit(1);
});
