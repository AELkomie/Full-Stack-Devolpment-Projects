const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Seeding database...');

  const alice = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      posts: {
        create: [
          {
            title: 'Getting Started with PostgreSQL',
            content: 'PostgreSQL is a powerful open-source relational database...',
            published: true,
          },
          {
            title: 'Prisma ORM Deep Dive',
            content: 'Prisma makes database access easy with type-safety...',
            published: false,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      posts: {
        create: [
          {
            title: 'RESTful API Design Principles',
            content: 'A well-designed REST API is intuitive and consistent...',
            published: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created users: ${alice.name}, ${bob.name}`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
