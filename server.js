const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const postsFilePath = path.join(dataDir, 'posts.json');

// Ensure data directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(postsFilePath)) {
    fs.writeFileSync(postsFilePath, JSON.stringify([] , null, 2));
  }
}

ensureDataFile();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

// Routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter(postsFilePath));

// Fallback to index.html for root
app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


