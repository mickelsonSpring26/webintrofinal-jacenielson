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

    buttonElement.addEventListener("click", () => {
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

    const textElement = document.createElement("p");
    textElement.textContent = "Loading the latest movies...";

    movieGrid.append(textElement);
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

const nowPlayingLink = document.getElementById("now-playing-link");
nowPlayingLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderPage("nowPlaying");
});

renderPage("home");
