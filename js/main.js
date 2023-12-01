import { getMovies, getGenres, getMovieById } from "./api/movies.js";
import { getUsers, getUserById } from "./api/users.js";

(async () => {
    const movies = await getMovies();
    console.log(movies);

    const users = await getUsers();
    console.log(users);
})();
