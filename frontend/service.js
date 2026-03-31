export async function GetMovies(){
    const url = "http://localhost:5126/movies";
    const response = await fetch(url);
    const data = response.json();
    return data;
}