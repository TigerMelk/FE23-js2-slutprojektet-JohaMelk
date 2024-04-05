import { displayPosts, displayUsers } from "./modules/melkerdisplay.js";
import {
  login,
  getUsers,
  getCategories,
  addUser,
  getDataType,
  addPost,
  addComment,
} from "./modules/melkers";
// logged in user
const mainContainer = document.querySelector(
  "#mainContainer"
) as HTMLDivElement;
const userId = localStorage.getItem("userId") as string;
const aside = document.querySelector("aside") as HTMLButtonElement;

const form = document.querySelector("#loginForm") as HTMLFormElement;
const categoryDiv = document.querySelector("#categoryDiv") as HTMLDivElement;
const profileName = document.querySelector(
  "#profileName"
) as HTMLHeadingElement;
if (userId) {
  form.classList.add("hide");
  getUsers(userId).then((user) => {
    const profilePosts = document.querySelector("#posts") as HTMLButtonElement;
    const profileComments = document.querySelector(
      "#comments"
    ) as HTMLButtonElement;
    profileComments.addEventListener("click", (event) => {
      event.preventDefault();
      getDataType(userId, "comments").then((userdata) => {
        displayPosts(userdata);
      });
    });
    profilePosts.addEventListener("click", (event) => {
      event.preventDefault();
      getDataType(userId, "posts").then((userdata) => {
        displayPosts(userdata);
      });
    });
    const profileName = document.querySelector(
      "#profileName"
    ) as HTMLHeadingElement;
    const profile = document.querySelector("#profileDiv") as HTMLDivElement;

    profile.classList.remove("hide");
    categoryDiv.classList.remove("hide");
    aside.classList.remove("hide");

    profileName.innerText = user.name;
  });
}

console.log(userId);
//! login

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector("#username") as HTMLInputElement;
  const passwordInput = document.querySelector("#password") as HTMLInputElement;

  const username = usernameInput.value;
  const password = passwordInput.value;
  const data = {
    name: username,
    password: password,
  };
  try {
    login(data).then((user) => {
      localStorage.setItem("userId", user.id);
      profile.classList.remove("hide");
      profileName.innerText = user.name;
      categoryDiv.classList.remove("hide");
      aside.classList.remove("hide");
      console.log("logged in successfully");
      displayUsers(user);
    });
  } catch {
    console.log("couldnt log in");
  }
});

//! create account
const createForm = document.querySelector("#newUser") as HTMLFormElement;
const createAccount = document.querySelector("#createBtn") as HTMLButtonElement;
const profile = document.querySelector("#profileDiv") as HTMLDivElement;
createAccount.addEventListener("click", (event) => {
  event.preventDefault();
  form.classList.add("hide");
  createForm.classList.remove("hide");
});
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector(
    "#createUsername"
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    "#createPassword"
  ) as HTMLInputElement;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmInput = document.querySelector(
    "#confirmPassword"
  ) as HTMLInputElement;
  const confirm = confirmInput.value;
  const selectedImage = document.querySelector(
    "input[name='bild']:checked"
  ) as HTMLInputElement;
  const imgSrc = selectedImage.value;
  if (password === confirm) {
    const data = {
      name: username,
      password: password,
      image: imgSrc,
    };
    addUser(data).then((newUser) => {
      console.log(newUser);
    });
  }
});

//! categories
const bloodborne = document.querySelector("#category1") as HTMLButtonElement;
const league = document.querySelector("#category2") as HTMLButtonElement;
const palworld = document.querySelector("#category3") as HTMLButtonElement;

bloodborne.addEventListener("click", (event) => {
  event.preventDefault();
  categoryBtn(bloodborne);
});
league.addEventListener("click", (event) => {
  event.preventDefault();
  categoryBtn(league);
});

palworld.addEventListener("click", (event) => {
  event.preventDefault();
  categoryBtn(palworld);
});
function categoryBtn(btn) {
  mainContainer.innerHTML = "";
  profile.classList.add("hide");
  addNewPost.classLIst.remove("hide");
  localStorage.removeItem("category");
  localStorage.setItem("category", btn.value);
  getCategories(btn.value).then((matchingPosts) => {
    displayPosts(matchingPosts);
    console.log("jek");
  });
}
// ! addpost
const addNewPost = document.querySelector("#addPost") as HTMLFormElement;
addNewPost.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#title") as HTMLInputElement;
  const breadInput = document.querySelector("#bread") as HTMLInputElement;
  const title = titleInput.value;
  const bread = breadInput.value;
  const categoryForPost = localStorage.getItem("category") as string;
  console.log(categoryForPost);
  const data = {
    title: title,
    bread: bread,
    category: categoryForPost,
    comments: [],
  };
  addPost(userId, data).then(() => {
    getCategories(categoryForPost).then((matchingPosts) => {
      displayPosts(matchingPosts);
      console.log("yeaha");
    });
  });
});
// ! addComment

// ! aside
const userBtn = document.querySelector("#usersAside") as HTMLButtonElement;
userBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getUsers("").then((data) => {
    displayUsers(data);
  });
});
