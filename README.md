# Simple Blog App

A minimal blog web app using Express.js and a local JSON file for storage.

## Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express.js
- Database: Local JSON file (`data/posts.json`)

## Project Structure
```
.
├── data/
│   └── posts.json
├── public/
│   ├── add.html
│   ├── index.html
│   ├── script.js
│   └── style.css
├── routes/
│   └── posts.js
├── server.js
└── package.json
```

## Setup
1. Install Node.js (v16+ recommended)
2. Install dependencies:
```bash
npm install
```
3. Run the server:
```bash
npm start
```
4. Open your browser at `http://localhost:3000`

## API
- `GET /posts` → returns all posts
- `POST /posts` → body: `{ title, content }` creates a new post
- `DELETE /posts/:id` → deletes a post by id

## Notes
- Posts are stored in `data/posts.json`
- Each post includes an `id` and `createdAt` timestamp
- Static files are served from `public/`
