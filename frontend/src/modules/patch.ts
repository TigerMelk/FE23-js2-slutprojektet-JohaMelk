async function patcher(user) {
  const baseUrl: string = "https://example.com";

  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const url = baseUrl + user + ".json";

  const content = {};

  const options = {
    method: "PATCH",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(url, options);
}

export { patcher };
