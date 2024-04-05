import { displayComments } from "./displaycomments.ts";
import { addcomment } from "./addcomment.ts";
import { User} from "./types.ts";




//Displays posts

async function displayPosts(data: User[]) {
    const postsBox = document.querySelector("#posters") as HTMLDivElement;


  for (const user of data) {
    const { posts } = user;


    for (const post of posts) {
        const postEl = document.createElement("p");        
        const commentsBtn = document.createElement("button")
        postEl.innerText = post.bread;


        commentsBtn.innerText = "this posts comments"



      //Form that would give users input to be added as an comment
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

          //when working this funktion would let you add a coment to a post
        giveCommentsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(userComment.value)
        addcomment(userComment.value)


      });


    }
}
}



export { displayPosts }