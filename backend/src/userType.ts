export type User = {
	id: number;
	name: string;
	password: string;
	image: string;
	admin: boolean;
	comments: Array<Comment>;
};
export type Comment = {
	id: number;
	comment: string;
	category: ["game1", "game2", "game3"];
};
