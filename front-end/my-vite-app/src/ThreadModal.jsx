import { useState, useEffect } from 'react'
import './ThreadModal.css'


const ThreadModal = ({closeModal, cardId, fetchThreads}) => {
    const [title, setTitle] = useState('')
    const [owner, setOwner] = useState('')
    const [description, setDescription] = useState('')
    const [gif, setGif] = useState('')
    const [gifSearch, setGifSearch] = useState('')
    const [gifOptions, setGifOptions] = useState([])
    const [gifUrl, setGifUrl] = useState("")
    const apiKey = 'ayn6ppCx9gLd6AL1Iv9dCumbPxDXK4FP'

    const handleCreateCard = (event) => {
        event.preventDefault();
        console.log("creating");
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${cardId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: title, 
            description: description, 
            gif: gif,  // This should be the selected GIF URL
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

      const fetchSearch = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=6&offset=0&rating=g&lang=en`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const urls = response.data.map(g => g.images && g.images.fixed_height ? g.images.fixed_height.url : null).filter(url => url !== null);
                    setGifOptions(urls);
                } else {
                    setGifOptions([]);
                }
            });
    }

      const handleSearch = (e) => {
        e.preventDefault();
        setGifSearch(e.target.value)
      }

      const goSearch = (e) => {
        e.preventDefault();
        fetchSearch();
      }

      const selectGif = (e, selectedURL) => {
        e.preventDefault();
        setGifUrl(selectedURL);
        setGif(selectedURL);
        setGifOptions([]);  // Clear the search results after selection
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
                <input className = "modal-input" placeholder='search gifs..' onChange = {handleSearch}></input>
                <button className = "gif-button" onClick = {e => goSearch(e)}>Search</button>
                <div className="gif-options">
                    {gifOptions.map((url, index) => (
                        <img key={index} className="gif-item" alt="GIF" src={url} onClick={(e) => selectGif(e, url)} />
                    ))}
                </div>
                <div className= "picked">
                    <div className="pickedUrl">
                        <h4>Selected GIF URL: </h4>
                        <p>{gifUrl}</p>
                    </div>
                    <img type="hidden" src={gifUrl} alt="Selected GIF" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    <input type="hidden" value={gifUrl} onChange={(event) => setGif(event.target.value)} />
                </div>
                <input className = "modal-input" placeholder='enter owner (optional)' onChange = {(event) => setOwner(event.target.value)}></input>
                <button type= "submit" className = "create-card">Create Card</button>
            </div>
        </form>
   </div>
 </>
  );
}

export default ThreadModal