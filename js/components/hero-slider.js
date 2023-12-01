import { run } from "node:test";
import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
} from "../api/movies.js";

const basePath = "./assets/img/movie-backdrop";

const createFeaturedSlide = async (movie) => {
    let {
        title,
        release_date,
        cast,
        director,
        description,
        runtime,
        vote_average,
        backdrop,
    } = movie;

    const newSlide = document.createElement("div");

    title = movie.title;
    release_date = movie.release_date;
    cast = movie.cast;
    director = movie.director;
    runtime = movie.runtime;
    vote_average = movie.vote_average;
    backdrop = movie.backdrop;

    newSlide.classList.add("container-fluid");
    newSlide.classList.add("slide");
    newSlide.innerHTML = `
                <div
                    class="container-fluid slide active"
                    style="
                        background: linear-gradient(
                                to right,
                                rgba(0, 0, 0, 0.3),
                                rgba(0, 0, 0, 0.3)
                            ),
                            url(${basePath}${backdrop});
                    "
                >
                    <div class="row flex-grow-1 align-items-center">
                        <div class="col px-0 d-flex flex-column gap-4 lt-info">
                            <h1 class="movie-title">${title}</h1>
                            <div class="movie-info-basic">
                                <span class="rating">
                                    <img
                                        src="./assets/img/icons/star-filled.svg"
                                        height="35"
                                        width="35"
                                    />
                                    ${vote_average}/10
                                </span>
                                <ul
                                    class="movie-detail-list d-flex align-items-start gap-3"
                                >
                                    <li>
                                        <a href="/">Action</a>,
                                        <a href="/">Science Fiction</a>,
                                        <a href="/">Mystery</a>
                                    </li>
                                    <li>
                                        <span
                                            ><img
                                                src="./assets/img/icons/calendar.svg"
                                                height="20"
                                                width="20"
                                        /></span>
                                        ${release_date}
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                src="./assets/img/icons/time-icon.svg"
                                                height="20"
                                                width="20"
                                            />
                                        </span>
                                        ${runtime}
                                    </li>
                                </ul>
                            </div>
                            <div class="movie-info-bottom">
                                <button class="btn btn-primary trailer-btn">
                                    <span>
                                        <img
                                            src="./assets/img/icons/play-filled.svg"
                                            height="35"
                                            width="35"
                                        />
                                        Watch Trailer
                                    </span>
                                </button>
                                <button class="btn btn-primary trailer-btn">
                                    <span>
                                        <img
                                            src="./assets/img/icons/add-icon.svg"
                                            height="35"
                                            width="35"
                                        />
                                        More info
                                    </span>
                                </button>
                                <ul class="movie-more-info">
                                    <li>
                                        <h3>Synopsis:</h3>
                                        <p class="description">
                                            ${description}
                                        </p>
                                    </li>
                                    <li>
                                        <h3>Director:</h3>
                                        <span class="director"
                                            >${director}</span
                                        >
                                    </li>
                                    <li>
                                        <h3>Cast:</h3>
                                        <span class="cast"
                                            >${cast}</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    return newSlide;
};

const renderMovieSlide = async () => {
    const parentContainer = document.querySelector(".features");
    const movies = await getMovies();
    for (let movie of movies) {
        const movieId = await getMovieId(movie.title);
    }
};
