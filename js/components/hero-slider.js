import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
    getMovieTrailerById,
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

    if (backdrop === null || backdrop === undefined) {
        backdrop = "/default-bg.jpg";
    }

    newSlide.classList.add("container-fluid");
    newSlide.classList.add("slide");
    newSlide.setAttribute("id", `${id}`);
    newSlide.setAttribute("data-id", `${id}`);
    newSlide.setAttribute(
        "style",
        `background: linear-gradient(to right,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${basePath}${backdrop}) center/cover no-repeat; height: 100vh;`
    );

    newSlide.innerHTML = `
                    <div class="trailer-modal-container closed" id="trailer-${id}">
                        <div id="ytplayer-${id}"></div>
                    </div>
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
                                <button class="btn btn-primary more-btn">
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
                            <ul class="movie-more-info" id=movie-${id}>
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

    const moreBtn = newSlide.querySelector(".more-btn");
    moreBtn.addEventListener("click", (e) => {
        if (newSlide.classList.contains("active")) {
            const movieInfo = newSlide.querySelector(".movie-more-info");
            movieInfo.classList.toggle("show");
        }
        const img = moreBtn.querySelector("img");
        img.classList.toggle("clicked");
        const clicked = img.classList.contains("clicked");
        if (clicked) {
            img.setAttribute("src", "./assets/img/icons/remove-icon.svg");
        } else {
            img.setAttribute("src", "./assets/img/icons/add-icon.svg");
        }
    });

    return newSlide;
};

const ytSlider = (videoID, id) => {
    const player = new YT.Player(`ytplayer-${id}`, {
        height: "500",
        width: "800",
        videoId: videoID,
        playerVars: {
            playsinline: 1,
            autoplay: 1,
            loop: 1,
            mute: 1,
            controls: 0,
        },
        // events: {
        // 'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        // }
    });
};

export const handleTrailerClick = () => {
    const slides = document.querySelectorAll(".slide");
    const trailerBtns = document.querySelectorAll(".trailer-btn");
    for (let trailerBtn of trailerBtns) {
        trailerBtn.addEventListener("click", async (e) => {
            for (let slide of slides) {
                if (slide.classList.contains("active")) {
                    const slideID = slide.getAttribute("id");
                    console.log("slideID related to modal", slideID);
                    const trailerModal = document.querySelector(
                        `#trailer-${slideID}`
                    );
                    console.log(trailerModal);
                    trailerModal.classList.toggle("focused");
                    trailerModal.classList.toggle("closed");
                    const videoID = await getMovieTrailerById(slideID);
                    ytSlider(videoID, slideID);
                }
            }
        });
    }
};

export const renderMovieSlide = async (movies) => {
    const parentContainer = document.querySelector(".features");

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

    const slideInterval = setInterval(() => {
        for (let slide of target) {
            if (slide.classList.contains("focused")) {
                clearInterval(slideInterval);
            }
        }
        target[currentIndex].classList.remove("active");

        if (currentIndex < target.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reset index to loop back to the first slide
        }

        target[currentIndex].classList.add("active");
    }, 10000);
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
    setInterval(() => {
        const slides = document.querySelectorAll(".slide");
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
                        item.classList.add("active");
                    } else {
                        img.setAttribute(
                            "src",
                            "./assets/img/icons/pagination-inactive.svg"
                        );
                        item.classList.remove("active");
                    }
                });
                break;
            }
        }
    }, 5000);
};

export const handlePaginationClick = () => {
    const paginationItems = document.querySelectorAll(".pagination span");
    for (let item of paginationItems) {
        item.addEventListener("click", () => {
            for (let pagItem of paginationItems) {
                pagItem.classList.remove("active");
            }
            item.classList.add("active");
            const slides = document.querySelectorAll(".slide");
            const slideID = item.getAttribute("id");
            for (let slide of slides) {
                if (slide.getAttribute("id") === slideID) {
                    slide.classList.add("active");
                } else {
                    slide.classList.remove("active");
                }
            }
        });
    }
};
