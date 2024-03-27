import { writeDatabase } from "./handledatabase.js";
import { getUser, getUsers } from "./users.js";
import { Post } from "./Types.js";

// get individuell post //!funkar
// json format for this is:
// {"userId":"user.id or userId",
// "postId":"posts.postId"}
async function getPost(
  userId: string,
  postId: string
): Promise<Post | { message: string }> {
  //!fixa return
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

// get posts by category //! funkar
// json format for this is:
// {"category":"League of Legends" | "Bloodborne" | "Palworld"}
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
// Post functions

// Patch functions
//! funkar
// add new post
// json format for this is:
// id in url should be user.id
// {
//     "title": "post title",
//     "bread": "post content",
//     "category": "League of Legends" | "Bloodborne" | "Palworld",
//     "comments": []
// }
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
//add new comment to post. comments array and user.comments array //!funkar
// json format for this is:
// {
//	"userId": "user.id", //?user who comments
//	"postId": "postId",
//	"commentText": "the comment"
//}

// delete post from user.posts array // ! funkar
// json format for this is:
// {"userId":"user.id",
// "postId":"postId"}
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
