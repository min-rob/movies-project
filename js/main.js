import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
    getMovieByGenreId,
} from "./api/movies.js";
import { getUsers, getUserById } from "./api/users.js";
import {
    renderMovieCards,
    movieLatest,
    moviePopularity,
} from "./components/cards.js";
import { renderGenrePage } from "./components/genre-display.js";
import {
    renderMovieSlide,
    handleActiveState,
    updatePagination,
    createPagination,
    moreInfoClick,
    handlePaginationClick,
} from "./components/hero-slider.js";

import { displayCategory } from "./components/menu-app.js";

(async () => {
    const movies = await getMovies();
    console.log(movies);

    const users = await getUsers();
    console.log(users);

    const backdrop = await getMovieBackdrop(1);
    console.log(backdrop);

    const movieId = await getMovieId("Inception");
    console.log(movieId);

    renderMovieSlide(movies);
    handleActiveState();
    createPagination();
    updatePagination();
    moreInfoClick();
    handlePaginationClick();
    const latestMovies = await movieLatest();
    const popularMovies = await moviePopularity();
    const featuredContainer = document.querySelector(
        ".featured-card-container"
    );
    const latestContainer = document.querySelector(".latest-card-container");
    console.log("latest movies:", latestMovies);
    renderMovieCards(latestMovies, latestContainer);
    renderMovieCards(popularMovies, featuredContainer);
    displayCategory();
    const genres = await getMovieByGenreId(28);
    console.log(genres);
    renderGenrePage();
})();
