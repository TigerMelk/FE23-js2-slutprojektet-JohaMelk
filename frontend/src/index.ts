import { fetchData } from "./modules/fetch.ts";
import { displayUsers } from "./modules/displayusers.ts";
import { displayPosts } from "./modules/displayposts.ts";

const userBtn = document.querySelector('#userBtn') as HTMLButtonElement
userBtn.addEventListener('click', () => {
fetchData().then(displayUsers);
});


const postsBtn = document.querySelector("#postsBtn") as HTMLButtonElement;
postsBtn.addEventListener("click", () => {
  fetchData().then(displayPosts);
});


        function goToSignup(): void {
            const login = document.getElementById('login');
            const signup = document.getElementById('signup');
            const frontpage = document.getElementById('frontpage');

            if (login && signup && frontpage) {
                login.style.display = 'none';
                signup.style.display = 'block';
                frontpage.style.display = 'block';
            }
        }

        function goToLogin(): void {
            const login = document.getElementById('login');
            const signup = document.getElementById('signup');
            const frontpage = document.getElementById('frontpage');

            if (login && signup && frontpage) {
                login.style.display = 'block';
                signup.style.display = 'none';
                frontpage.style.display = 'block';
            }
        }

        function goToFrontpage(): void {
            const login = document.getElementById('login');
            const signup = document.getElementById('signup');
            const frontpage = document.getElementById('frontpage');

            if (login && signup && frontpage) {
                login.style.display = 'none';
                signup.style.display = 'none';
                frontpage.style.display = 'block';
            }
        }

        document.getElementById('goToSignup')?.addEventListener('click', goToSignup);
        document.getElementById('goToLogin')?.addEventListener('click', goToLogin);
        document.getElementById('goToFrontpage')?.addEventListener('click', goToFrontpage);

        // const formEl = document.querySelector("form") as HTMLFormElement;

        // formEl.addEventListener("submit", handleForm);

        // async function handleForm(event: Event) {
        //     event.preventDefault();
        //     const userInput: string = (document.querySelector("input") as HTMLInputElement).value;
        //     // Call a function to handle the form submission (e.g., addcomment(userInput))
        //     // Ensure that addcomment function is defined to handle the user input appropriately.
        // }