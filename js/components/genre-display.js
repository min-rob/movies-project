import { getMovies, getGenres, getMovieByGenreId } from "../api/movies.js";
import { movieGenre, renderMovieCards } from "./cards.js";

const createContainer = async (genre) => {
    const page = document.querySelector(".selected-movies");
    page.classList.add(`${genre}-movies`);
    page.innerHTML = `
    <h2>${genre} Movies: </h2>
    <div class="${genre}-card-container" id="card-container"></div>
    `;
    return page;
};

const createSpinner = () => {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border", "hidden");
    spinner.setAttribute("role", "status");
    spinner.setAttribute("id", "spinner");
    spinner.innerHTML = `
        <span class="visually-hidden">Loading...</span>`;
    return spinner;
};

const getGenreNameById = async (id) => {
    const genres = await getGenres();
    const foundGenre = genres.find((genre) => genre.id === id);
    return foundGenre ? foundGenre.name : "Genre not found"; // Return the genre name or a default message
};

const userSelection = async (e) => {
    const selectionId = e.target.getAttribute("id");
    const genreName = await getGenreNameById(parseFloat(selectionId));
    const container = await createContainer(genreName);
    const parentContainer = document.querySelector(".movies-content");
    const selectedMovies = document.querySelector(".selected-movies");
    const searchedMovies = document.querySelector(".searched-movies");
    const defaultView = document.querySelector(".default-movies");

    const spinner = createSpinner();
    parentContainer.appendChild(spinner);

    spinner.classList.remove("hidden");

    const genres = await getMovieByGenreId(selectionId);

    // Wrap the code in a setTimeout function
    setTimeout(async () => {
        spinner.classList.add("hidden");

        const cardContainer = document.querySelector("#card-container");

        if (genres.length === 0) {
            const noMovies = document.createElement("h2");
            noMovies.innerText = `No ${genreName} movies found`;
            container.appendChild(noMovies);
        }
        defaultView.classList.add("hide");
        selectedMovies.classList.remove("hide");
        searchedMovies.classList.add("hide");

        parentContainer.appendChild(container);
        renderMovieCards(genres, cardContainer);
    }, 1000); // Delay of 3 seconds
};
export const renderGenrePage = () => {
    const categories = document.querySelectorAll("[data-genre]");
    categories.forEach((category) => {
        category.addEventListener("click", userSelection);
    });
};
