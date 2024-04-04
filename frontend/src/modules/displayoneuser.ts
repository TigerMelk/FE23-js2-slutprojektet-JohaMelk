import { User, Comment, Post } from "./types.ts";
  


async function displayoneuser(nameidInnertext, data) {
  console.log(nameidInnertext, 'in displey person');
  console.log(data, 'in displey person');

  const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;

  for(const user of data){
    if (nameidInnertext === user.name){

    const {name, image, comments} = user;

    const imageEl = document.createElement("img");
    const nameEl = document.createElement("h2");

    
    for (let i = 0; i < 3; i++) {

      console.log(user.posts)
      // const commentsEl = document.createElement("p");
      // commentsEl.innerText = user.posts.comments.comment;
      if (!user.posts[i]){
      break;
      }
    }
  
    imageEl.src = user.image
    nameEl.innerText = user.name;
  
  
  
  
  const userBox = document.createElement("div");
  
    userBox.append(
      nameEl,
      imageEl,
      // Comment
    );
  
    usersDiv.append(userBox);
    console.log(name, imageEl, )
    
  }
  }
  }

export { displayoneuser };
