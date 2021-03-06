import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {formatDate} from "@utils";

import {getDividedComments} from "@store/movies-data/selectors";

const TabReviews = ({dividedComments}) => {
  return (
    <div className="movie-card__reviews movie-card__row">
      {Object.entries(dividedComments).map(([key, comments]) => (
        <div
          className="movie-card__reviews-col"
          key={key}
        >
          {comments.map(({id, comment, user, date, rating}) => {
            return (
              <div
                className="review"
                key={id}
              >
                <blockquote className="review__quote">
                  <p className="review__text">{comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{user.name}</cite>
                    <time className="review__date" dateTime={formatDate(date, `YYYY-MM-DD`)}>
                      {formatDate(date, `MMMM Do, YYYY`)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{rating}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

TabReviews.deafultProps = {
  dividedComments: {},
};

TabReviews.propTypes = {
  dividedComments: PropTypes.shape({
    even: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      rating: PropTypes.number,
      comment: PropTypes.string
    })).isRequired,
    odd: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      rating: PropTypes.number,
      comment: PropTypes.string
    })).isRequired,
  }).isRequired
};

const mapStateToProps = (state) => ({
  dividedComments: getDividedComments(state),
});

export {TabReviews};
export default connect(mapStateToProps)(TabReviews);
