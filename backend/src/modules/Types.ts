// Type for User, how each object in the Users array should look like in db.json
export type User = {
  id: string;
  name: string;
  password: string;
  image: string;
  admin: boolean;
  comments: Array<Comment>;
  posts: Array<Post>;
};

// Same as type User, but used for sending the data back to the clientside, excluding the user's password
export type UserWithoutPassword = Omit<User, "password">;

// How each post object in the posts array should look like
export type Post = {
  postId: string;
  userId: string;
  title: string;
  bread: string;
  category: ["League of Legends", "Bloodborne", "Palworld"];
  comments: Array<Comment>;
  //   likes: number;
};

// How each comment object in the comments, as well as post.comments, array should look like
export type Comment = {
  commentId: string;
  postId: string;
  userId: string;
  comment: string;
  //   likes: number
};
