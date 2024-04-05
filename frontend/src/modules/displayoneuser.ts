import { User, Comment, Post } from "./types.ts";

//display one user thats clicked on i userlist
async function displayoneuser(nameidInnertext, data) {
  console.log(nameidInnertext, "in displey person");
  console.log(data, "in displey person");

  const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
  const userBox = document.createElement("div");
  const userposts = document.createElement("div");

  usersDiv.innerHTML = "";

  for (const user of data) {
    if (nameidInnertext === user.name) {
      const { name, image, comments } = user;

      const imageEl = document.createElement("img");
      const nameEl = document.createElement("h2");

      imageEl.src = user.image;
      nameEl.innerText = user.name;

      for (let i = 0; i < 3; i++) {
        if (!user.posts[i]) {
          break;
        }
        console.log(user.posts[i]);
        const commentsEl = document.createElement("p");
        commentsEl.innerText = user.posts[i].bread;
        userposts.append(commentsEl);
      }
      const userscommentsBtn = document.createElement("button");
      const userspostssBtn = document.createElement("button");

      userscommentsBtn.innerText = "comments";
      userspostssBtn.innerText = "posts";

      userBox.append(
        nameEl,
        imageEl,
        userscommentsBtn,
        userspostssBtn,
        userposts
      );
      userscommentsBtn.addEventListener("click", (event) => {
        console.log('name in button is: ' + nameidInnertext);
      });
      userposts.addEventListener("click", (event) => {
        for (let i = 0; i < user.posts.length; i++) {
          if (!user.posts[i]) {
            break;
          }
          console.log(user.posts[i]);
          const commentsEl = document.createElement("p");
          commentsEl.innerText = user.posts[i].bread;
          userposts.append(commentsEl);
        }
      });
      usersDiv.append(userBox);
      console.log(name, imageEl);
    }
  }
}

export { displayoneuser };
