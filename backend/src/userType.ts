export type User = {
	id: number;
	name: string;
	password: string;
	image: string;
	admin: boolean;
	comments: Array<Comment>;
	posts: Array<Post>;
};
export type Comment = {
	id: number;
	comment: string;
	likes: number;
};
export type Post = {
	post: string;
	category: ["game1", "game2", "game3"];
	likes: number;
};
