import { User, Comment, Post } from "./types.ts";


async function displayComments(post: Post) {
  const commentsBox = document.querySelector("#commentsDiv") as HTMLDivElement;




    console.log("i comments");


    for (const comment of post.comments) {
      const commentsEl = document.createElement("p");
      commentsEl.innerText = comment.comment;
      commentsBox.append(commentsEl);
    }


}


export { displayComments };
