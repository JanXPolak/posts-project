import {API_URL} from './constants.js'

// ------------------------------------------------------------------------

export async function getPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// ------------------------------------------------------------------------

export async function addPostToDatabase(
  title,
  description,
  author,
  category,
  views,
  likes
) {
  const request = new Request(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      author: author,
      category: category,
      views: Number(views),
      likes: Number(likes),
    }),
  });
  return fetch(request);
}

// ------------------------------------------------------------------------

export async function deletePostFromDatabase(id) {
  const request = new Request(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return fetch(request);
}

// ------------------------------------------------------------------------

export async function editPostInDatabase(id, title, description) {
  const request = new Request(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, description: description }),
  });
  return fetch(request);
}

// ------------------------------------------------------------------------
