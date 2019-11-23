import * as actionType from "./types";
import {MOVIES_COUNTER_STEP} from "@constants";
import {setFetching} from "@store/loading/actions";

export const loadMovies = () => (dispatch, _, api) => {
  dispatch(setFetching(`movies`, true));
  return api.get(`/films`)
    .then(({data}) => {
      dispatch(setMovies(data));
      dispatch(setFetching(`movies`, false));
    })
    .catch((error) => {
      dispatch(setFetching(`movies`, false));
      throw new Error(`${error} on loading movies`);
    });
};

export const loadPromoMovie = () => (dispatch, _, api) => {
  dispatch(setFetching(`promo`, true));
  return api.get(`/films/promo`)
    .then(({data}) => {
      dispatch(setPromoMovie(data));
      dispatch(setFetching(`promo`, false));
    })
    .catch((error) => {
      dispatch(setFetching(`promo`, false));
      throw new Error(`${error} on loading promo movie`);
    });
};

export const uploadReview = (movieId, formData) => (dispatch, _, api) => {
  dispatch(setFetching(`review`, true));
  return api.post(`/comments/${movieId}`, formData)
    .then((response) => {
      dispatch(setFetching(`review`, false));
      return response;
    })
    .catch((error) => {
      dispatch(setFetching(`review`, false));
      throw new Error(`${error} on uploading review`);
    });
};

export const setMovies = (movies) => {
  return {
    type: actionType.SET_MOVIES,
    payload: movies
  };
};

export const setPromoMovie = (movie) => {
  return {
    type: actionType.SET_PROMO_MOVIE,
    payload: movie
  };
};

export const setActiveFilter = (genre) => {
  return {
    type: actionType.SET_ACTIVE_FILTER,
    payload: genre
  };
};

export const increaseMoviesCounter = () => {
  return {
    type: actionType.INCREASE_MOVIES_COUNTER,
    payload: MOVIES_COUNTER_STEP
  };
};