type User = {
  id: string;
  name: string;
  password: string;
  image: string;
  admin: boolean;
  comments: [];
  posts: Pots[];
};
type Pots ={
    postId: string,
    userId: string,
    title: string,
    bread; string
    comments: []
}


async function displayPosts(data: User[]) {
    const postsBox = document.querySelector("#posters") as HTMLDivElement;

  for (const user of data) {
    const { posts } = user;
    console.log("i post")

    for (const post of posts) {
        const postEl = document.createElement("p");
        postEl.innerText = post.bread;
        postsBox.append(postEl)
        
    }
}

}

export { displayPosts }
