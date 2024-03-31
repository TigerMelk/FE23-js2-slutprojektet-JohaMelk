import { writeDatabase } from "./handledatabase.js";
import { getUser, getUsers } from "./users.js";
import { Post } from "./Types.js";
async function getPost(
  userId: string,
  postId: string
): Promise<Post | { message: string }> {
  const user = await getUser(userId);
  if ("posts" in user) {
    for (const post of user.posts) {
      if (post.postId === postId) {
        return post;
      }
    }
  }
  return { message: "post not found in user " };
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
  return matchingPosts;
}
async function addPost(userId: string, post: Post): Promise<Post> {
  const newPost: Post = { postId: crypto.randomUUID(), userId, ...post };
  const users = await getUsers();
  for (const user of users) {
    if (user.id == userId) {
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
