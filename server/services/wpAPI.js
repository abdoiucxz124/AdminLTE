import fetch from 'node-fetch';

function authHeader(site) {
  const token = Buffer.from(`${site.username}:${site.password}`).toString('base64');
  return { 'Authorization': `Basic ${token}` };
}

export async function getPosts(site) {
  const res = await fetch(`${site.url}/wp-json/wp/v2/posts`, {
    headers: authHeader(site),
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPlugins(site) {
  const res = await fetch(`${site.url}/wp-json/wp/v2/plugins`, {
    headers: authHeader(site),
  });
  if (!res.ok) throw new Error('Failed to fetch plugins');
  return res.json();
}

export async function updatePlugin(site, plugin) {
  const res = await fetch(`${site.url}/wp-json/wp/v2/plugins/${plugin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(site),
    },
    body: JSON.stringify({ status: 'update' }),
  });
  if (!res.ok) throw new Error('Failed to update plugin');
  return res.json();
}
