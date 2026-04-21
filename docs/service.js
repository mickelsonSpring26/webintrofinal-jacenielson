
export async function GetMovies() {
  //  const url = "http://localhost:5126/movies";
  const url = "https://webintrofinal-jacenielson.onrender.com/movies";
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export const GetFavorites = () => {
  const favorites = localStorage.getItem("jasonStream_favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const SaveFavorite = (movie) => {
  let favorites = GetFavorites();
  const exists = favorites.find((f) => f.id === movie.id);

  if (!exists) {
    favorites.push(movie);
    localStorage.setItem("jasonStream_favorites", JSON.stringify(favorites));
    alert(`${movie.title} added to your favorites!`);
  } else {
    alert("This movie is already in your favorites.");
  }
};

export const RemoveFavorite = (movieId) => {
  let favorites = GetFavorites();
  favorites = favorites.filter((m) => m.id !== movieId);
  localStorage.setItem("jasonStream_favorites", JSON.stringify(favorites));
};
