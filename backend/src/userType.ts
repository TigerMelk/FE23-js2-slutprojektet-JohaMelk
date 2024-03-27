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
	comment: string;
	//   likes: number
};
export type Post = {
	postId: string;
	userId: string;
	title: string;
	bread: string;
	category: ["game1", "game2", "game3"];
	comments: Array<Comment>;
	//   likes: number;
};
