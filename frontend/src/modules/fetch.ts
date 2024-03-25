
async function fetchData() {
    
    const url = 'http://localhost:3000/api/'
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data
}

// type User = {
//     id: string,
//     name: string,
//     password: string
//     image: string,
//     admin: boolean
//     comments: [],
//     posts: []
// }

export {fetchData}