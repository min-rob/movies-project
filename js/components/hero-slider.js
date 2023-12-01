import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
} from "../api/movies.js";

const basePath = "../../assets/img/movie-backdrop/";

const createFeaturedSlide = async () => {
    const parentContainer = document.querySelector(".features");
    const newSlide = document.createElement("div");

    newSlide.classList.add("container-fluid");
    newSlide.classList.add("slide");
    newSlide.innerHTML = `
    <div class="row flex-grow-1">
        <div class="col-6 p-0"></div>
        <div class="col-6 p-0"></div>
    </div>
    `;
};

const renderMovieSlide = async () => {
    const movies = await getMovies();
    for (let movie of movies) {
        const movieId = await getMovieId(movie.title);
    }
};
