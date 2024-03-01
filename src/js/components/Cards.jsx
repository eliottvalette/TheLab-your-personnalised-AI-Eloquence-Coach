//Laboratoire/src/components/Cards.jsx
import React from "react";
import PropTypes from "prop-types";


Card.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

export default function Card({ id, coverImg, name, description, isSelected, onClick }) {
    return (
        <div id={id} className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <img src={coverImg} className="card-image" alt="" />
            <h4 className="card-title">{name}</h4>
            <p className="card-description">{description}</p>
        </div>
    );
}