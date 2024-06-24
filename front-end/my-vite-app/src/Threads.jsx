import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Threads.css';
import ThreadModal from './ThreadModal.jsx'
import ThreadCards from './ThreadCards.jsx'
import { useParams } from 'react-router-dom';

function Threads() {
    const { cardId } = useParams();
    const [open, setOpen] = useState(false);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const displayModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const id = cardId

    useEffect(() => {
        fetchThreads(id)
    }, [id]);

    const fetchThreads = (id) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then(data => {
          setThreads(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching threads:", err);
          setError('Failed to load threads');
          setLoading(false);
        });
    }

    return (
        <>
            <header>
                <h1>KUDOBOARD</h1>
                <button className="create-button" onClick={displayModal}>add board</button>
                <Link to='/'><button className="home-button">go home</button></Link>
            </header>
            <div className = "cards">
                {threads.map(card => (
                <ThreadCards 
                        key ={card.id} 
                        id = {card.id}
                        title = {card.title}
                        gif = {card.gif}
                        description = {card.description}
                        owner = {card.owner}
                        votes = {card.votes}
                        fetchThreads= {fetchThreads}
                        cardId = {id}
                    />
                ))}
            </div>
            {open && <ThreadModal closeModal={handleClose} cardId = {id} fetchThreads = {fetchThreads}/>}
        </>
    )
}

export default Threads