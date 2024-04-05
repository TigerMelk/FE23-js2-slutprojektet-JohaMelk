import { writeDatabase } from "./handledatabase.js";
import { getUsers } from "./users.js";
import { Comment } from "./Types.js";
async function addComment(
	userId: string,
	postId: string,
	commentText: string
): Promise<Comment> {
	const commentId = crypto.randomUUID();
	const users = await getUsers();
	const userAddingComment = users.find((user) => user.id === userId);
	const postOwner = users.find((user) =>
		user.posts.some((post) => post.postId === postId)
	);
	const post = postOwner.posts.find((post) => post.postId === postId);
	const newComment: Comment = {
		commentId,
		userId,
		postId,
		name: userAddingComment.name,
		comment: commentText,
	};
	post.comments.push(newComment);
	userAddingComment.comments.push(newComment);
	await writeDatabase(users);
	return newComment;
}
async function deleteComment(commentId: string): Promise<void> {
	const users = await getUsers();
	let commentDeleted = false;

	for (const user of users) {
		const commentIndex = user.comments.findIndex(
			(comment) => comment.commentId === commentId
		);
		if (commentIndex !== -1) {
			user.comments.splice(commentIndex, 1);
			commentDeleted = true;
			break;
		}
		for (const post of user.posts) {
			const postCommentIndex = post.comments.findIndex(
				(comment) => commentId === comment.commentId
			);

			if (postCommentIndex !== -1) {
				post.comments.splice(postCommentIndex, 1);
				commentDeleted = true;
				break;
			}
		}
	}
	if (commentDeleted === true) {
		await writeDatabase(users);
		return;
	}
	throw new Error("Comment not found");
}

export { addComment, deleteComment };
