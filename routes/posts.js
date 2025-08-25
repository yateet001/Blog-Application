const express = require('express');
const fs = require('fs');

function readPosts(postsFilePath) {
  try {
    const raw = fs.readFileSync(postsFilePath, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (_e) {
    return [];
  }
}

function writePosts(postsFilePath, posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

module.exports = function(postsFilePath) {
  const router = express.Router();

  // GET /posts -> list all posts
  router.get('/', (_req, res) => {
    const posts = readPosts(postsFilePath);
    res.json(posts);
  });

  // POST /posts -> create new post
  router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const posts = readPosts(postsFilePath);
    const newPost = {
      id: Date.now().toString(),
      title: String(title).trim(),
      content: String(content).trim(),
      createdAt: new Date().toISOString()
    };
    posts.unshift(newPost);
    writePosts(postsFilePath, posts);
    res.status(201).json(newPost);
  });

  // DELETE /posts/:id -> delete a post
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const posts = readPosts(postsFilePath);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const [removed] = posts.splice(index, 1);
    writePosts(postsFilePath, posts);
    res.json({ success: true, removed });
  });

  return router;
};


