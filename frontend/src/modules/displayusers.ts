import { User, Comment, Post } from "./types.ts";
import { displayoneuser } from "./displayoneuser.ts";
import { fetchData } from "./fetch.ts";

//displays all users when pressed users-button

const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;


async function displayUsers(data:Array<User>) {
 
  for(const user of data){


  const {id, name} = user;



  const nameEl = document.createElement("h2");


  nameEl.innerText = user.name;




const userBox = document.createElement("div");


  userBox.append(
    nameEl,
  );


  usersDiv.append(userBox);
  console.log(name, id)
  userBox.classList
  nameEl.addEventListener('click', (event)=>{
  let nameid = event.currentTarget;
  let nameidInnertext = nameid.innerText
  console.log(nameid, nameidInnertext)
  displayoneuser(nameidInnertext, data)
  
})

}
}
export { displayUsers };
