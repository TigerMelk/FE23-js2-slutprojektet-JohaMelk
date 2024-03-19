
async function fetchData() {
    const baseUrl:string = 'https://example.com'
    
    const url = baseUrl + ".json";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data
}
export {fetchData}