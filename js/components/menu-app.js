import { getGenres, getMovies } from "../api/movies.js";

export const displayCategory = async () => {
    const genreList = document.createElement("div");
    const parentContainer = document.querySelector(".genres");
    genreList.classList.add("genre-list-container");
    const genres = await getGenres();
    console.log(genres);
    genres.forEach((genre) => {
        genreList.innerHTML += `
        <span data-genre>
            <p id="${genre.id}">${genre.name}</p>
        </span>
        `;
    });
    parentContainer.appendChild(genreList);
};
