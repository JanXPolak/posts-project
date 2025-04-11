export function getRandomNum(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// ------------------------------------------------------------------------

export function getPostsFromGivenCategory(postData, category) {
  const arr = [];
  for (let i = 0; i < postData.length; i++) {
    const post = postData[i];
    if (post.category === category) {
      arr.push(post);
    }
  }
  return arr;
}

// ------------------------------------------------------------------------
