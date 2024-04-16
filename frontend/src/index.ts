//! ////////////////////////////////////////
//! ////////////////////////////////////////
//! ////////////////////////////////////////

import {
  displayPosts,
  displayUserProfile,
  displayComments,
  displayUsers,
  displayPostDetails,
  createUserLink,
} from "./modules/melkerdisplay.js";
import {
  login,
  getUsers,
  getCategories,
  getPost,
  addUser,
  getDataType,
  addPost,
  addComment,
} from "./modules/melkers";

const mainContainer = document.querySelector(
  "#mainContainer"
) as HTMLDivElement;
const userId = localStorage.getItem("userId") as string;
const aside = document.querySelector("aside") as HTMLButtonElement;
const addNewPost = document.querySelector("#addPost") as HTMLFormElement;
const loggedInUser = document.querySelector("#userName") as HTMLHeadingElement;
const logOut = document.querySelector("#logOut") as HTMLButtonElement;
const form = document.querySelector("#loginForm") as HTMLFormElement;
const categoryDiv = document.querySelector("#categoryDiv") as HTMLDivElement;
const userBtn = document.querySelector("#usersAside") as HTMLButtonElement;
const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;
const profileName = document.querySelector(
  "#profileName"
) as HTMLHeadingElement;
const header = document.querySelector("header") as HTMLDivElement;
const profileImg = document.querySelector("#profileImg") as HTMLImageElement;
let usersDisplayed = false;

if (userId) {
  categoryDiv.classList.remove("hide");
  aside.classList.remove("hide");
  form.classList.add("hide");
  getUsers(userId).then((user) => {
    const userName = createUserLink(user);
    header.append(userName);
    userName.addEventListener("click", (event) => {
      event.preventDefault();
      // mainContainer.innerHTML = ''
    });
  });
}

//! login

form.addEventListener("submit", async (event) => {
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
    const user = await login(data);
    if (!user || !user.id) {
      console.log("invalid username or password");
      form.reset();
      return;
    }

    localStorage.setItem("userId", user.id);
    categoryDiv.classList.remove("hide");
    aside.classList.remove("hide");
    form.classList.add("hide");
    console.log("logged in successfully");

    getUsers(user.id).then((user) => {
      const userName = createUserLink(user);
      header.append(userName);
    });
  } catch (error) {
    console.log("error logging in", error);
  }
  form.reset();
});

// ! logOut
logOut.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  categoryDiv.classList.add("hide");
  location.reload();
});
//! create account
const createForm = document.querySelector("#newUser") as HTMLFormElement;
const createAccount = document.querySelector("#createBtn") as HTMLButtonElement;
const profile = document.querySelector("#profileDiv") as HTMLDivElement;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;
createAccount.addEventListener("click", (event) => {
  event.preventDefault();
  form.classList.add("hide");
  createForm.classList.remove("hide");
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    form.classList.remove("hide");
    createForm.classList.add("hide");
  });
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
      createForm.classList.add("hide");
      form.classList.remove("hide");
    });
  }
  createForm.reset();
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
  addNewPost.classList.remove("hide");
  addCommentForm.classList.add("hide");
  localStorage.removeItem("category");
  localStorage.setItem("category", btn.value);
  getCategories(btn.value).then((matchingPosts) => {
    displayPosts(matchingPosts, mainContainer);
    console.log("jek");
  });
}
// ! addpost
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
      displayPosts(matchingPosts, mainContainer);
      console.log("yeaha");
    });
  });
  addNewPost.reset();
});
// ! addComment
const addCommentForm = document.querySelector("#addComment") as HTMLFormElement;
addCommentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const postId = localStorage.getItem("postId");
  const theCommentInput = document.querySelector(
    "#commentBread"
  ) as HTMLInputElement;
  const theComment = theCommentInput.value;
  const commentData = {
    userId: userId,
    postId: postId,
    commentText: theComment,
  };
  addComment(commentData).then(() => {
    displayPostDetails(postId as string);
  });
  addCommentForm.reset();
});
// ! aside

userBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getUsers("").then((data) => {
    usersDiv.innerHTML = "";
    displayUsers(data);
  });
});

// const deleteBtn = document.createElement('button') as HTMLButtonElement
// deleteBtn.innerText= 'X'
// .append(deleteBtn);
// deleteBtn.addEventListener("click", async function (event) {
// console.log("körs i delete");
// }
// };
// }
