async function addcomment(userinput) {
  console.log("in comment :" + userinput)
 
  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const content = {
      userId: "2c175723-74ba-4ffc-9fa8-e66372e9311d",
      postId: "55ffffe1-26de-43c8-9f66-055d6d8ac78f",
      commentText: userinput,
  };
  console.log(content);

  const baseUrl: string = 'http://localhost:3000/api/post/comment';

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
  