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

const getGenreNameById = async (id) => {
    const genres = await getGenres();
    const foundGenre = genres.find((genre) => genre.id === id);
    return foundGenre ? foundGenre.name : "Genre not found"; // Return the genre name or a default message
};

const userSelection = async (e) => {
    const selectionId = e.target.getAttribute("id");
    // console.log(selectionId);
    const genreName = await getGenreNameById(parseFloat(selectionId));
    // console.log(genreName);
    const container = await createContainer(genreName);
    // console.log(selectionId);
    const genres = await getMovieByGenreId(selectionId);
    // console.log("Genres by", genreName, genres);
    const cardContainer = document.querySelector("#card-container");
    // console.log(cardContainer);
    const parentContainer = document.querySelector(".movies-content");
    const selectedMovies = document.querySelector(".selected-movies");
    const searchedMovies = document.querySelector(".searched-movies");

    const defaultView = document.querySelector(".default-movies");
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
};

export const renderGenrePage = () => {
    const categories = document.querySelectorAll("[data-genre]");
    categories.forEach((category) => {
        category.addEventListener("click", userSelection);
    });
};
