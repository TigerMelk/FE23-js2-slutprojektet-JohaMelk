async function login(data: any) {
	const url = "http://localhost:3000/users/login";
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		return { Error: "user not found" };
	}
	const user = await response.json();
	console.log("logged in user: ", user);
	return user;
}

export { login };
