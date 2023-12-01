import { keys } from "./key.js";
/*
 * example using api with key: https://api.themoviedb.org/3/movie/550?api_key={MOVE_DB_API}
 * retrieve movie ID from https://api.themoviedb.org/3/search/movie
 * get top level details of movie from: https://api.themoviedb.org/3/movie/{movie_id}
 * the movie is results.id
 * End point for trailer is: https://api.themoviedb.org/3/movie/{movie_id}/videos, link = results.key also
 * need to run a .find to find name that has "trailer"
 * youtube link to add https://www.youtube.com/watch?v={key}
 *
 * Endpoint for getting all movie genre wtih ID's https://api.themoviedb.org/3/genre/movie/list
 * advanced filtering endpoint
 * https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=action
 */

class MoviesAPI {
    constructor(key) {
        this.key = keys.movesAPI;
    }
}

export default MoviesAPI;
