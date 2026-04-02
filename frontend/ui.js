import { GetMovies } from "/service.js";

const pages = {
  home: () => {
    const section = document.createElement("section");
    section.classList.add("welcome");

    const titleElement = document.createElement("h1");
    titleElement.textContent = "Welcome to Jason Stream";

    const bodyElement = document.createElement("p");
    bodyElement.textContent = "Trending movies, delivered to your screen.";

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("sw-button");
    buttonElement.textContent = "Start Watching";

    buttonElement.addEventListener("click", (e) => {
      e.preventDefault();
      renderPage("nowPlaying");
    });

    section.append(titleElement, bodyElement, buttonElement);
    return section;
  },

  nowPlaying: () => {
    const section = document.createElement("section");
    section.classList.add("now-playing");

    const titleElement = document.createElement("h1");
    titleElement.textContent = "Now Playing";

    const movieGrid = document.createElement("div");
    movieGrid.classList.add("movie-grid");

    const statusMessage = document.createElement("p");
    statusMessage.textContent = "Loading the latest movies...";
    movieGrid.append(statusMessage);

    const formElement = document.createElement("form");
    formElement.classList.add("movie-filter-form");

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Search for a title ...";
    searchBar.classList.add("movie-search-input");

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "SEARCH";
    submitBtn.classList.add("movie-submit-btn");

    formElement.append(searchBar, submitBtn);
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchTitle = searchBar.value.toLowerCase().trim();
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTitle),
      );
      renderMovieGrid(filteredMovies);
    });

    const renderMovieGrid = (moviesToDisplay) => {
      movieGrid.replaceChildren();
      
      if (moviesToDisplay.length === 0) {
        movieGrid.textContent = "No movies currently playing.";
        return;
      }

      moviesToDisplay.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const figureElement = document.createElement("figure");

        const posterElement = document.createElement("img");
        posterElement.src = movie.poster;
        posterElement.alt = movie.title;

        const figcaption = document.createElement("figcaption");

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;

        const ratingElement = document.createElement("div");
        ratingElement.classList.add("rating");
        ratingElement.textContent = `${movie.rating} Stars`;

        const genreElement = document.createElement("p");
        genreElement.textContent = movie.genre.join(" / ");

        figcaption.append(titleElement, ratingElement, genreElement);
        figureElement.append(posterElement, figcaption);
        card.append(figureElement);

        movieGrid.append(card);
      });
    }
    let allMovies = [];
    GetMovies().then((movies) => {
      movieGrid.replaceChildren();
      allMovies = movies;
      renderMovieGrid(allMovies);
    });

    section.append(titleElement, formElement, movieGrid);
    return section;
  },
};

const renderPage = (selectedpage) => {
  const mainContent = document.getElementById("main-content");
  mainContent.replaceChildren();

  const pageElement = pages[selectedpage]();
  mainContent.appendChild(pageElement);
};

const homeLink = document.getElementById("home-link");
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderPage("home");
});

const logoLink = document.getElementById("logo-link");
logoLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderPage("home");
});

const nowPlayingLink = document.getElementById("now-playing-link");
nowPlayingLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderPage("nowPlaying");
});

renderPage("home");
console.log(GetMovies());
