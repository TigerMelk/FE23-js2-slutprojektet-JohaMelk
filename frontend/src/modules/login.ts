
const logInForm = document.getElementById("logInForm") as HTMLFormElement;
const registerForm = document.getElementById("registerForm") as HTMLFormElement;
const switchToRegister = document.getElementById("switchToRegister")!;
const switchToLogIn = document.getElementById("switchToLogIn")!;
const logIn = document.getElementById("logIn")!;
const createAccount = document.getElementById("createAccount")!;
const logInButton = document.getElementById("logInButton") as HTMLButtonElement;
const registerButton = document.getElementById("registerButton") as HTMLButtonElement;

const showRegisterForm = () => {
    logInForm.classList.add("hide");
    registerForm.classList.remove("hide");
    logIn.classList.add("hide");
    createAccount.classList.remove("hide");
};

const showLoginForm = () => {
    logInForm.classList.remove("hide");
    registerForm.classList.add("hide");
    logIn.classList.remove("hide");
    createAccount.classList.add("hide");
};

switchToRegister.addEventListener("click", (event) => {
    event.preventDefault();
    showRegisterForm();
});

switchToLogIn.addEventListener("click", (event) => {
    event.preventDefault();
    showLoginForm();
});

logInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    
 
    console.log("Logging in with", username, password);


    logInForm.reset();

});

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = (document.getElementById("registerUsername") as HTMLInputElement).value;
    const password = (document.getElementById("registerPassword") as HTMLInputElement).value;
    const profilePic = (document.getElementById("confirmRegisterPassword") as HTMLInputElement).files![0];
    
    console.log("Registering with", username, password, profilePic.name);

    registerForm.reset();

    showLoginForm();
});


const showMainContent = () => {
    const frontPage = document.getElementById("frontPage") as HTMLElement;
    const mainContent = document.getElementById("main") as HTMLElement;

    frontPage.classList.add("hide");


    mainContent.classList.remove("hide");
};


logInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    showMainContent();


    logInForm.reset();
});


registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    showMainContent();

    registerForm.reset();
});

