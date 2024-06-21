import { useState, useEffect } from 'react'
import './ThreadModal.css'


const ThreadModal = ({closeModal}) => {


  return(
 <>
   <div className = "modal">
        <form>
            <div className= "modal-content" >
                <button className = "close-modal" onClick = {closeModal}>&#10006;</button>
                <h2>Create a New Card</h2>
                <input className = "modal-input" placeholder='enter card title..'></input>
                <input className = "modal-input" placeholder='enter card description..'></input>
                <input className = "modal-input" placeholder='search gifs..'></input>
                <button className = "gif-button">Search</button>
                <input className = "modal-input" placeholder='enter GIF URL'></input>
                <input className = "modal-input" placeholder='enter owner (optional)'></input>
                <button type= "submit" className = "create-card">Create Card</button>
            </div>
        </form>
   </div>
 </>
  );
}

export default ThreadModal