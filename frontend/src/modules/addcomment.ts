async function addcomment(userinput) {
  console.log("in comment :" + userinput)
 
  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const content = {
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
  