import { User, Comment} from "./types.ts";

//Displays person used bit fetch trough id
async function displayPerson(dataPerson:User) {
    const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
  const userBox = document.createElement("div");
  const userposts = document.createElement("div")
const commentsEl = document.createElement("p");

  const {name, image, comments} = dataPerson;

    const imageEl = document.createElement("img");
    const nameEl = document.createElement("h2");

    imageEl.src = dataPerson.image
    imageEl.classList.add("imgg")
    nameEl.innerText = dataPerson.name;
    
    console.log(dataPerson.posts)
    for (let i = 0; i>(dataPerson.posts).length; i++) {
        console.log(dataPerson.posts[i])
        const commentsEl = document.createElement("p");
        commentsEl.innerText = dataPerson.posts[i].bread;
        userposts.append(commentsEl)
        
      }

      userBox.append(
        nameEl,
        imageEl,
        userposts
      );
      userBox.classList.add("center")
      usersDiv.append(userBox);
      console.log(name, imageEl)
}

export {displayPerson}