import { User, Comment, Post } from "./types.ts";

//displays comments
async function displayComments(post: Post) {
  const commentsBox = document.querySelector("#commentsDiv") as HTMLDivElement;

    console.log(post);


    for (const comment of post.comments) {
      const commentsEl = document.createElement("p");
      commentsEl.innerText = comment.comment;
      commentsBox.append(commentsEl);
    }


}


export { displayComments };
