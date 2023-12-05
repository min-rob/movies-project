import {
    getMovies,
    getMovieId,
    getFavorites,
    getGenres,
    addMovie,
    getMovieById,
    deleteMovie,
    updateMovie,
} from "./api/movies.js";

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
    handlePaginationClick,
    handleTrailerClick,
} from "./components/hero-slider.js";

import {
    displayCategory,
    handleBtnClick,
    handleSearch,
} from "./components/menu-app.js";

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

const createToast = (action, message) => {
    const toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container");
    toastContainer.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded me-2" alt="...">
                <strong class="me-auto">${action}</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>`;
    return toastContainer;
};

const createSpinner = () => {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border", "hidden");
    spinner.setAttribute("role", "status");
    spinner.innerHTML = `
        <span class="visually-hidden">Loading...</span>`;
    return spinner;
};

const addMovieSubmit = async () => {
    const addForm = document.querySelector("#add-movie");
    const title = addForm.querySelector("#movie-title");
    const genre = addForm.querySelector("#genre-list");
    const releaseDate = addForm.querySelector("#movie-year");
    const runtime = addForm.querySelector("#movie-runtime");
    const cast = addForm.querySelector("#movie-cast");
    const description = addForm.querySelector("#movie-description");
    const director = addForm.querySelector("#movie-director");
    const submitBtn = addForm.querySelector("#add-form-btn");
    const addMovieForm = document.querySelector(".add-movie-form");

    let formFields = [
        title,
        genre,
        description,
        releaseDate,
        runtime,
        cast,
        director,
    ];

    formFields.forEach((field) => {
        field.addEventListener("input", () => {
            if (field.value === "") {
                field.classList.add("invalid");
                submitBtn.setAttribute("disabled", true);
            } else {
                console.log(field.value);
                field.classList.remove("invalid");
                submitBtn.removeAttribute("disabled");
            }
        });
    });

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // Hide form and show spinner
        formFields.forEach((field) => (field.style.display = "none"));
        submitBtn.style.display = "none";

        const newGenre = [
            { id: genre.value, name: genre.options[genre.selectedIndex].text },
        ];

        await addMovie(
            title.value,
            newGenre,
            description.value,
            releaseDate.value,
            runtime.value,
            cast.value,
            director.value
        );

        formFields.forEach((field) => {
            field.value = "";
            field.style.display = "block";
        });
        submitBtn.style.display = "block";
        window.location.reload();
    });
};

const editMovieHandler = async () => {
    const editMovieForm = document.querySelector(".movie-form-edit");
    const movieList = document.querySelector("#movie-list");

    movieList.addEventListener("change", async (e) => {
        e.preventDefault();
        const selectedOption = parseFloat(e.target.value);
        const movie = await getMovieById(selectedOption);

        const {
            id,
            title,
            genres,
            description,
            release_date,
            runtime,
            cast,
            director,
        } = movie;

        editMovieForm.innerHTML = `
            <h2>Edit ${title}</h2>
            <label> Movie Title </label>
            <input id="edit-movie-title" type="text" placeholder="${title}" />
            <label> Release Year: </label>
            <input id="edit-movie-year" type="text" placeholder="${release_date}" />
            <label> Director: </label>
            <input id="edit-movie-director" type="text" placeholder="${director}" />
            <label> Cast: </label>
            <input id="edit-movie-cast" type="text" placeholder="${cast}" />
            <label> Runtime: </label>
            <input id="edit-movie-runtime" type="text" placeholder="${runtime}" />
            <label> Description: </label>
            <input id="edit-movie-description" type="text" placeholder="${description}" />
            <label id="add-form-btn">
                <button id="submit-btn" class="btn btn-secondary">Submit</button>
            </label>
        `;

        const submitBtn = editMovieForm.querySelector("#submit-btn");
        submitBtn.addEventListener("click", async () => {
            const updatedMovie = {
                id: selectedOption,
                title:
                    document.getElementById("edit-movie-title").value || title,
                release_date:
                    document.getElementById("edit-movie-year").value ||
                    release_date,
                director:
                    document.getElementById("edit-movie-director").value ||
                    director,
                cast: document.getElementById("edit-movie-cast").value || cast,
                runtime:
                    parseFloat(
                        document.getElementById("edit-movie-runtime").value
                    ) || runtime,
                description:
                    document.getElementById("edit-movie-description").value ||
                    description,
            };
            await updateMovie(updatedMovie);
        });
    });
};

const populateSelectGenres = async () => {
    const select = document.querySelector("#genre-list");
    const genres = await getGenres();
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.setAttribute("value", genre.id);
        option.innerText = genre.name;
        select.appendChild(option);
    });
};

const populateSelectMovies = async () => {
    const select = document.querySelector("#movie-list");
    const movies = await getMovies();
    movies.forEach((movie) => {
        const option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.innerText = movie.title;
        select.appendChild(option);
    });
};

const handleTabClick = () => {
    const tabBtns = document.querySelectorAll(".nav-item");
    const tabLinks = document.querySelectorAll(".nav-link");
    const forms = document.querySelectorAll(".movie-tab form");
    tabBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            tabLinks.forEach((link) => link.setAttribute("aria-current", ""));
            tabBtns.forEach((btn) => btn.classList.remove("active"));
            btn.classList.add("active");
            btn.setAttribute("aria-current", "true");
            forms.forEach((form) => form.classList.add("hidden"));
            forms[index].classList.remove("hidden");
        });
    });
};

(async () => {
    handleAppBarHide();
    handleTabClick();
    addMovieSubmit();
    editMovieHandler();
    const movies = await getMovies();
    console.log(movies);

    const users = await getUsers();

    const movieId = await getMovieId("The Matrix");
    console.log(movieId);
    populateSelectGenres();
    populateSelectMovies();
    renderMovieSlide(movies);
    handleActiveState();
    createPagination();
    updatePagination();
    // moreInfoClick();
    handlePaginationClick();
    const latestMovies = await movieLatest();
    const popularMovies = await moviePopularity();
    const featuredContainer = document.querySelector(
        ".featured-card-container"
    );
    const latestContainer = document.querySelector(".latest-card-container");
    console.log("latest movies:", latestMovies);
    const favorites = await getFavorites();
    console.log(favorites);
    const favoritesContainer = document.querySelector(
        ".favorite-movie-container"
    );
    if (favorites.length === 0) {
        const noFavorites = document.createElement("h2");
        noFavorites.innerText = `No favorites yet`;
        favoritesContainer.appendChild(noFavorites);
    } else {
        renderMovieCards(favorites, favoritesContainer);
    }
    renderMovieCards(latestMovies, latestContainer);
    renderMovieCards(popularMovies, featuredContainer);
    await displayCategory();
    renderGenrePage();
    handleBtnClick();
    handleSearch();
    handleTrailerClick();
})();
