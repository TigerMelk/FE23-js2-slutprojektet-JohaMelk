import { fetchData } from "./modules/fetch.ts";
import { displayUsers } from "./modules/displayusers.ts";
import { displayPosts } from "./modules/displayposts.ts";
import { displayComments } from "./modules/displaycomments.ts";
// import { displayLoggedin } from "./modules/displaylogin.ts"
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
.then(displayUsers)
// .then(displayLoggedin)



//Pushing post button
const postsBtn = document.querySelector("#postsBtn") as HTMLButtonElement

postsBtn.addEventListener('click', () =>{
fetchData()
.then(displayPosts)
})


//Pushing comments button
const commentsBtn = document.querySelector("#commentsBtn") as HTMLButtonElement

commentsBtn.addEventListener('click', () =>{
    fetchData()
    .then(displayComments)
    })

//From
// Function to handle page transition from Login to Signup
function goToSignup(): void {
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');

    if (login && signup) {
        login.style.display = 'none';
        signup.style.display = 'block';
    }
}

// Function to handle page transition from Signup to Login
function goToLogin(): void {
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');

    if (login && signup) {
        login.style.display = 'block';
        signup.style.display = 'none';
    }
}

// Event listeners to trigger page transitions
document.getElementById('goToSignup')?.addEventListener('click', goToSignup);
document.getElementById('goTologin')?.addEventListener('click', goToLogin);
