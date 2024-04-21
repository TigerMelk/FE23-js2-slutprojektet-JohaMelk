// * error handling function and delete post and comment function
//
//
import { deletePost, deleteComment } from "../modules/fetch.js";
import { Message } from "../modules/types.js";
function deletePostsFunction(
  postDiv: HTMLDivElement,
  usernameId: string,
  postId: string
): void {
  const deletePostsBtn = document.createElement("button") as HTMLButtonElement;
  deletePostsBtn.innerText = "X";
  postDiv.append(deletePostsBtn);
  deletePostsBtn.addEventListener("click", () => {
    console.log("delete post func");
    deletePost(usernameId, postId).then((message: Message) => {
      postDiv.classList.add("hide");
      errorMessageFunc(message.message);
    });
  });
}
function deleteCommentFunc(
  commentDiv: HTMLDivElement,
  commentId: string
): void {
  const deleteCommentBtn = document.createElement(
    "button"
  ) as HTMLButtonElement;
  deleteCommentBtn.innerText = "X";
  commentDiv.append(deleteCommentBtn);
  deleteCommentBtn.addEventListener("click", (event: Event) => {
    event.preventDefault();
    deleteComment(commentId).then((message: Message) => {
      commentDiv.classList.add("hide");
      errorMessageFunc(message.message);
    });
  });
}

function errorMessageFunc(message: string): void {
  const errorDiv = document.querySelector(".error") as HTMLDivElement;
  const errorMessage = document.querySelector(
    "#errorMessage"
  ) as HTMLParagraphElement;
  errorDiv.classList.remove("hide");
  errorMessage.innerText = message;
  setTimeout(() => {
    errorDiv.classList.add("hide");
    errorMessage.innerText = "";
  }, 3000);
}
function clearContainer(container: HTMLElement): void {
  container.innerHTML = "";
}

export {
  deletePostsFunction,
  deleteCommentFunc,
  errorMessageFunc,
  clearContainer,
};
