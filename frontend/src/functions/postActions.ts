import { Post, User, SingleUser } from "../modules/types.js";
import { deletePostsFunction, clearContainer } from "./utility.js";
import { getUsers, getPost, getCategories } from "../modules/fetch.js";
import {
  displayUserProfile,
  displayComments,
  displayPosts,
} from "../modules/display.js";
import {
  profileDiv,
  addNewPost,
  mainContainer,
  profile,
  addCommentForm,
} from "./globalVariables.js";

function createPostDiv(post: Post): HTMLDivElement {
  const postDiv: HTMLDivElement = document.createElement("div");
  postDiv.classList.add("postDiv");
  const username: HTMLHeadingElement = document.createElement("h4");
  const title: HTMLHeadingElement = document.createElement("h3");
  const bread: HTMLParagraphElement = document.createElement("p");
  const comments: HTMLParagraphElement = document.createElement("p");
  username.innerText = post.name;
  username.id = post.userId;
  const userId: string | null = localStorage.getItem("userId") as string;

  // ----------------------------------------------------------------------
  if (userId === post.userId) {
    deletePostsFunction(postDiv, username.id, post.postId);
  }
  title.innerText = post.title;
  bread.innerText = post.bread;
  comments.innerText = "comments";
  postDiv.id = post.postId;
  postDiv.append(username, title, bread, comments);
  username.addEventListener("click", (event: Event) => {
    event.preventDefault();
    clearContainer(mainContainer);

    const userId: string = username.id;
    getUsers(userId).then((user: User[] | SingleUser) => {
      displayUserProfile(user as SingleUser);
    });
  });
  return postDiv;
}
function addPostEventListeners(
  post: Post,
  postDiv: HTMLDivElement,
  container: HTMLElement
): void {
  const title: HTMLHeadingElement | null = postDiv.querySelector("h3");
  const comments: HTMLParagraphElement | null =
    postDiv.querySelector("p:last-child");
  function postEvents(event: Event): void {
    event.preventDefault();
    profileDiv.classList.add("hide");
    const postId: string = post.postId;
    localStorage.setItem("postId", postId);
    const postInfo = {
      postId: postId,
    };
    getPost(postInfo).then((postData) => {
      clearContainer(container);
      addNewPost.classList.add("hide");
      const newPostDiv: HTMLDivElement = createPostDiv(postData);
      container.append(newPostDiv);
      displayComments(postData.comments, container);
      const commentForm = document.querySelector(
        "#addComment"
      ) as HTMLFormElement;
      commentForm.classList.remove("hide");
    });
  }
  title?.addEventListener("click", postEvents);
  comments?.addEventListener("click", postEvents);
}
function categoryBtn(button: HTMLButtonElement): void {
  clearContainer(mainContainer);
  profile.classList.add("hide");
  addNewPost.classList.remove("hide");
  addCommentForm.classList.add("hide");
  localStorage.removeItem("category");
  localStorage.setItem("category", button.value);
  getCategories(button.value).then((matchingPosts) => {
    displayPosts(matchingPosts, mainContainer);
  });
}
export { addPostEventListeners, createPostDiv, categoryBtn };
