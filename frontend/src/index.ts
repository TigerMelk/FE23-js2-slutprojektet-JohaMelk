import { Logindata, SingleUser, User } from "./modules/types.js";
import {
  displayPosts,
  displayUsers,
  displayPostDetails,
  errorMessageFunc,
  createUserLink,
} from "./modules/display.js";
import {
  login,
  getUsers,
  getCategories,
  addUser,
  addPost,
  addComment,
} from "./modules/fetch.js";
import {
  mainContainer,
  aside,
  categoryDiv,
  header,
  logOut,
  addNewPost,
  userBtn,
  usersDiv,
  addCommentForm,
  bloodborne,
  league,
  palworld,
  createForm,
  createAccountBtn,
  loginBtn,
  LogInForm,
} from "./functions/globalVariables.js";
import { clearContainer } from "./functions/utility.js";
import { categoryBtn } from "./functions/postActions.js";

// Check if user is logged in
const currentUserId: string = localStorage.getItem("userId") as string;
// If user is already logged in
if (currentUserId) {
  categoryDiv.classList.remove("hide");
  aside.classList.remove("hide");
  LogInForm.classList.add("hide");
  getUsers(currentUserId).then((user: User[] | SingleUser | User) => {
    const userName = createUserLink(user as User);
    header.append(userName);
    userName.addEventListener("click", (event: Event) => {
      event.preventDefault();
    });
  });
}

// Log in event
LogInForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  const usernameInput = document.querySelector("#username") as HTMLInputElement;
  const passwordInput = document.querySelector("#password") as HTMLInputElement;
  const username: string = usernameInput.value;
  const password: string = passwordInput.value;
  const data: Logindata = {
    name: username,
    password: password,
  };
  try {
    const user: User = await login(data);
    if (!user || !user.id) {
      console.log("invalid username or password");
      errorMessageFunc("Invalid username or password");
      LogInForm.reset();
      return;
    }

    localStorage.setItem("userId", user.id);
    categoryDiv.classList.remove("hide");
    aside.classList.remove("hide");
    LogInForm.classList.add("hide");
    console.log("logged in successfully");

    getUsers(user.id).then((user) => {
      const userName: HTMLAnchorElement = createUserLink(user as User);
      header.append(userName);
      location.reload();
    });
  } catch (error) {
    errorMessageFunc("Could not log in");
    LogInForm.reset();
  }
  LogInForm.reset();
});

// Log out event
logOut.addEventListener("click", (event: Event) => {
  event.preventDefault();
  localStorage.clear();
  categoryDiv.classList.add("hide");
  location.reload();
});

// display create form
createAccountBtn.addEventListener("click", (event: Event) => {
  event.preventDefault();
  LogInForm.classList.add("hide");
  createForm.classList.remove("hide");
  loginBtn.addEventListener("click", (event: Event) => {
    event.preventDefault();
    LogInForm.classList.remove("hide");
    createForm.classList.add("hide");
  });
});

// create new account form
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector(
    "#createUsername"
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    "#createPassword"
  ) as HTMLInputElement;
  const username: string = usernameInput.value;
  const password: string = passwordInput.value;
  const confirmInput = document.querySelector(
    "#confirmPassword"
  ) as HTMLInputElement;
  const confirm: string = confirmInput.value;
  const selectedImage = document.querySelector(
    "input[name='bild']:checked"
  ) as HTMLInputElement;
  const imgSrc = selectedImage.getAttribute("value") as string;
  if (password === confirm) {
    const data = {
      name: username,
      password: password,
      image: imgSrc,
    };
    addUser(data).then((response) => {
      if ("message" in response) {
        errorMessageFunc(response.message as string);
        LogInForm.reset();
      } else {
        createForm.classList.add("hide");
        LogInForm.classList.remove("hide");
        clearContainer(mainContainer);
        errorMessageFunc("Account successfully created");
      }
    });
  } else {
    errorMessageFunc("Passwords don't match");
  }
  createForm.reset();
});

// categories
bloodborne.addEventListener("click", (event: Event) => {
  event.preventDefault();
  categoryBtn(bloodborne);
});
league.addEventListener("click", (event: Event) => {
  event.preventDefault();
  categoryBtn(league);
});
palworld.addEventListener("click", (event: Event) => {
  event.preventDefault();
  categoryBtn(palworld);
});

// addpost
addNewPost.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#title") as HTMLInputElement;
  const breadInput = document.querySelector("#bread") as HTMLInputElement;
  const title: string = titleInput.value;
  const bread: string = breadInput.value;
  const categoryForPost: string = localStorage.getItem("category") as string;
  const data = {
    title: title,
    bread: bread,
    category: categoryForPost,
    comments: [],
  };
  addPost(currentUserId, data).then(() => {
    getCategories(categoryForPost).then((matchingPosts) => {
      displayPosts(matchingPosts, mainContainer);
    });
  });
  addNewPost.reset();
});

// addComment
addCommentForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const postId: string | null = localStorage.getItem("postId") as string;
  const theCommentInput = document.querySelector(
    "#commentBread"
  ) as HTMLInputElement;
  const theComment: string = theCommentInput.value;
  const commentData = {
    userId: currentUserId,
    postId: postId,
    commentText: theComment,
  };
  addComment(commentData).then(() => {
    displayPostDetails(postId as string);
  });
  addCommentForm.reset();
});

// all users aside
userBtn.addEventListener("click", (event: Event) => {
  event.preventDefault();
  getUsers("").then((data: User[] | SingleUser) => {
    clearContainer(usersDiv);
    displayUsers(data as User[]);
  });
});
