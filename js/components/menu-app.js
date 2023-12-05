import { getGenres, getMovieBySearch, getMovies } from "../api/movies.js";
import { renderMovieCards } from "./cards.js";

export const displayCategory = async () => {
    const genreList = document.querySelector(".genres");
    const parentContainer = document.querySelector(".genre-list");
    const genres = await getGenres();
    console.log(genres);
    for (let genre of genres) {
        genreList.innerHTML += `
            <p id="${genre.id}" data-genre>${genre.name}</p>
        `;
    }
    parentContainer.appendChild(genreList);
};

export const handleBtnClick = () => {
    const appBtn = document.querySelector("#app");
    const homeBtn = document.querySelector("#home");
    const searchBtn = document.querySelector("#search");
    const addBtn = document.querySelector("#add");
    const addMovieForm = document.querySelector(".add-movie-form");

    appBtn.addEventListener("click", (e) => {
        const genreList = document.querySelector(".genre-list");
        genreList.classList.toggle("hide");
    });

    homeBtn.addEventListener("click", (e) => {
        const defaultMovies = document.querySelector(".default-movies");
        const selectedMovies = document.querySelector(".selected-movies");
        const searchMovies = document.querySelector(".searched-movies");
        defaultMovies.classList.remove("hide");
        selectedMovies.classList.toggle("hide");
        searchMovies.classList.toggle("hide");
    });

    searchBtn.addEventListener("click", (e) => {
        const searchContainer = document.querySelector(".search-form");
        searchContainer.classList.toggle("hidden");
    });

    addBtn.addEventListener("click", (e) => {
        addMovieForm.classList.toggle("hidden");
    });
};

const levenshteinDistance = (a, b) => {
    const distanceMatrix = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) {
        distanceMatrix[0][i] = i;
    }

    for (let j = 0; j <= b.length; j++) {
        distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            distanceMatrix[j][i] = Math.min(
                distanceMatrix[j][i - 1] + 1,
                distanceMatrix[j - 1][i] + 1,
                distanceMatrix[j - 1][i - 1] + indicator
            );
        }
    }

    return distanceMatrix[b.length][a.length];
};

export const handleSearch = async () => {
    const searchBar = document.querySelector("input[type='search']");
    const searchForm = document.querySelector(".search-form");
    const searchDisplayContainer = document.querySelector("#movies");
    const defaultView = document.querySelector(".default-movies");
    const selectedMovies = document.querySelector(".selected-movies");
    const parentContainer = document.querySelector(".searched-movies");
    const searchResultTitle = document.querySelector("#search-title");
    console.log(searchResultTitle);

    const threshold = 5;
    const movies = await getMovies();
    searchBar.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchInput = searchBar.value.toLowerCase();
        console.log(searchInput);
        const similarMovies = movies.filter((movie) => {
            const distance = levenshteinDistance(
                searchInput,
                movie.title.toLowerCase()
            );
            return distance <= threshold;
        });
        const numReturned = similarMovies.length;
        console.log(similarMovies);
        renderMovieCards(similarMovies, searchDisplayContainer);
        defaultView.classList.add("hide");
        selectedMovies.classList.add("hide");
        parentContainer.classList.remove("hide");
        searchResultTitle.innerHTML = `Found ${numReturned} results for "${searchInput}"`;
        console.log(searchResultTitle);
    });
};
