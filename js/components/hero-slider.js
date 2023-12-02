import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
} from "../api/movies.js";

const basePath = "./assets/img/movie-backdrop";

const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

const createFeaturedSlide = (movie) => {
    let {
        title,
        release_date,
        cast,
        director,
        description,
        runtime,
        vote_average,
        backdrop,
        id,
    } = movie;

    const newSlide = document.createElement("div");

    title = movie.title;
    release_date = movie.release_date;
    cast = movie.cast;
    director = movie.director;
    runtime = timeFormat(movie.runtime);
    vote_average = movie.vote_average;
    backdrop = movie.backdrop;
    id = movie.id;

    newSlide.classList.add("container-fluid");
    newSlide.classList.add("slide");
    newSlide.setAttribute("id", `${id}`);
    newSlide.setAttribute("data-id", `${id}`);
    newSlide.setAttribute(
        "style",
        `background: linear-gradient(to right,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${basePath}${backdrop}) center/cover no-repeat; height: 100vh;`
    );

    newSlide.innerHTML = `
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
                            <div class="movie-info-bottom d-flex gap-5">
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
                            </div>
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
    `;

    return newSlide;
};

export const renderMovieSlide = async (movies) => {
    const parentContainer = document.querySelector(".features");

    console.log(createFeaturedSlide(movies));

    const movieSlideFragment = document.createDocumentFragment();

    for (let movie of movies) {
        movieSlideFragment.appendChild(createFeaturedSlide(movie));
    }

    parentContainer.appendChild(movieSlideFragment);
};

export const handleActiveState = () => {
    const target = document.querySelectorAll(".slide");
    target[0].classList.add("active");
    let currentIndex = 0;

    setInterval(() => {
        target[currentIndex].classList.remove("active");

        if (currentIndex < target.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reset index to loop back to the first slide
        }

        target[currentIndex].classList.add("active");
    }, 5000);
};

export const createPagination = () => {
    const parentContainer = document.querySelector(".features");
    const slides = document.querySelectorAll(".slide");
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");

    for (let slide of slides) {
        const paginationSpan = document.createElement("span");
        const paginationImg = document.createElement("img");
        const PaginationID = paginationSpan.getAttribute("id");
        const slideID = slide.getAttribute("id");
        paginationSpan.setAttribute("id", `${slideID}`);
        paginationImg.setAttribute(
            "src",
            "./assets/img/icons/pagination-inactive.svg"
        );
        paginationSpan.appendChild(paginationImg);
        paginationDiv.appendChild(paginationSpan);
    }
    parentContainer.appendChild(paginationDiv);
};

export const updatePagination = () => {
    const paginationItems = document.querySelectorAll(".pagination span");
    const slides = document.querySelectorAll(".slide");

    // setInterval(() => {
    //     for (let i = 0; i < slides.length; i++) {
    //         if (slides[i].classList.contains("active")) {
    //             for (let item of paginationItems) {
    //                 let lastIndex = paginationItems.length - 1;
    //                 if (
    //                     item.getAttribute("id") === slides[i].getAttribute("id")
    //                 ) {
    //                     const img = item.querySelector("img");
    //                     img.setAttribute(
    //                         "src",
    //                         "./assets/img/icons/pagination-active.svg"
    //                     );
    //                     item.previousElementSibling
    //                         .querySelector("img")
    //                         .setAttribute(
    //                             "src",
    //                             "./assets/img/icons/pagination-inactive.svg"
    //                         );
    //                 }
    //                 if (paginationItems.indexOf(item) === lastIndex) {
    //                     item.querySelector("img").setAttribute(
    //                         "src",
    //                         "./assets/img/icons/pagination-inactive.svg"
    //                     );
    //                     paginationItems[0]
    //                         .querySelector("img")
    //                         .setAttribute(
    //                             "src",
    //                             "./assets/img/icons/pagination-active.svg"
    //                         );
    //                 }
    //             }
    //             break;
    //         }
    //     }
    // }, 5000);
    setInterval(() => {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains("active")) {
                Array.from(paginationItems).forEach((item, index) => {
                    const img = item.querySelector("img");
                    if (
                        item.getAttribute("id") === slides[i].getAttribute("id")
                    ) {
                        img.setAttribute(
                            "src",
                            "./assets/img/icons/pagination-active.svg"
                        );
                    } else {
                        img.setAttribute(
                            "src",
                            "./assets/img/icons/pagination-inactive.svg"
                        );
                    }
                });
                break;
            }
        }
    }, 5000);
};
