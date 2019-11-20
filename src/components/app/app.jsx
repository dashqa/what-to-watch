import React from "react";
import {Provider} from "react-redux";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import store from "@store/store.js";
import {loadMovies, loadPromoMovie} from "@store/movies-data/operations";

import MainPage from "@pages/main-page/main-page";
import MovieDetails from "@pages/movie-details/movie-details";
import MoviePlayer from "@pages/movie-player/movie-player";

const App = () => {
  store.dispatch(loadMovies());
  store.dispatch(loadPromoMovie());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/films/:id' component={MovieDetails}/>
          <Route path='/films/:id/player' component={MoviePlayer}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
