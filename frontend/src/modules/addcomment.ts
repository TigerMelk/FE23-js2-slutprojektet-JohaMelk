async function addcomment(userinput) {
  console.log("in comment :" + userinput)
 
  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const content = {
    commentId: "testarcomments",
    userId: "0fb1e1af-df69-4908-99e4-cfb088e51fb2",
    postId: "14506121-37a4-49e9-97f9-63920a5326f0",
    commentText: userinput,
  };
  console.log(content);

  const baseUrl: string = 'http://localhost:3000/api/comments';

  const options = {
    method: "PATCH",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(baseUrl, options);
  const data = await res.json();


  return data
}

export { addcomment };
  