type User = {
  // image: string,
  // id: number
  name: string;
  admin: boolean;
  // comments: Array<Comment>;
  // posts: Array<Post>;
};
const userDiv = document.querySelector("#userDiv") as HTMLDivElement;

async function displayUser(data: User) {
  userDiv.innerHTML = "";
  // const {image, id, name, admin, comments, likes}
  const { name, admin, likes };

  // const imgEl= document.createElement('img')
  const nameEl = document.createElement("h2");
  // const commentsEl= document.createElement('p')
  const likesEl = document.createElement("p");

  // imgEl.src = images
  nameEl.innerText = name;
  // commentsEl.innerText = comments
  likesEl.innerText = likes;

  if (admin === true) {
    // addEventListener
    // deleteComment() btn
  }

  const userBox = document.createElement("div");
  const commentBox = document.createElement("div");
  userBox.append(
    // imgEl,
    nameEl,
    // commentsEl,
    likesEl
  );

  commentBox.append();

  userDiv.append(userBox);
}
export { displayUser };
