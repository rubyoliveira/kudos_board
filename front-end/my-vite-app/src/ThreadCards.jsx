import { useState } from 'react';
import './ThreadCards.css';

function ThreadCards({ title, description, gif, owner, votes, id, fetchThreads, cardId }) {
    const [vote, setVote] = useState(votes);

  const deleteCard= async () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${cardId}/${id}/delete`, {
      method: "DELETE",
    })
    .then(() => {
      fetchThreads(cardId);  // Refresh the cards list after deletion
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleUpvote = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${cardId}/${id}/upvote`, {
        method: 'PATCH',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upvote');
        }
        return response.json();
    })
    .then(updatedThread => {
        console.log('Upvote successful:', updatedThread);
        setVote(updatedThread.votes);  // Update the local state with the new vote count from the server
    })
    .catch(error => {
        console.error('Error upvoting:', error);
    });
};

  return (
    <>
      <div className="thread">
            <h3 className="title-thread">{title}</h3>
            <img className = "gif" src = {gif} alt = "n/a"></img>
            <p className="description">{description}</p>
            <p className="owner">{owner}</p>
            <button className="upvote" onClick = {handleUpvote}>upvote: {vote}</button>
            <button className="delete-card" onClick = {deleteCard}>delete card</button>
        </div>
    </>
  );
}

export default ThreadCards;