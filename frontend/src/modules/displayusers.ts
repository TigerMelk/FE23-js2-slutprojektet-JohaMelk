
type User = {
    id: string,
    name: string,
    password: string
    image: string,
    admin: boolean
    comments: [],
    posts: []
}

const usersDiv = document.querySelector("#usersDiv") as HTMLDivElement;

async function displayUsers(data:Array<User>) {
 
  for(const user of data){

  const {name} = user;

  const idEl= document.createElement('p')
  const nameEl = document.createElement("h2");

  nameEl.innerText = user.name;


const userBox = document.createElement("div");

  userBox.append(
    nameEl,
  );

  usersDiv.append(userBox);
}
}
export { displayUsers };
