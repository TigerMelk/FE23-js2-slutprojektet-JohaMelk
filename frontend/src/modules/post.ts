async function post() {
  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const content = {};
  console.log(content);

  const baseUrl: string = "https://example.com";

  const options = {
    method: "POST",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(baseUrl, options);
  const data = await res.json();
}

export { post };
