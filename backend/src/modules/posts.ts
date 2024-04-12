import { writeDatabase } from "./handledatabase.js";
import { getUser, getUsers } from "./users.js";
import { Post } from "./Types.js";
async function getPost(postId: string): Promise<Post | { message: string }> {
  const users = await getUsers();
  const postOwner = users.find((user) =>
    user.posts.some((post) => post.postId === postId)
  );
  if (postOwner) {
    const post = postOwner.posts.find((post) => post.postId === postId);
    if (post) {
      return post;
    }
  }
  return { message: "post not found" };
}

async function getCategory(
  category: Array<"League of Legends" | "Bloodborne" | "Palworld">
): Promise<Post[]> {
  const users = await getUsers();
  const matchingPosts: Post[] = [];
  for (const user of users) {
    for (const post of user.posts) {
      if (post.category === category) {
        matchingPosts.push(post);
      }
    }
  }
  matchingPosts.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });
  return matchingPosts;
}
async function addPost(userId: string, post: Post): Promise<Post> {
  const newPost: Post = {
    postId: crypto.randomUUID(),
    userId,
    timestamp: Date.now(),
    ...post,
  };
  const users = await getUsers();
  for (const user of users) {
    if (user.id == userId) {
      newPost.name = user.name;
      user.posts.push(newPost);
      break;
    }
  }
  await writeDatabase(users);
  return newPost;
}
async function deletePost(userId: string, postId: string): Promise<void> {
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);
  if ("posts" in users[userIndex]) {
    users[userIndex].posts = users[userIndex].posts.filter(
      (post) => post.postId !== postId
    );
    await writeDatabase(users);
    console.log("success");
  }
}

export { getPost, getCategory, addPost, deletePost };
