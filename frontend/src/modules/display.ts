import { getUsers, getDataType, getPost } from "./fetch.js";
import { deleteUser } from "./fetch.js";
import { Post, User, Comment, SingleUser, Message } from "./types.js";
import {
  deleteCommentFunc,
  errorMessageFunc,
  clearContainer,
} from "../functions/utility.js";
import {
  createPostDiv,
  addPostEventListeners,
} from "../functions/postActions.js";
import {
  mainContainer,
  addNewPost,
  commentForm,
  profileDiv,
  profileName,
  profileImg,
  logOutBtn,
  profilePosts,
  profileComments,
  deleteUserBtn,
  usersDiv,
} from "../functions/globalVariables.js";
let clickedUserId: string | null;
let commentEventListenerAdded: boolean = false;
let postEventListenerAdded: boolean = false;

//--------------------------------------------------------------------------

function displayUserProfile(user: SingleUser): void {
  profileDiv.classList.remove("hide");

  addNewPost.classList.add("hide");
  commentForm.classList.add("hide");
  profileName.innerText = user.name;
  const userImg: string = user.image;
  switch (userImg) {
    case "apple":
      profileImg.src = new URL(
        "../images/apple-3177692640.png",
        import.meta.url
      ).toString();
      break;
    case "orange":
      profileImg.src = new URL(
        "../images/orange-3177693640.png",
        import.meta.url
      ).toString();
      break;
    case "strawberry":
      profileImg.src = new URL(
        "../images/strawberry-3177709640.png",
        import.meta.url
      ).toString();
      break;
  }

  if (!postEventListenerAdded) {
    profilePosts.addEventListener("click", displayUserPosts);
    postEventListenerAdded = true;
  }

  function commentClickHandler(event: Event): void {
    event.preventDefault();
    clearContainer(mainContainer);
    commentForm.classList.add("hide");
    if (clickedUserId !== null) {
      getDataType(clickedUserId, "comments").then(async (userData) => {
        if (userData.length === 0) {
          clearContainer(mainContainer);

          errorMessageFunc("No comments found");
        } else {
          for (const comment of userData) {
            const commentDiv = createCommentDiv(comment as Comment);
            mainContainer.append(commentDiv);
            const postInfo = {
              postId: comment.postId,
            };
            const post: Post | { message: string } = await getPost(postInfo);
            if ("message" in post) {
              const deletedPost: HTMLHeadingElement =
                document.createElement("h3");
              deletedPost.id = "deletedPost";
              deletedPost.innerText = "Post has been deleted";
              commentDiv.prepend(deletedPost);
            }
            if (post && post.title) {
              const postTitle: HTMLHeadingElement =
                document.createElement("h3");
              postTitle.innerText = post.title;
              commentDiv.prepend(postTitle);
              postTitle.addEventListener("click", (event) => {
                event.preventDefault();
                displayPostDetails(post.postId);
              });
            }
          }
        }
      });
    }
  }

  if (!commentEventListenerAdded) {
    profileComments.addEventListener("click", commentClickHandler);
    commentEventListenerAdded = true;
  }
  const userId: string | null = localStorage.getItem("userId");

  if (user.id !== userId) {
    logOutBtn.classList.add("hide");
    deleteUserBtn.classList.add("hide");
  } else {
    logOutBtn.classList.remove("hide");
    deleteUserBtn.classList.remove("hide");
    // logout
    logOutBtn.addEventListener("click", (event: Event): void => {
      event.preventDefault();
      localStorage.clear();
      location.reload();
    });
    // DeleteProfile
    deleteUserBtn.addEventListener("click", () => {
      deleteUser(user.id).then((message: Message) => {
        profileDiv.classList.add("hide");
        clearContainer(mainContainer);
        errorMessageFunc("User " + user.name + message.message);
        setTimeout(() => {
          localStorage.clear();
          location.reload();
        }, 3000);
      });
    });
  }
}
function displayPosts(data: Post[], container: HTMLElement): void {
  clearContainer(container);
  for (const post of data) {
    const postDiv: HTMLDivElement = createPostDiv(post);
    addPostEventListeners(post, postDiv, container);
    container.append(postDiv);
  }
}

function createCommentDiv(comment: Comment): HTMLDivElement {
  const commentDiv: HTMLDivElement = document.createElement("div");
  commentDiv.classList.add("postDiv");
  const userName: HTMLHeadingElement = document.createElement("h4");
  userName.innerText = comment.name;
  const theComment: HTMLParagraphElement = document.createElement("p");
  theComment.innerText = comment.comment;
  commentDiv.id = comment.commentId;
  userName.id = comment.userId;
  const userId: string | null = localStorage.getItem("userId");

  userName.addEventListener("click", (event: Event) => {
    event.preventDefault();
    clearContainer(mainContainer);
    const userId: string = userName.id;
    clickedUserId = userId;
    getUsers(userId).then((user: User[] | SingleUser) => {
      displayUserProfile(user as SingleUser);
    });
  });
  // ----------------------------------------------------------------------
  if (userId === comment.userId) {
    deleteCommentFunc(commentDiv, comment.commentId);
  }
  commentDiv.append(userName, theComment);
  return commentDiv;
}

function displayUserPosts(event: Event): void {
  event.preventDefault();
  getDataType(clickedUserId as string, "posts").then((userData) => {
    if (userData.length === 0) {
      clearContainer(mainContainer);
      errorMessageFunc("No posts found");
    } else {
      displayPosts(userData as Post[], mainContainer);
    }
  });
}
function displayPostDetails(postId: string): void {
  clearContainer(mainContainer);
  profileDiv.classList.add("hide");
  const postInfo = {
    postId: postId,
  };
  getPost(postInfo).then((postData: Post) => {
    addNewPost.classList.add("hide");
    const newPostDiv: HTMLDivElement = createPostDiv(postData);
    mainContainer.append(newPostDiv);
    displayComments(postData.comments, mainContainer);
    commentForm.classList.remove("hide");
  });
}

function displayUsers(data: User[]): void {
  usersDiv.innerHTML = "";
  usersDiv.classList.toggle("hide");

  for (const user of data) {
    const username: HTMLAnchorElement = createUserLink(user);
    usersDiv.append(username);
  }
}
function displayComments(data: Array<Comment>, container: HTMLElement): void {
  if (!data || data.length === 0) {
    return;
  }
  for (const comment of data) {
    const commentDiv: HTMLDivElement = createCommentDiv(comment);
    container.append(commentDiv);
  }
}

function createUserLink(user: User): HTMLAnchorElement {
  const username: HTMLAnchorElement = document.createElement("a");
  username.innerText = user.name;
  username.id = user.id;
  username.addEventListener("click", (event: Event) => {
    event.preventDefault();
    addNewPost.classList.add("hide");
    clearContainer(mainContainer);

    const userId: string = username.id;
    clickedUserId = user.id;
    getUsers(userId).then((user: User[] | SingleUser) => {
      displayUserProfile(user as SingleUser);
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
  displayPostDetails,
  errorMessageFunc,
  createUserLink,
};
