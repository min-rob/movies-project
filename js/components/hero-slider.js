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
                <div
                    class="container-fluid slide active"
                    style="
                        background: linear-gradient(
                                to right,
                                rgba(0, 0, 0, 0.3),
                                rgba(0, 0, 0, 0.3)
                            ),
                            url(./assets/img/movie-backdrop/Inception.jpg);
                    "
                >
                    <div class="row flex-grow-1 align-items-center">
                        <div class="col px-0 d-flex flex-column gap-4 lt-info">
                            <h1 class="movie-title">Inception</h1>
                            <div class="movie-info-basic">
                                <span class="rating">
                                    <img
                                        src="./assets/img/icons/star-filled.svg"
                                        height="35"
                                        width="35"
                                    />
                                    8.8/10
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
                                        July, 2010
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                src="./assets/img/icons/time-icon.svg"
                                                height="20"
                                                width="20"
                                            />
                                        </span>
                                        2hr 38min
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
                                            "A thief who enters the subconscious
                                            minds of others to steal their
                                            secrets.""
                                        </p>
                                    </li>
                                    <li>
                                        <h3>Director:</h3>
                                        <span class="director"
                                            >Christopher Nolan</span
                                        >
                                    </li>
                                    <li>
                                        <h3>Cast:</h3>
                                        <span class="cast"
                                            >Leonardo DiCaprio, Joseph
                                            Gordon-Levitt, Ellen Page</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    `;
};

const renderMovieSlide = async () => {
    const movies = await getMovies();
    for (let movie of movies) {
        const movieId = await getMovieId(movie.title);
    }
};
