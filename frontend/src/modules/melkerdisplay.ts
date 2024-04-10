import { getUsers, getDataType } from "./melkers.js";
// const addNewPost = document.querySelector("#addPost") as HTMLFormElement;

// function displayPosts(data) {
//   const mainContainer = document.querySelector(
//     "#mainContainer"
//   ) as HTMLDivElement;
//   mainContainer.innerHTML = "";
//   for (const post of data) {
//     const postDiv = document.createElement("div");
//     postDiv.classList.add("postDiv");
//     const username = document.createElement("h4");
//     const title = document.createElement("h3");
//     const bread = document.createElement("p");
//     const comments = document.createElement("p");
//     postDiv.id = post.postId;
//     username.innerText = post.name;
//     username.id = post.userId;
//     title.innerText = post.title;
//     bread.innerText = post.bread;
//     comments.innerText = "comments";
//     // ! profileimg
//     postDiv.append(username, title, bread, comments);
//     mainContainer.append(postDiv);
//     title.addEventListener("click", (event) => {
//       event.preventDefault();
//       mainContainer.innerHTML = "";
//       addNewPost.classList.add("hide");
//       const postDiv = document.createElement("div");
//       postDiv.classList.add("postDiv");
//       const username = document.createElement("p");
//       const title = document.createElement("h3");
//       const bread = document.createElement("p");
//       const comments = document.createElement("p");
//       postDiv.id = post.postId;
//       localStorage.setItem("postUserId", post.userId);
//       localStorage.setItem("postId", postDiv.id);
//       username.innerText = post.name;
//       username.id = post.userId;
//       title.innerText = post.title;
//       bread.innerText = post.bread;
//       comments.innerText = "comments";
//       // ! profileimg
//       postDiv.append(username, title, bread, comments);
//       mainContainer.append(postDiv);
//       displayComments(post.comments, mainContainer);
//     });
//     comments.addEventListener("click", (event) => {
//       event.preventDefault();
//       mainContainer.innerHTML = "";
//       addNewPost.classList.add("hide");
//       const postDiv = document.createElement("div");
//       postDiv.classList.add("postDiv");
//       const username = document.createElement("p");
//       const title = document.createElement("h3");
//       const bread = document.createElement("p");
//       const comments = document.createElement("p");
//       postDiv.id = post.postId;
//       username.innerText = post.name;
//       username.id = post.userId;
//       title.innerText = post.title;
//       bread.innerText = post.bread;
//       localStorage.setItem("postId", postDiv.id);

//       comments.innerText = "comments";
//       // ! profileimg
//       postDiv.append(username, title, bread, comments);
//       mainContainer.append(postDiv);
//       const commentForm = document.querySelector(
//         "#addComment"
//       ) as HTMLFormElement;
//       commentForm.classList.remove("hide");
//       postDiv.append(commentForm);
//       for (const comment of post.comments) {
//         const commentDiv = document.createElement("div");
//         commentDiv.classList.add("postDiv");
//         commentDiv.id = comment.commentId;
//         const username = document.createElement("p");
//         username.id = comment.userId;
//         username.innerText = comment.name;
//         const theComment = document.createElement("p");
//         theComment.id = comment.postId;
//         theComment.innerText = comment.comment;

//         commentDiv.append(username, theComment);
//         mainContainer.append(commentDiv);
//       }
//     });
//   }
// }
// function displayComments(data: any, container: any) {
//   const userId = localStorage.getItem("userId");
//   const logOutBtn = document.querySelector("#logOut") as HTMLButtonElement;

//   for (const comment of data) {
//     const commentDiv = document.createElement("div") as HTMLDivElement;
//     const userName = document.createElement("h4");
//     userName.innerText = comment.name;
//     const theComment = document.createElement("p");
//     theComment.innerText = comment.comment;
//     commentDiv.id = comment.commentId;
//     userName.id = comment.userId;
//     userName.addEventListener("click", (event) => {
//       event.preventDefault();
//       const mainContainer = document.querySelector(
//         "#mainContainer"
//       ) as HTMLDivElement;
//       mainContainer.innerHTML = "";
//       addNewPost.classList.add("hide");
//       getUsers(userName.id).then((user) => {
//         const profilePosts = document.querySelector(
//           "#posts"
//         ) as HTMLButtonElement;
//         const profileComments = document.querySelector(
//           "#comments"
//         ) as HTMLButtonElement;
//         profileComments.addEventListener("click", (event) => {
//           event.preventDefault();
//           getDataType(userName.id, "comments").then((userdata) => {
//             displayComments(userdata, mainContainer);
//           });
//         });
//         profilePosts.addEventListener("click", (event) => {
//           event.preventDefault();
//           getDataType(userName.id, "posts").then((userdata) => {
//             displayPosts(userdata);
//           });
//         });
//         const profileName = document.querySelector(
//           "#profileName"
//         ) as HTMLHeadingElement;
//         const profile = document.querySelector("#profileDiv") as HTMLDivElement;
//         const profileImg = document.querySelector(
//           "#profileImg"
//         ) as HTMLImageElement;

//         profileImg.src = user.image;
//         profile.classList.remove("hide");
//         if (userId !== user.id) {
//           logOutBtn.classList.add("hide");
//         } else {
//           logOutBtn.classList.remove("hide");
//         }

//         profileName.innerText = user.name;
//       });
//     });
//     commentDiv.classList.add("postDiv");
//     const postTitle = document.createElement("h3");
//     postTitle.id = comment.postId;
//     commentDiv.append(postTitle, userName, theComment);
//     container.append(commentDiv);
//   }
// }

// function displayUsers(data: any) {
//   const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
//   const userId = localStorage.getItem("userId");
//   const logOutBtn = document.querySelector("#logOut") as HTMLButtonElement;
//   for (const user of data) {
//     const username = document.createElement("a");
//     username.innerText = user.name;
//     username.id = user.id;
//     console.log(typeof username.id);
//     usersDiv.append(username);
//     username.addEventListener("click", (event) => {
//       event.preventDefault();
//       const mainContainer = document.querySelector(
//         "#mainContainer"
//       ) as HTMLDivElement;
//       mainContainer.innerHTML = "";
//       addNewPost.classList.add("hide");
// getUsers(username.id).then((user) => {
//   const profilePosts = document.querySelector(
//     "#posts"
//   ) as HTMLButtonElement;
//   const profileComments = document.querySelector(
//     "#comments"
//   ) as HTMLButtonElement;
//   profileComments.addEventListener("click", (event) => {
//     event.preventDefault();
//     getDataType(username.id, "comments").then((userdata) => {
//       displayComments(userdata, mainContainer);
//     });
//   });
//   profilePosts.addEventListener("click", (event) => {
//     event.preventDefault();
//     getDataType(username.id, "posts").then((userdata) => {
//       displayPosts(userdata);
//     });
//   });
//         const profileName = document.querySelector(
//           "#profileName"
//         ) as HTMLHeadingElement;
//         const profile = document.querySelector("#profileDiv") as HTMLDivElement;
//         const profileImg = document.querySelector(
//           "#profileImg"
//         ) as HTMLImageElement;

//         profileImg.src = user.image;
//         profile.classList.remove("hide");
//         if (userId !== user.id) {
//           logOutBtn.classList.add("hide");
//         } else {
//           logOutBtn.classList.remove("hide");
//         }

//         profileName.innerText = user.name;
//       });
//     });
//   }
// }
//! ///////////////////////////////////////////////////////////////////
//! ///////////////////////////////////////////////////////////////////
//! ///////////////////////////////////////////////////////////////////

const addNewPost = document.querySelector("#addPost") as HTMLFormElement;
const mainContainer = document.querySelector(
  "#mainContainer"
) as HTMLDivElement;
function displayPosts(data: any, container: HTMLElement) {
  clearContainer(container);
  for (const post of data) {
    const postDiv = createPostDiv(post);
    addPostEventListeners(post, postDiv, container);
    container.append(postDiv);
  }
}
function createPostDiv(post: any): HTMLDivElement {
  const postDiv = document.createElement("div");
  postDiv.classList.add("postDiv");
  const username = document.createElement("h4");
  const title = document.createElement("h3");
  const bread = document.createElement("p");
  const comments = document.createElement("p");
  username.innerText = post.name;
  username.id = post.userId;
  title.innerText = post.title;
  bread.innerText = post.bread;
  comments.innerText = "comments";
  postDiv.id = post.postId;
  postDiv.append(username, title, bread, comments);
  return postDiv;
}
function addPostEventListeners(
  post: any,
  postDiv: HTMLDivElement,
  container: HTMLElement
) {
  const title = postDiv.querySelector("h3");
  const comments = postDiv.querySelector("p:last-child");
  title?.addEventListener("click", (event) => {
    event.preventDefault();
    clearContainer(container);
    addNewPost.classList.add("hide");
    const newPostDiv = createPostDiv(post);
    container.append(newPostDiv);
    displayComments(post.comments, container);
  });
  comments?.addEventListener("click", (event) => {
    event.preventDefault();
    clearContainer(container);
    addNewPost.classList.add("hide");
    const newPostDiv = createPostDiv(post);
    container.append(newPostDiv);
    const commentForm = document.querySelector(
      "#addComment"
    ) as HTMLFormElement;
    commentForm.classList.remove("hide");
    newPostDiv.append(commentForm);
    displayComments(post.comments, container);
  });
}
function displayComments(data: any, container: HTMLElement) {
  clearContainer(container);
  for (const comment of data) {
    const commentDiv = createCommentDiv(comment);
    container.append(commentDiv);
  }
}
function createCommentDiv(comment: any): HTMLDivElement {
  const commentDiv = document.createElement("div") as HTMLDivElement;
  commentDiv.classList.add("postDiv");
  const userName = document.createElement("h4");
  userName.innerText = comment.name;
  const theComment = document.createElement("p");
  theComment.innerText = comment.comment;
  commentDiv.id = comment.commentId;
  userName.id = comment.userId;
  userName.addEventListener("click", (event) => {
    event.preventDefault();
    const userId = userName.id;
    getUsers(userId).then((user) => {
      displayUserProfile(user);
    });
  });
  commentDiv.append(userName, theComment);
  return commentDiv;
}
function displayUserProfile(user: any) {
  const profileDiv = document.querySelector("#profileDiv") as HTMLDivElement;
  const profileName = document.querySelector(
    "#profileName"
  ) as HTMLHeadingElement;
  const profileImg = document.querySelector("#profileImg") as HTMLImageElement;
  const logOutBtn = document.querySelector("#logOut") as HTMLButtonElement;
  const profilePosts = document.querySelector("#posts") as HTMLButtonElement;
  const profileComments = document.querySelector(
    "#comments"
  ) as HTMLButtonElement;

  profileName.innerText = user.name;
  profileImg.src = user.image;
  // ! logout
  profilePosts.addEventListener("click", (event) => {
    event.preventDefault();
    getDataType(user.id, "posts").then((userData) => {
      displayPosts(userData, mainContainer);
    });
  });

  profileComments.addEventListener("click", (event) => {
    event.preventDefault();
    getDataType(user.id, "comments").then((userData) => {
      displayComments(userData, mainContainer);
    });
  });

  logOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  });

  profileDiv.classList.remove("hide");
}

function clearContainer(container: HTMLElement) {
  container.innerHTML = "";
}

function displayUsers(data: any) {
  const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
  usersDiv.innerHTML = "";
  for (const user of data) {
    const username = createUserLink(user);
    usersDiv.append(username);
  }
}
function createUserLink(user: any): HTMLAnchorElement {
  const username = document.createElement("a");
  username.innerText = user.name;
  username.id = user.id;
  username.addEventListener("click", (event) => {
    event.preventDefault();
    const userId = username.id;
    getUsers(userId).then((user) => {
      displayUserProfile(user);
    });
  });
  return username;
}
export { displayPosts, displayUsers, displayUserProfile, displayComments };
