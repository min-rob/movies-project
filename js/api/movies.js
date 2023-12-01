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

export const getMovieById = async (id) => {
    const url = `${baseUrl}/movies/${id}`;
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

export const getGenres = async () => {
    const url = "http://localhost:3000/genres";
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
