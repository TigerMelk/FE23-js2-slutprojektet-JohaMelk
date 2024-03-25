import { fetchData } from "./modules/fetch.ts";
import { displayUser } from "./modules/displayusers.ts";

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

