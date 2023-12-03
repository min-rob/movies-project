import { getMovies, getGenres, getMovieByGenreId } from "../api/movies.js";
import { movieGenre, renderMovieCards } from "./cards.js";

const createContainer = async (genre) => {
    const page = document.createElement("div");
    page.classList.add(`${genre}-movies`);
    page.setAttribute("data-page", "");
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
    const genreName = await getGenreNameById(parseFloat(selectionId));
    console.log(genreName);
    const container = await createContainer(genreName);
    console.log(selectionId);
    const genres = await getMovieByGenreId(selectionId);
    const cardContainer = document.querySelector("#card-container");
    console.log(cardContainer);
    const parentContainer = document.querySelector(".movies-content");
    const defaultView = document.querySelector(".default-movies");
    defaultView.classList.add("hide");
    parentContainer.appendChild(container);
    renderMovieCards(genres, cardContainer);
};

export const renderGenrePage = async () => {
    const categories = document.querySelectorAll("[data-genre]");
    categories.forEach(async (category) => {
        category.addEventListener("click", userSelection);
    });
};
