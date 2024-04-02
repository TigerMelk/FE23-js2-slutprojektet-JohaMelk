
async function fetchData() {
    
    const url = 'http://localhost:3000/api/users'
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data
}


export {fetchData}