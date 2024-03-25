
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

async function displayUser(data:Array<User>) {
 
  for(const user of data){
  console.log(data) 

  const {id, name} = user;

  const idEl= document.createElement('p')
  const nameEl = document.createElement("h2");


  idEl.innerText = user.id;
  nameEl.innerText = user.name;


const userBox = document.createElement("div");

  userBox.append(
    nameEl,
    idEl
  );

  usersDiv.append(userBox);
}
}
export { displayUser };
