import { getGenres } from "../api/movies.js";

export const displayCategory = async () => {
    const genreList = document.querySelector(".genres");
    const parentContainer = document.querySelector(".genre-list");
    const genres = await getGenres();
    console.log(genres);
    for (let genre of genres) {
        genreList.innerHTML += `
            <p id="${genre.id}" data-genre>${genre.name}</p>
        `;
    }
    parentContainer.appendChild(genreList);
};

export const handleBtnClick = () => {
    const appBtn = document.querySelector(".app-btn");
    appBtn.addEventListener("click", () => {
        const genreList = document.querySelector(".genre-list");
        genreList.classList.toggle("hide");
    });
};
