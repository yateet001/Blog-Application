async function fetchPosts() {
  const container = document.getElementById('posts');
  if (!container) return;
  container.innerHTML = '<div class="card">Loading posts...</div>';
  try {
    const res = await fetch('/posts');
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<div class="card">No posts yet. Be the first to add one!</div>';
      return;
    }
    container.innerHTML = posts.map(p => renderPost(p)).join('');
  } catch (e) {
    container.innerHTML = '<div class="card">Failed to load posts.</div>';
  }
}

function renderPost(post) {
  const date = post.createdAt ? new Date(post.createdAt) : null;
  const dateStr = date ? date.toLocaleString() : '';
  return `
    <article class="card">
      <h2 class="post-title">${escapeHtml(post.title)}</h2>
      ${dateStr ? `<div class="meta">Created: ${dateStr}</div>` : ''}
      <div class="content">${escapeHtml(post.content)}</div>
      <div class="post-actions">
        <button onclick="deletePost('${post.id}')">Delete</button>
      </div>
    </article>
  `;
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  try {
    const res = await fetch(`/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    fetchPosts();
  } catch (e) {
    alert('Error deleting post');
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

fetchPosts();


