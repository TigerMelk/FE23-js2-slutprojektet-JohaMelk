import { displayComments } from "./displaycomments.ts";
import { addcomment } from "./addcomment.ts";
import { User, Comment, Post } from "./types.ts";






async function displayPosts(data: User[]) {
    const postsBox = document.querySelector("#posters") as HTMLDivElement;


  for (const user of data) {
    const { posts } = user;


    for (const post of posts) {
        const postEl = document.createElement("p");        
        const commentsBtn = document.createElement("button")
        postEl.innerText = post.bread;


        commentsBtn.innerText = "this posts comments"




        const formGiveComment = document.createElement('form')


        let userComment= document.createElement('input')
        userComment.name = 'usersComment'
        userComment.placeholder = 'comment this'


        const giveCommentsBtn = document.createElement('input')
        giveCommentsBtn.type= 'submit'
        giveCommentsBtn.value = "submit comment"
 
        formGiveComment.append(userComment, giveCommentsBtn)




        postsBox.append(postEl, commentsBtn, formGiveComment)






        commentsBtn.addEventListener('click', () => {
            displayComments(post)
        });


        giveCommentsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(userComment.value)
        addcomment(userComment.value)


      });


    }
}


}


export { displayPosts }