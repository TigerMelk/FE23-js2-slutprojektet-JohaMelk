import { getUsers, getDataType } from "./melkers.js";
const addNewPost = document.querySelector("#addPost") as HTMLFormElement;

function displayPosts(data) {
	const mainContainer = document.querySelector(
		"#mainContainer"
	) as HTMLDivElement;
	mainContainer.innerHTML = "";
	for (const post of data) {
		const postDiv = document.createElement("div");
		postDiv.classList.add("postDiv");
		const username = document.createElement("p");
		const title = document.createElement("h3");
		const bread = document.createElement("p");
		const comments = document.createElement("p");
		postDiv.id = post.postId;
		username.innerText = post.name;
		username.id = post.userId;
		title.innerText = post.title;
		bread.innerText = post.bread;
		comments.innerText = "comments";
		// ! profileimg
		postDiv.append(username, title, bread, comments);
		mainContainer.append(postDiv);
		title.addEventListener("click", (event) => {
			event.preventDefault();
			mainContainer.innerHTML = "";
			addNewPost.classList.add("hide");
			const postDiv = document.createElement("div");
			postDiv.classList.add("postDiv");
			const username = document.createElement("p");
			const title = document.createElement("h3");
			const bread = document.createElement("p");
			const comments = document.createElement("p");
			postDiv.id = post.postId;
			localStorage.setItem("postUserId", post.userId);
			localStorage.setItem("postId", postDiv.id);
			username.innerText = post.name;
			username.id = post.userId;
			title.innerText = post.title;
			bread.innerText = post.bread;

			comments.innerText = "comments";
			// ! profileimg
			postDiv.append(username, title, bread, comments);
			mainContainer.append(postDiv);
		});
		comments.addEventListener("click", (event) => {
			event.preventDefault();
			mainContainer.innerHTML = "";
			addNewPost.classList.add("hide");
			const postDiv = document.createElement("div");
			postDiv.classList.add("postDiv");
			const username = document.createElement("p");
			const title = document.createElement("h3");
			const bread = document.createElement("p");
			const comments = document.createElement("p");
			postDiv.id = post.postId;
			username.innerText = post.name;
			username.id = post.userId;
			title.innerText = post.title;
			bread.innerText = post.bread;
			localStorage.setItem("postId", postDiv.id);

			comments.innerText = "comments";
			// ! profileimg
			postDiv.append(username, title, bread, comments);
			mainContainer.append(postDiv);
			const commentForm = document.querySelector(
				"#addComment"
			) as HTMLFormElement;
			commentForm.classList.remove("hide");
			postDiv.append(commentForm);
			for (const comment of post.comments) {
				const commentDiv = document.createElement("div");
				commentDiv.classList.add("postDiv");
				commentDiv.id = comment.commentId;
				const username = document.createElement("p");
				username.id = comment.userId;
				username.innerText = comment.name;
				const theComment = document.createElement("p");
				theComment.id = comment.postId;
				theComment.innerText = comment.comment;

				commentDiv.append(username, theComment);
				mainContainer.append(commentDiv);
			}
		});
	}
}
function displayUsers(data) {
	const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
	for (const user of data) {
		const username = document.createElement("a");
		username.innerText = user.name;
		username.id = user.id;
		console.log(typeof username.id);
		usersDiv.append(username);
		username.addEventListener("click", (event) => {
			event.preventDefault();
			const mainContainer = document.querySelector(
				"#mainContainer"
			) as HTMLDivElement;
			mainContainer.innerHTML = "";
			addNewPost.classList.add("hide");
			getUsers(username.id).then((user) => {
				const profilePosts = document.querySelector(
					"#posts"
				) as HTMLButtonElement;
				const profileComments = document.querySelector(
					"#comments"
				) as HTMLButtonElement;
				profileComments.addEventListener("click", (event) => {
					event.preventDefault();
					getDataType(username.id, "comments").then((userdata) => {
						displayPosts(userdata);
					});
				});
				profilePosts.addEventListener("click", (event) => {
					event.preventDefault();
					getDataType(username.id, "posts").then((userdata) => {
						displayPosts(userdata);
					});
				});
				const profileName = document.querySelector(
					"#profileName"
				) as HTMLHeadingElement;
				const profile = document.querySelector("#profileDiv") as HTMLDivElement;
				const profileImg = document.querySelector(
					"#profileImg"
				) as HTMLImageElement;

				profileImg.src = user.image;
				profile.classList.remove("hide");

				profileName.innerText = user.name;
			});
		});
	}
}
export { displayPosts, displayUsers };
