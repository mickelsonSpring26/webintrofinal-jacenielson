import {
  GetMovies,
  GetFavorites,
  SaveFavorite,
  RemoveFavorite,
} from "./service.js";

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

    const contactFormDiv = document.createElement("div");
    contactFormDiv.classList.add("contact-form");

    const titleH3 = document.createElement("h3");
    titleH3.textContent = "Contact Us";

    const formElement = document.createElement("form");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Your Email";
    emailInput.required = true;

    const ratingLabel = document.createElement("label");
    ratingLabel.textContent = "Rate us (1-10):";
    const ratingInput = document.createElement("input");
    ratingInput.type = "number";
    ratingInput.min = "1";
    ratingInput.max = "10";
    ratingInput.value = "10";

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("form-buttons");

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.classList.add("formBtn");

    const clearBtn = document.createElement("button");
    clearBtn.type = "reset";
    clearBtn.textContent = "Clear";
    clearBtn.classList.add("formBtn");

    buttonsDiv.append(submitBtn, clearBtn);
    formElement.append(emailInput, ratingLabel, ratingInput, buttonsDiv);
    contactFormDiv.append(titleH3, formElement);

    section.append(titleElement, bodyElement, buttonElement, contactFormDiv);
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
    submitBtn.textContent = "SEARCH";
    submitBtn.classList.add("movie-submit-btn");

    const filterBtn = document.createElement("select");
    filterBtn.classList.add("movie-filter-dropdown");

    const options = [
      { text: "Sort By: Default", value: "default" },
      { text: "Rating: Highest to Lowest", value: "high" },
      { text: "Rating: Lowest to Highest", value: "low" },
    ];

    options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.text;
      filterBtn.appendChild(element);
    });

    filterBtn.addEventListener("change", (e) => {
      const choice = e.target.value;

      let sortedMovies = [...allMovies];
      if (choice === "high") {
        sortedMovies.sort((a, b) => b.rating - a.rating);
      } else if (choice === "low") {
        sortedMovies.sort((a, b) => a.rating - b.rating);
      } else {
        sortedMovies = allMovies;
      }

      renderMovieGrid(sortedMovies);
    });

    const searchDiv = document.createElement("div");
    searchDiv.classList.add("search-group");
    searchDiv.append(searchBar, submitBtn);

    formElement.append(searchDiv, filterBtn);

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
        card.draggable = true;

        card.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", movie.id);
        });

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
        genreElement.classList.add("genre")
        genreElement.textContent = movie.genre.join(" / ");

        const showTimeContainer = document.createElement("div");
        showTimeContainer.classList.add("movie-showtimes");

        const showTimeTitleElement = document.createElement("h4");
        showTimeTitleElement.textContent = "Showtimes:";

        const showTimeList = document.createElement("ul");
        showTimeList.classList.add("showtime-list");

        movie.showtimes.forEach((time) => {
          const listItemElement = document.createElement("li");
          listItemElement.textContent = time;
          showTimeList.append(listItemElement);
        });

        const detailLinkElement = document.createElement("a");
        detailLinkElement.classList.add("detailBtn");
        detailLinkElement.href = `details.html?id=${movie.id}`;
        detailLinkElement.textContent = "VIEW DETAILS";

        card.addEventListener("click", (e) => {
          e.preventDefault();
          window.history.pushState({}, "", `?id=${movie.id}`);
          renderPage("movieDetails");
        });

        showTimeContainer.append(showTimeTitleElement, showTimeList);
        figcaption.append(
          titleElement,
          ratingElement,
          genreElement,
          showTimeContainer,
          detailLinkElement,
        );
        figureElement.append(posterElement, figcaption);
        card.append(figureElement);
        movieGrid.append(card);
      });
    };
    let allMovies = [];
    GetMovies().then((movies) => {
      movieGrid.replaceChildren();
      allMovies = movies;
      renderMovieGrid(allMovies);
    });

    const watchlistDiv = document.createElement("div");
    watchlistDiv.id = "watchlist-footer";
    watchlistDiv.classList.add("watchlist-container");

    const watchlistH3 = document.createElement("h3");
    watchlistH3.textContent = "My Watchlist";

    const dropDiv = document.createElement("div");
    dropDiv.id = "watchlist-items";
    dropDiv.classList.add("watchlist-drop-zone");

    const placeholder = document.createElement("p");
    placeholder.classList.add("placeholder-text");
    placeholder.textContent = "Drag a movie here to save for later!";

    dropDiv.append(placeholder);
    watchlistDiv.append(watchlistH3, dropDiv);

    const setupDropLogic = (area) => {
      area.addEventListener("dragover", (e) => {
        e.preventDefault();
        area.classList.add("hover");
      });

      area.addEventListener("dragleave", () => {
        area.classList.remove("hover");
      });

      area.addEventListener("drop", (e) => {
        e.preventDefault();
        area.classList.remove("hover");

        const movieId = e.dataTransfer.getData("text/plain");

        GetMovies().then((movies) => {
          const movie = movies.find((m) => m.id == movieId);
          if (movie) {
            renderWatchlistMovie(movie, area);
          }
        });
      });
    };
    setupDropLogic(dropDiv);

    const renderWatchlistMovie = (movie, area) => {
      const placeholder = area.querySelector(".placeholder-text");
      if (placeholder) {
        placeholder.remove();
      }
      const movieWrapper = document.createElement("div");
      movieWrapper.classList.add("watchlist-item-wrapper");

      const imgElement = document.createElement("img");
      imgElement.src = movie.poster;
      imgElement.alt = movie.title;
      imgElement.classList.add("watchlist-thumbnail");

      imgElement.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.pushState({}, "", `?id=${movie.id}`);
        renderPage("movieDetails");
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.classList.add("remove-item-btn");

      removeBtn.addEventListener("click", () => {
        movieWrapper.remove();
        if (area.children.length === 0) {
          area.appendChild(placeholder);
        }
      });
      movieWrapper.append(imgElement, removeBtn);
      area.appendChild(movieWrapper);
    };

    section.append(titleElement, formElement, movieGrid, watchlistDiv);
    return section;
  },
  movieDetails: () => {
    const sectionElement = document.createElement("section");

    const parameters = new URLSearchParams(window.location.search);
    const movieId = parameters.get("id");

    if (!movieId) {
      sectionElement.textContent = "No movie selected.";
      return sectionElement;
    }

    GetMovies().then((movies) => {
      const selectedMovie = movies.find((m) => m.id == movieId);

      if (selectedMovie) {
        const titleElement = document.createElement("h1");
        titleElement.textContent = selectedMovie.title;

        const posterElement = document.createElement("img");
        posterElement.src = selectedMovie.poster;
        posterElement.classList.add("detail-poster");

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("detail-description");
        descriptionElement.textContent =
          selectedMovie.description || "No description available.";

        const backBtnElement = document.createElement("button");
        backBtnElement.textContent = "Back to Movies";
        backBtnElement.classList.add("detailBtn");

        backBtnElement.addEventListener("click", () => {
          window.history.pushState({}, "", "/");
          renderPage("nowPlaying");
        });

        const FavButtonElement = document.createElement("button");
        FavButtonElement.classList.add("detailBtn", "favBtn");

        let isFavorite = GetFavorites().some((f) => f.id === selectedMovie.id);

        const updateFavoriteUI = () => {
          if (isFavorite) {
            FavButtonElement.textContent = "Remove Favorite";
            FavButtonElement.classList.add("isFavorite");
          } else {
            FavButtonElement.textContent = "Add to Favorites";
            FavButtonElement.classList.remove("isFavorite");
          }
        };
        updateFavoriteUI();

        FavButtonElement.addEventListener("click", () => {
          if (isFavorite) {
            RemoveFavorite(selectedMovie.id);
            isFavorite = false;
          } else {
            SaveFavorite(selectedMovie);
            isFavorite = true;
          }
          updateFavoriteUI();
        });

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("details-content");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("detail-info");

        infoDiv.append(
          titleElement,
          descriptionElement,
          FavButtonElement,
          backBtnElement,
        );
        contentDiv.append(posterElement, infoDiv);

        sectionElement.append(contentDiv);
      } else {
        sectionElement.textContent = "Movie not found.";
      }
    });
    return sectionElement;
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
