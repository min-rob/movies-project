import {
    getMovies,
    getGenres,
    getMovieId,
    getMovieBackdrop,
} from "./api/movies.js";
import { getUsers, getUserById } from "./api/users.js";

(async () => {
    const movies = await getMovies();
    console.log(movies);

    const users = await getUsers();
    console.log(users);

    const backdrop = await getMovieBackdrop(1);
    console.log(backdrop);

    const movieId = await getMovieId("Inception");
    console.log(movieId);
})();
