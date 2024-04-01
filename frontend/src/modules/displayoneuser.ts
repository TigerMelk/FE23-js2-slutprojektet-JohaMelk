import { User, Comment, Post } from "./types.ts";
import { fetchData } from "./fetch.ts";
  


async function displayoneuser(nameid: string) {
  console.log(nameid, 'in displey person');

 
  //     if (user.id === ){

  //   const {id, name, image, comments} = user;

  //   const idEl= document.createElement('p')
  //   const nameEl = document.createElement("h2");
  //   const imageEl = document.createElement('img')

  //   imageEl.src = user.image;
  //   idEl.innerText = user.id;
  //   nameEl.innerText = user.name;

  // const userclicked= document.createElement("div");

  //   userclicked.append(
  //     nameEl,
  //     idEl,
  //     imageEl
  //   );

  //   }
}

export { displayoneuser };
