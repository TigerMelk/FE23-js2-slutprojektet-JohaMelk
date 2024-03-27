export type User = {
  id: string;
  name: string;
  password: string;
  image: string;
  admin: boolean;
  comments: Array<Comment>;
  posts: Array<Post>;
};
export type UserWithoutPassword = Omit<User, "password">;

export type Comment = {
  commentId: string;
  postId: string;
  userId: string;
  comment: string;
  //   likes: number
};
export type Post = {
  postId: string;
  userId: string;
  title: string;
  bread: string;
  category: ["League of Legends", "Bloodborne", "Palworld"];
  comments: Array<Comment>;
  //   likes: number;
};
