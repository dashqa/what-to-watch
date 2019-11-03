import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../pages/main-page/main-page.jsx";
import MovieDetails from "../pages/movie-details/movie-details.jsx";
import {MOVIES} from "../../mocks/movies";

const getMovie = (paramsId) => MOVIES.find(({id}) => id === parseInt(paramsId, 10));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => (
          <MainPage
            movies={MOVIES}
            promoMovie={MOVIES[0]}
          />)}
        />
        <Route path='/films/:id' render={({match}) => (
          <MovieDetails
            movie={getMovie(match.params.id)}
            relatedMovies={MOVIES}
          />)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
