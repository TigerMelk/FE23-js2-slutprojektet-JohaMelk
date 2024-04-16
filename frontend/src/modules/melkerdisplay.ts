import { getUsers, getDataType, getPost } from "./melkers.js";
import { deletePost, deleteComment, deleteUser } from "./melkers.js";

const addNewPost = document.querySelector("#addPost") as HTMLFormElement;
let clickedUserId;
const commentForm = document.querySelector("#addComment") as HTMLFormElement;
const mainContainer = document.querySelector(
  "#mainContainer"
) as HTMLDivElement;
const profileDiv = document.querySelector("#profileDiv") as HTMLDivElement;

async function displayPosts(data: any, container: HTMLElement) {
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
  const userId = localStorage.getItem("userId") as string;

  // ----------------------------------------------------------------------
  if (userId === post.userId) {
    deletePostsFunction(postDiv, username.id, post.postId);
  }
  title.innerText = post.title;
  bread.innerText = post.bread;
  comments.innerText = "comments";
  postDiv.id = post.postId;
  postDiv.append(username, title, bread, comments);
  username.addEventListener("click", (event) => {
    event.preventDefault();
    mainContainer.innerHTML = "";
    const userId = username.id;
    getUsers(userId).then((user) => {
      displayUserProfile(user);
    });
  });
  return postDiv;
}
function addPostEventListeners(
  post: any,
  postDiv: HTMLDivElement,
  container: HTMLElement
) {
  const title = postDiv.querySelector("h3");
  const comments = postDiv.querySelector("p:last-child");
  function postEvents(event: Event) {
    event.preventDefault();
    profileDiv.classList.add("hide");
    const postId = post.postId;
    localStorage.setItem("postId", postId);
    const postInfo = {
      postId: postId,
    };
    getPost(postInfo).then((postData) => {
      clearContainer(container);
      console.log(postData);
      addNewPost.classList.add("hide");
      const newPostDiv = createPostDiv(postData);
      console.log(newPostDiv);
      console.log(container);
      console.log(container.innerHTML);
      container.append(newPostDiv);
      displayComments(postData.comments, container);
      console.log(container.innerHTML);

      const commentForm = document.querySelector(
        "#addComment"
      ) as HTMLFormElement;
      commentForm.classList.remove("hide");
    });
  }
  title?.addEventListener("click", postEvents);
  comments?.addEventListener("click", postEvents);
}
function displayComments(data: any, container: HTMLElement) {
  if (!data || data.length === 0) {
    return;
  }
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
  // ----------------------------------------------------------------------
  if (userName.id === comment.userId) {
    deleteCommentFunc(commentDiv, comment.commentId);
  }
  userName.addEventListener("click", (event) => {
    event.preventDefault();
    mainContainer.innerHTML = "";
    const userId = userName.id;
    clickedUserId = userId;
    getUsers(userId).then((user) => {
      console.log(user);
      displayUserProfile(user);
    });
  });
  commentDiv.append(userName, theComment);
  return commentDiv;
}

let commentEventListenerAdded = false;
let postEventListenerAdded = false;
function displayUserProfile(user: any) {
  const profileName = document.querySelector(
    "#profileName"
  ) as HTMLHeadingElement;
  const profileImg = document.querySelector("#profileImg") as HTMLImageElement;
  const logOutBtn = document.querySelector("#logOut") as HTMLButtonElement;
  const profilePosts = document.querySelector("#posts") as HTMLButtonElement;
  const profileComments = document.querySelector(
    "#comments"
  ) as HTMLButtonElement;
  const deleteUserBtn = document.querySelector(
    "#deleteUserBtn"
  ) as HTMLButtonElement;

  addNewPost.classList.add("hide");
  commentForm.classList.add("hide");
  profileName.innerText = user.name;
  profileImg.src = user.image;

  function displayUserPosts(event: Event) {
    event.preventDefault();
    getDataType(clickedUserId, "posts").then(async (userData) => {
      await displayPosts(userData, mainContainer);
    });
  }
  if (!postEventListenerAdded) {
    profilePosts.addEventListener("click", displayUserPosts);
    postEventListenerAdded = true;
  }

  // DeleteProfile
  deleteUserBtn.addEventListener("click", () => {
    deleteUser(user.id);
    console.log(user.id + " is deleted");
  });

  function commentClickHandler(event: Event) {
    event.preventDefault();
    clearContainer(mainContainer);
    commentForm.classList.add("hide");
    console.log(clickedUserId);
    if (clickedUserId !== null) {
      getDataType(clickedUserId, "comments").then(async (userData) => {
        console.log(userData);
        for (const comment of userData) {
          const commentDiv = createCommentDiv(comment);
          mainContainer.append(commentDiv);
          const postInfo = {
            postId: comment.postId,
          };
          const post = await getPost(postInfo);
          if (post && post.title) {
            const postTitle = document.createElement("h3");
            postTitle.innerText = post.title;
            commentDiv.prepend(postTitle);
            postTitle.addEventListener("click", (event) => {
              event.preventDefault();
              displayPostDetails(post.postId);
            });
          }
        }
      });
    }
  }

  if (!commentEventListenerAdded) {
    profileComments.addEventListener("click", commentClickHandler);
    commentEventListenerAdded = true;
  }
  const userId = localStorage.getItem("userId") as string;

  if (user.id !== userId) {
    logOutBtn.classList.add("hide");
  } else {
    logOutBtn.classList.remove("hide");
  }

  logOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  });

  profileDiv.classList.remove("hide");
}
function displayPostDetails(postId: string) {
  clearContainer(mainContainer);
  profileDiv.classList.add("hide");
  const postInfo = {
    postId: postId,
  };
  getPost(postInfo).then((postData) => {
    addNewPost.classList.add("hide");
    const newPostDiv = createPostDiv(postData);
    mainContainer.append(newPostDiv);
    displayComments(postData.comments, mainContainer);
    commentForm.classList.remove("hide");
  });
}
function clearContainer(container: HTMLElement) {
  container.innerHTML = "";
}

function displayUsers(data: any) {
  const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
  usersDiv.innerHTML = "";
  usersDiv.classList.toggle("hide");

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
    addNewPost.classList.add("hide");
    mainContainer.innerHTML = "";
    const userId = username.id;
    clickedUserId = user.id;
    getUsers(userId).then((user) => {
      displayUserProfile(user);
    });
  });
  return username;
}

// Delete posts
function deletePostsFunction(postDiv: any, usernameId: any, postId: any): void {
  const deletePostsBtn = document.createElement("button") as HTMLButtonElement;
  deletePostsBtn.innerText = "X";
  postDiv.append(deletePostsBtn);
  deletePostsBtn.addEventListener("click", () => {
    console.log("delete post func");
    deletePost(usernameId, postId);
  });
}
//Delete comment
function deleteCommentFunc(commentDiv: any, commentId: any): void {
  const deleteCommentBtn = document.createElement(
    "button"
  ) as HTMLButtonElement;
  deleteCommentBtn.innerText = "X";
  commentDiv.append(deleteCommentBtn);
  deleteCommentBtn.addEventListener("click", () => {
    console.log("delete comment func");
    deleteComment(commentId);
  });
}

export {
  displayPosts,
  displayUsers,
  displayUserProfile,
  displayComments,
  createCommentDiv,
  displayPostDetails,
  createUserLink,
};
