import {
    getMovies,
    addFavorites,
    removeFavorites,
    getFavorites,
    deleteMovie,
} from "../api/movies.js";

export const createMovieCard = (movie, isFav) => {
    let { title, release_date, runtime, vote_average, backdrop, id } = movie;

    const dateString = movie.release_date;
    const dateParts = dateString.split("-");
    const year = dateParts[2];

    title = movie.title;
    release_date = year;
    vote_average = movie.vote_average;
    backdrop = movie.backdrop;
    id = movie.id;

    if (backdrop === null || backdrop === undefined) {
        backdrop = "/default-bg.jpg";
    }
    if (
        vote_average === null ||
        vote_average === 0 ||
        vote_average === undefined
    ) {
        vote_average = "N/A";
    }

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.setAttribute("data-card", `${id}`);
    card.innerHTML = `
        <div
        class="card-body"
        style="
            background: url(./assets/img/movie-backdrop/${backdrop})
                center/cover no-repeat;
        "
    ></div>
    <div class="card-footer">
        <span class="card-title"
            ><p>${title}</p></span
        >
        <div class="movie-card-info">
            <span class="card-year"
                ><p>${release_date}</p></span
            >
            <div class="movie-card-rt">
                <span class="card-time">
                    <img
                        src="./assets/img/icons/time-icon.svg"
                        height="20"
                        width="20"
                    />
                    ${runtime}m
                </span>
                <span class="card-rating"
                    ><img
                        src="./assets/img/icons/star-filled.svg"
                        height="20"
                        width="20"
                    />
                    ${vote_average}</span
                >
                <span class="card-favorite">
                    <button class="btn btn-icon" id="fav-btn">
                        <img
                            src="./assets/img/icons/heart-${
                                isFav ? "filled" : "outlined"
                            }.svg"
                            height="20"
                            width="20"
                        />
                    </button>
                </span>
                <span class="card-trash">
                    <button class="btn btn-icon" id="trash-btn">
                        <img
                            src="./assets/img/icons/trash-icon.svg"
                            height="20"
                            width="20"
                        />
                    </button></span>
            </div>
        </div>
    </div>
    `;

    const favoriteBtn = card.querySelector("#fav-btn");
    favoriteBtn.addEventListener("click", async (e) => {
        const img = favoriteBtn.querySelector("img");
        e.preventDefault();
        console.log(isFav);
        if (!isFav) {
            console.log("fav = false");
            img.setAttribute("src", "./assets/img/icons/heart-filled.svg");
            console.log(movie);
            await addFavorites(movie);
            return movie;
        } else {
            console.log("fav = true");
            img.setAttribute("src", "./assets/img/icons/heart-outlined.svg");
            const movieId = movie.id;
            await removeFavorites(movieId);
        }
    });

    const trashBtn = card.querySelector("#trash-btn");
    trashBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const movieId = movie.id;

        await deleteMovie(movieId);
    });

    return card;
};

export const moviePopularity = async () => {
    const movies = await getMovies();
    const popularMovies = movies.filter((movie) => movie.popularity > 85);
    return popularMovies;
};

export const movieLatest = async () => {
    const movies = await getMovies();
    const latestMovies = movies.filter((movie) => {
        const dateString = movie.release_date;
        const dateParts = dateString.split("-");
        const year = parseInt(dateParts[2], 10);
        return year > 2005;
    });
    return latestMovies;
};

export const movieGenre = async (genre) => {
    const movies = await getMovies();
    const genreMovies = movies.filter((movie) => {
        return movie.genres.includes(genre);
    });
    return genreMovies;
};

export const renderMovieCards = async (movies, container) => {
    const favorites = await getFavorites();
    const movieCards = movies.map((movie) => {
        const isFav = favorites.some((favorite) => favorite.id === movie.id);
        return createMovieCard(movie, isFav);
    });
    const movieContainer = container;
    movieContainer.innerHTML = "";
    movieContainer.append(...movieCards);
};
