const prisma = require('../prismaClient');

// CREATE - POST /api/users
async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'name and email are required.' });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// READ ALL - GET /api/users
async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      include: { posts: { select: { id: true, title: true, published: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
}

// READ ONE - GET /api/users/:id
async function getUserById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// UPDATE - PUT /api/users/:id
async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// DELETE - DELETE /api/users/:id
async function deleteUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    await prisma.user.delete({ where: { id } });

    res.json({ success: true, message: `User ${id} deleted successfully.` });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
