const prisma = require('../prismaClient');

// CREATE - POST /api/posts
async function createPost(req, res, next) {
  try {
    const { title, content, published = false, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ success: false, message: 'title, content, and authorId are required.' });
    }

    const post = await prisma.post.create({
      data: { title, content, published, authorId: parseInt(authorId) },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
}

// READ ALL - GET /api/posts
async function getAllPosts(req, res, next) {
  try {
    const { published } = req.query;

    const where = published !== undefined ? { published: published === 'true' } : {};

    const posts = await prisma.post.findMany({
      where,
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
}

// READ ONE - GET /api/posts/:id
async function getPostById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
}

// UPDATE - PUT /api/posts/:id
async function updatePost(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: { title, content, published },
      include: { author: { select: { id: true, name: true } } },
    });

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
}

// DELETE - DELETE /api/posts/:id
async function deletePost(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    await prisma.post.delete({ where: { id } });

    res.json({ success: true, message: `Post ${id} deleted successfully.` });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
