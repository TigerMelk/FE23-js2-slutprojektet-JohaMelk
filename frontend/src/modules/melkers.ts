async function login(data: any) {
  return fetchShortcut("users/login", "POST", data);
}
async function getUsers(id: string) {
  let path: string;
  if (id) {
    path = `users/${id}`;
  } else {
    path = "users";
  }
  return fetchShortcut(path, "GET");
}
async function getCategories(data: string) {
  return fetchShortcut("posts/category", "POST", { category: data });
}
async function getDataType(userId: string, dataType: string) {
  return fetchShortcut("users/userdata", "POST", {
    userId: userId,
    dataType: dataType,
  });
}
async function addUser(data: any) {
  return fetchShortcut("users/", "POST", data);
}
async function addPost(id: string, data: any) {
  return fetchShortcut(`posts/${id}`, "PATCH", data);
}

async function addComment(data: any) {
  return fetchShortcut("comments/", "PATCH", data);
}
///////////////////////////////////////////////////

async function fetchShortcut(
  path: string,
  method: string,
  data:
    | { category: string }
    | { userId: string; dataType: string }
    | null = null
) {
  let url = `http://localhost:3000/api/${path}`;
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    return { error: `Failed to fetch ${method} request` };
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export {
  login,
  getUsers,
  getCategories,
  getDataType,
  addUser,
  addPost,
  addComment,
};
