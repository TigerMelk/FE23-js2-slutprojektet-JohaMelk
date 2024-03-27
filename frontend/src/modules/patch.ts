async function patcher(user) {
  const baseUrl: string = 'http://localhost:3000/api/';

  const header = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const url = baseUrl + user;

  const content = {};

  const options = {
    method: "PATCH",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(url, options);
}

export { patcher };
