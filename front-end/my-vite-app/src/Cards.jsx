import { useState } from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

function Cards({ title, category, image, id, fetchCards, getCardId }) {

  const deleteBoard = async () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/delete`, {
      method: "DELETE",
    })
    .then(() => {
      fetchCards();  // Refresh the cards list after deletion
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleViewBoard = () => {
    getCardId(id);  // Set the card ID when the button is clicked
    console.log(id);
  };

  return (
    <>
      <div className="card">
        <img src={image} alt="Congrats!" />
        <h3 className="card-title">{title}</h3>
        <p className="category">{category}</p>
        <div>
          <Link to='/threads'>
            <button className="view-button" onClick={handleViewBoard}>view board</button>
          </Link>
          <button className="delete-button" onClick={deleteBoard}>delete board</button>
        </div>
        :q
  );
}

export default Cards;