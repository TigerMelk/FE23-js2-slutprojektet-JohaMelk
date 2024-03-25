import { fetchData } from "./modules/fetch.ts";
import { displayUser } from "./modules/displayusers.ts";
import { displayPosts } from "./modules/displayposts.ts";
import { displayComments } from "./modules/displaycomments.ts";

//submit from form
// formEl.addEventListener("submit", handleform);
// async function handleform(event: Event) {
//   event.preventDefault();
//   console.log("i handleForm");
//   const userinput: string = (
//     document.querySelector("input") as HTMLInputElement
//   ).value;
//   console.log(userinput);
//   return userinput
// }

fetchData()
// .then((data)=> console.log(data))
.then(displayUser)


const postsBtn = document.querySelector("#postsBtn") as HTMLButtonElement

postsBtn.addEventListener('click', () =>{
fetchData()
.then(displayPosts)
})

const commentsBtn = document.querySelector("#commentsBtn") as HTMLButtonElement

commentsBtn.addEventListener('click', () =>{
    fetchData()
    .then(displayComments)
    })
