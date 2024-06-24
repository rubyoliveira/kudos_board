import { useState, useEffect } from 'react'
import './ThreadModal.css'


const ThreadModal = ({closeModal, cardId, fetchThreads}) => {
    const [title, setTitle] = useState('')
    const [owner, setOwner] = useState('')
    const [description, setDescription] = useState('')
    const [gif, setGif] = useState('')
    const apiKey = 'ayn6ppCx9gLd6AL1Iv9dCumbPxDXK4FP'


    const handleCreateCard = (event) => {
        console.log("creating")
        event.preventDefault();
        fetchThreads(cardId)
        console.log(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${cardId}`);
        
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${cardId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: title, 
            description: description, 
            gif: gif,
            owner: owner
          }),
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            fetchThreads(cardId);
          })
          .catch((error) => {
            console.error('Error fetching threads:', error);
          });
          closeModal();
      };


  return(
 <>
   <div className = "modal">
        <form onSubmit = {handleCreateCard}>
            <div className= "modal-content" >
                <button className = "close-modal" onClick = {closeModal}>&#10006;</button>
                <h2>Create a New Card</h2>
                <input className = "modal-input" placeholder='enter card title..' onChange = {(event) => setTitle(event.target.value)}></input>
                <input className = "modal-input" placeholder='enter card description..'onChange = {(event) => setDescription(event.target.value)}></input>
                <input className = "modal-input" placeholder='search gifs..' onChange = {(event) => setGif(event.target.value)}></input>
                <button className = "gif-button">Search</button>
                <input className = "modal-input" placeholder='enter GIF URL' onChange = {(event) => setGif(event.target.value)}></input>
                <input className = "modal-input" placeholder='enter owner (optional)' onChange = {(event) => setOwner(event.target.value)}></input>
                <button type= "submit" className = "create-card">Create Card</button>
            </div>
        </form>
   </div>
 </>
  );
}

export default ThreadModal