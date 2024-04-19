import { User, Comment, Post, Logindata } from "./types.ts";

async function login(data: Logindata) {
	return fetchShortcut("users/login", "POST", data);
}
async function getUsers(id: string) {
	let path: string;
	if (id) {
		path = `users/${id}`;
	} else {
		path = "users";
	}
	return fetchShortcut(path, "GET");
}
async function getCategories(data: string) {
	return fetchShortcut("posts/category", "POST", { category: data });
}
async function getDataType(userId: string, dataType: string) {
	return fetchShortcut("users/userdata", "POST", {
		userId: userId,
		dataType: dataType,
	});
}
async function getPost(data: { postId: string }): Promise<Post> {
	return fetchShortcut("posts/", "POST", data);
}
async function addUser(data: {name: string, password: string, image: string}) {
	return fetchShortcut("users/", "POST", data);
}
async function addPost(id: string, data: {
    title: Post['title'],
    bread: Post['bread'],
    category: string,
    comments: never[],
  }): Promise<Post> {
	return fetchShortcut(`posts/${id}`, "PATCH", data);
}

async function addComment(data: {
    userId: Post['userId'],
    postId: Post['postId']| null,
    commentText: Comment['comment'],
  }) {
	return fetchShortcut("comments/", "PATCH", data);
}

async function deleteUser(id: string): Promise<User[]>{
	return fetchShortcut(`users/${id}`, "DELETE");
}
async function deletePost(userId: string, postId: string): Promise<Post[]> {
	return fetchShortcut("posts/", "DELETE", { userId: userId, postId: postId });
}
async function deleteComment(commentId: string): Promise<Comment[]>{
	return fetchShortcut("comments/", "DELETE", { commentId: commentId });
}
///////////////////////////////////////////////////

async function fetchShortcut(
	path: string,
	method: string,
	data:
		| Logindata
		| { category: string }
		| { userId: string; dataType: string }
		| { postId: string }
		| { commentId: string }
		| {
			title: Post['title'],
			bread: Post['bread'],
			category: string,
			comments: [],
		  }
		| {
			userId: Post['userId'],
			postId: Post['postId']| null,
			commentText: Comment['comment'],
		  }
		| null = null
		
) {
	let url = `http://localhost:3000/api/${path}`;
	const options = {
		method: method,
		headers: { "Content-Type": "application/json" },
		body: data ? JSON.stringify(data) : null,
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		return { error: `Failed to fetch ${method} request` };
	}
	const responseData = await response.json();
	console.log(responseData);
	return responseData;
}

export {
	login,
	getUsers,
	getCategories,
	getDataType,
	getPost,
	addUser,
	addPost,
	addComment,
	deleteUser,
	deletePost,
	deleteComment,
};
