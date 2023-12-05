const baseUrl = "http://localhost:3000";

export const getMovies = async () => {
    const url = `${baseUrl}/movies`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const getMovieId = async (search) => {
    const movies = await getMovies();
    try {
        for (let movie of movies) {
            if (movie.title.includes(search)) {
                return movie.id;
            }
        }
    } catch (error) {
        return console.log("error fetching movie ID =>", error);
    }
};

export const getMovieBySearch = async (search) => {
    const movies = await getMovies();
    try {
        for (let movie of movies) {
            if (movie.title.toLowerCase().includes(search)) {
                return movie;
            }
        }
    } catch (error) {
        return console.log(
            `error fetching any movies that match ${search}`,
            error
        );
    }
};

export const getMovieBackdrop = async (id) => {
    const url = `${baseUrl}/movies/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.backdrop;
};

export const getGenres = async () => {
    const url = `${baseUrl}/genres`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const getMovieByGenreId = async (id) => {
    const movies = await getMovies();
    const moviesWithGenreId = [];

    for (let movie of movies) {
        const genres = movie.genres;
        for (let genre of genres) {
            if (genre.id === parseInt(id)) {
                moviesWithGenreId.push(movie);
            }
        }
    }

    return moviesWithGenreId;
};

export const getMovieTrailerById = async (id) => {
    try {
        const url = `${baseUrl}/trailers/${id}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data.link;
    } catch (error) {
        console.log("error fetching trailer =>", error);
    }
};

export const addFavorites = async (movie) => {
    try {
        const url = `${baseUrl}/favorites`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error adding favorite =>", error);
    }
};

export const removeFavorites = async (id) => {
    try {
        const url = `${baseUrl}/favorites/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error removing favorite =>", error);
    }
};

export const getFavorites = async () => {
    try {
        const url = `${baseUrl}/favorites`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error fetching favorites =>", error);
    }
};
