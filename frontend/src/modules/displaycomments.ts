type User = {
  id: string;
  name: string;
  password: string;
  image: string;
  admin: boolean;
  comments: Comment[];
  posts: [];
};
type Comment = {
  commentId: string;
  userId: string;
  postId: string;
  comment: string;
};

async function displayComments(data: User[]) {
  const commentsBox = document.querySelector("#commentsDiv") as HTMLDivElement;

  for (const user of data) {
    const { comments } = user;
    console.log("i comments");

    for (const comment of comments) {
      const commentsEl = document.createElement("p");
      commentsEl.innerText = comment.comment;
      commentsBox.append(commentsEl);
    }
  }
}

export { displayComments };
