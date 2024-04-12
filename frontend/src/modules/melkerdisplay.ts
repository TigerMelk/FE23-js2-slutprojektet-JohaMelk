import { getUsers, getDataType, getPost } from "./melkers.js";

//! ///////////////////////////////////////////////////////////////////
//! ///////////////////////////////////////////////////////////////////
//! ///////////////////////////////////////////////////////////////////
const userId = localStorage.getItem("userId") as string;
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
  title?.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = post.postId;
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
  // clearContainer(container);
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
  userName.addEventListener("click", (event) => {
    event.preventDefault();
    mainContainer.innerHTML = "";
    const userId = userName.id;
    getUsers(userId).then((user) => {
      console.log(user);
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
  console.log(user, user.id);
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
    mainContainer.innerHTML = "";
    const clickedUserId = user.id;
    getDataType(clickedUserId, "comments").then((userData) => {
      userData.forEach((comment) => {
        const commentDiv = createCommentDiv(comment);
        mainContainer.append(commentDiv);
        const postInfo = {
          postId: comment.postId,
        };
        getPost(postInfo).then((post) => {
          // console.log(post);
          if (post && post.title) {
            const postTitle = document.createElement("h3");
            postTitle.innerText = post.title;
            commentDiv.prepend(postTitle);
            postTitle.addEventListener("click", (event) => {
              event.preventDefault();
              displayPostDetails(post.postId);
            });
          }
        });
      });
    });
  });

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

      const commentForm = document.querySelector(
        "#addComment"
      ) as HTMLFormElement;
      commentForm.classList.remove("hide");
    });
  }
  if (user.id !== userId) {
    logOutBtn.classList.add("hide");
  } else logOutBtn.classList.remove("hide");
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
    mainContainer.innerHTML = "";
    const userId = username.id;
    getUsers(userId).then((user) => {
      displayUserProfile(user);
    });
  });
  return username;
}
export {
  displayPosts,
  displayUsers,
  displayUserProfile,
  displayComments,
  createCommentDiv,
};
