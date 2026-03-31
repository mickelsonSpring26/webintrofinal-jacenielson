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

    GetMovies().then((movies) => {
      movieGrid.replaceChildren();

      if (movies.length === 0) {
        movieGrid.textContent = "No movies currently playing.";
        return;
      }

      movies.forEach(movie => {
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
      })
    });

    section.append(titleElement, movieGrid);
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
