import {createSelector} from "reselect";
import moment from "moment/moment";
import {DEFAULT_FILTER, MAX_RELATED_MOVIES} from "@constants";

export const getMovies = (state) => state.moviesData.movies;
export const getActiveFilter = (state) => state.moviesData.activeFilter;
export const getPromoMovie = (state) => state.moviesData.promoMovie;
export const getMoviesCounter = (state) => state.moviesData.moviesCounter;
export const getMovieById = (state, movieId) => state.moviesData.movies.find(({id}) => id === parseInt(movieId, 10));
export const getFavoriteMovies = (state) => state.moviesData.favorite;
export const getComments = (state) => state.moviesData.comments;

export const getSortedComments = createSelector(
    [getComments],
    (comments) => comments.sort((a, b) => moment(b.date) - moment(a.date))
);

export const getDividedComments = createSelector(
    [getSortedComments],
    (comments) => {
      return comments.reduce((acc, current, i) => {
        acc[i % 2 ? `even` : `odd`].push(current);
        return acc;
      }, {odd: [], even: []});
    }
);

export const getRelatedMovies = (state, currentMovie) =>
  state.moviesData.movies
    .filter(({id, genre}) => id !== currentMovie.id && genre === currentMovie.genre)
    .slice(0, MAX_RELATED_MOVIES);

export const getGenres = createSelector(
    [getMovies],
    (movies) => {
      const genresSet = new Set([DEFAULT_FILTER]);
      movies.forEach((movie) => genresSet.add(movie.genre));
      return genresSet;
    }
);

export const getFilteredMovies = createSelector(
    [getMovies, getActiveFilter, getMoviesCounter],
    (movies, filter, counter) => {
      return filter === DEFAULT_FILTER
        ? movies.slice(0, counter)
        : movies.filter(({genre}) => genre === filter).slice(0, counter);
    });
