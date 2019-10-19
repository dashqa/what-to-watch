import React from "react";
import PropTypes from "prop-types";

const CatalogCard = ({title}) => {

  CatalogCard.propTypes = {
    title: PropTypes.string.isRequired,
  };

  const onTitleClick = (evt) => evt.preventDefault();

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img
          src="img/johnny-english.jpg"
          alt={title}
          width="280"
          height="175"/>
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}>
        <a
          className="small-movie-card__link"
          href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

export default CatalogCard;
