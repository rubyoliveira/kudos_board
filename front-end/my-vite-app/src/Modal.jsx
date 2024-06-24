import { useState, useEffect } from 'react'
import './Modal.css'


const Modal = ({closeModal, fetchCards}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCreateCard = (event) => {
        console.log("creating")
        event.preventDefault();
        fetchCards()
        
        // Send the data to the backend
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: title, 
            category: selectedOption, 
            author: author 
          }),
        })
          .then((response) => {
            response.json()
        })
          .then((data) => {
            console.log(data)
            fetchCards()
        }
        )
          .catch((error) => console.error(error));

          closeModal();
      };
  return(
 <>
   <div className = "modal">
        <form onSubmit = {handleCreateCard}>
            <div className= "modal-content" >
                <button className = "close-modal" onClick = {closeModal}>&#10006;</button>
                <h2>Create a New Board</h2>
                <p>Title:</p>
                <input className = "modal-input" placeholder='title..' onChange = {(event) => setTitle(event.target.value)}></input>
                <div className = "dropdown">
                    <p>Category:</p>
                    <select className="sort" value={selectedOption} onChange={handleSelectChange} > 
                        <option value = "">select a category</option>
                        <option value ="recent" >recent</option>
                        <option value ="celebration" >celebration</option>
                        <option value ="thank you" >thank you</option>
                        <option value ="inspiration" >inspiration</option>
                    </select>
                </div>
                <p>Author:</p>
                <input className = "modal-input" placeholder='author..'onChange = {(event) => setAuthor(event.target.value)}></input>
                <button type= "submit" className = "create-board">Create Board</button>
            </div>
        </form>
   </div>
 </>
  );
}

export default Modal