export type User = {
    id: string;
    name: string;
    password: string;
    image: string;
    admin: boolean;
    comments: Array<Comment>;
    posts: Array<Post>;
  };
export type Comment = {
    commentId: string;
    postId: string;
    userId: string;
    name: string;
    comment: string;
  };
export type Post = {
    postId: string;
    userId: string;
    title: string;
    bread: string;
    category: ["League of Legends", "Bloodborne", "Palworld"];
    comments: Array<Comment>;
    name: string;
  };

export type Logindata = {
  name: string
  password: String
}