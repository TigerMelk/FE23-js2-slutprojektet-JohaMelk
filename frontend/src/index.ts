import { fetchData } from "./modules/fetch.ts";
import { displayUsers } from "./modules/displayusers.ts";
import { displayPosts } from "./modules/displayposts.ts";
// import { displayPerson } from "./modules/displayPerson.ts";
import { login } from "./modules/melkers.ts";
//this is an example of use of one id, the one logged in
// fetchPerson("4eb0a3b0-6a1a-4d5c-b948-4b6eb3256c1a").then(displayPerson);

//Button that shows all users
const userBtn = document.querySelector("#userBtn") as HTMLButtonElement;
userBtn.addEventListener("click", () => {
	fetchData().then(displayUsers);
});

const loginForm = document.querySelector(
	"#logInForm"
) as HTMLFormElement | null;
const registerForm = document.querySelector(
	"#registerForm"
) as HTMLFormElement | null;
const loginSwitch = document.querySelector(
	"#switchToLogIn"
) as HTMLElement | null;
const registerSwitch = document.querySelector(
	"#switchToRegister"
) as HTMLElement | null;
const logIn = document.querySelector("#logIn") as HTMLInputElement | null;
const createAccount = document.querySelector(
	"#createAccount"
) as HTMLInputElement | null;

//button that displays all posts
const postsBtn = document.querySelector("#postsBtn") as HTMLButtonElement;
postsBtn.addEventListener("click", () => {
	fetchData().then(displayPosts);
});

///Form
// if (loginSwitch) {
// 	loginSwitch.addEventListener("click", () => {
// 		if (loginForm && registerForm) {
// 			loginForm.style.display = "block";
// 			registerForm.style.display = "none";
// 		}
// 	});
// }

// if (registerSwitch) {
// 	registerSwitch.addEventListener("click", () => {
// 		if (loginForm && registerForm) {
// 			loginForm.style.display = "none";
// 			registerForm.style.display = "block";
// 		}
// 	});
// }

//go to home page

const navigateToHomePage = () => {
	const mainPage = document.getElementById("main") as HTMLElement;
	const frontPage = document.getElementById("frontPage") as HTMLElement;

	if (mainPage && frontPage) {
		frontPage.style.display = "none";

		mainPage.style.display = "block";
	}
};

// document.addEventListener("DOMContentLoaded", () => {
// 	const loginButton = document.getElementById(
// 		"logInButton"
// 	) as HTMLButtonElement;
// 	const registerButton = document.getElementById(
// 		"registerButton"
// 	) as HTMLButtonElement;

// 	loginButton.addEventListener("click", (event) => {
// 		event.preventDefault();
// 		navigateToHomePage();
// 	});

// 	registerButton.addEventListener("click", (event) => {
// 		event.preventDefault();
// 		navigateToHomePage();
// 	});
// });

document
	.getElementById("categoriesLeagueOfLegends")
	?.addEventListener("click", () => {
		// Hide all sections same for other rows
		document.querySelectorAll("section").forEach((section) => {
			section.classList.add("hide");
		});

		// Show the LeagueOfLegends section same for other rows
		document.getElementById("LeagueOfLegends")?.classList.remove("hide");
	});

document
	.getElementById("categoriesBloodborne")
	?.addEventListener("click", () => {
		document.querySelectorAll("section").forEach((section) => {
			section.classList.add("hide");
		});

		document.getElementById("Bloodborne")?.classList.remove("hide");
	});

document.getElementById("categoriesPalworld")?.addEventListener("click", () => {
	document.querySelectorAll("section").forEach((section) => {
		section.classList.add("hide");
	});

	document.getElementById("Palworld")?.classList.remove("hide");
});

const loginButton = document.getElementById("logInButton") as HTMLButtonElement;
loginButton.addEventListener("submit", (event) => {
	event.preventDefault();
	const nameInput = document.getElementById(
		"loginFormUsername"
	) as HTMLInputElement;

	const passwordInput = document.getElementById(
		"loginFormPassword"
	) as HTMLInputElement;

	const name = nameInput.value;
	const password = passwordInput.value;
	const data = {
		name: name,
		password: password,
	};
	login(data).then(() => {
		console.log("hejbitch");
	});
});
