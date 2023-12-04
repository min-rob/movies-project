import { getMovies } from "./api/movies.js";
import { getUsers, getUserById } from "./api/users.js";
import {
    renderMovieCards,
    movieLatest,
    moviePopularity,
} from "./components/cards.js";
import {
    renderMovieSlide,
    handleActiveState,
    updatePagination,
    createPagination,
    moreInfoClick,
    handlePaginationClick,
} from "./components/hero-slider.js";

import { displayCategory, handleBtnClick } from "./components/menu-app.js";
import { renderGenrePage } from "./components/genre-display.js";

const handleAppBarHide = () => {
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition === 0) {
            document.querySelector(".button-container").classList.add("hidden");
        } else if (scrollPosition > 0) {
            document
                .querySelector(".button-container")
                .classList.remove("hidden");
        }
    });
};

(async () => {
    handleAppBarHide();
    const movies = await getMovies();
    console.log(movies);

    const users = await getUsers();

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
    await displayCategory();
    renderGenrePage();
    handleBtnClick();
})();
