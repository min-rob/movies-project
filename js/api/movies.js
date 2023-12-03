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
    const url = `${baseUrl}/movies?genre=${id}`;
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
