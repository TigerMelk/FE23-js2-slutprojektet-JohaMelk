#fe23-js2-slutprojekt-JaJoMe
Final assignment - course Javascript 2 (FE23 Grit Academy)

## Group: JaJoMe

- Melker Dahl
- Johanna Östling
- Javad Jananeh
<details>
<summary><h1>Backend functions</h1></summary>

<details><summary>
    <h3>functions found in handledatabase.ts</h3>
</summary>

#### readDatabase()

> Reads db.json and returns the object

#### writeDatabase()

> Rewrites db.json with new additions to the users array

</details>
<details>
    
<summary>
        <h3>functions found in users.ts</h3>
    </summary>
    
    #### getUsers()
    
    > Uses readDatabase() and returns the users array in db.json
    
    #### getUsersWithoutPassword
    
    > Same as getUsers() but without the user.password property
    
    #### getUser(id)
    
    > Returns a single user by using find() to match the user.id provided in the paramater
    
    #### logIn(userName, userPassword)
    
    > Loops over getUsers() and returns a single userWithoutPassword if user.name and user.password matches the parameters
    >
    > **json format for this is:**_{"name": "username","password":"password"}_
    
    #### getUserData(userId,dataType)
    
    > Uses getUser(userId) and returns either the user.comments array or the user.posts array depending on the dataType paramater (either "comments" or "posts")
    >
    > **json format for this is:**_{"userId": "user.id","dataType":"comments"|"posts"}_
    
    #### addUser(user)
    
    > Creates a new user and adds it to the users array if the user.name is unique. user.id is randomly generated with crypto.randomUUID(). returns the user excluding the password
    >
    > **json format for this is:**_{"name":"name","password":"password","image":"src for img"}_
    
    #### deleteUser(id)
    
    > Deletes the user whose user.id matches the id provided in the paramater
</details>

<details>
    <summary>
        <h3>functions found in posts.ts</h3>
    </summary>
    
    #### getPost(userId,postId)
    
    > Uses getUser(userid) and returns the post if post.id matches the postId provided in the paramater
    >
    > **json format for this is:**_{"userId":"user.id","postId":"user.posts.postId"}_
    
    #### getCategory(category)
    
    > Returns an array with all posts that matches post.category to the category provided in the paramater
    >
    > **json format for this is:**_{"category":"League of Legends" | "Bloodborne" | "Palworld"}_
    
    #### addPost(userId, post)
    
    > Creates a new post object and pushes it into user.posts array in the user whose user.id matches the userId provided in the paramater
    >
    > **json format for this is:**_{ "title": "post title","bread": "post content","category":"League of Legends" | "Bloodborne" | "Palworld", "comments":[]}_
    
    #### deletePost(userId, postId)
    
    > Deletes a post object if the user.id and posts.postId matches the userId and postId provided in the paramaters
    >
    > **json format for this is:**_{"userId":"user.id","postId":"user.posts.postId"}_
</details>
<details>
    
    <summary>
        <h3>functions found in comments.ts</h3>
    </summary>
    
    #### addComment(userId,postId,commentText)
    
    > Creates a new comment and pushes it into the posts.post.comments array as well as the user.comments array of the user who made the request.
    >
    > **json format for this is:**_{"userId":"user.id","postId":"user.posts.postId","commentText":"the comment"}_
    
    #### deleteComment(commentId)
    
    > Deletes the comment that matches the user.comments.commentId with the commentId provided in the paramater.
    >
    > **json format for this is:**_{"commentId":"user.comments.comment.commentId"}_
</details>

</details>
