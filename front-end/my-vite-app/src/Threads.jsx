import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Threads.css';
import ThreadModal from './ThreadModal.jsx'

function Threads({ boardId }) {
    const [open, setOpen] = useState(false);
    const [cards, setCards] = useState([]);

    const displayModal = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (boardId) {
            fetchCards();
        }
    }, [boardId]);

    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/threads/${boardId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCards(data);
            })
            .catch(error => {
                console.error('Error fetching cards:', error);
            });
    };

    console.log('CARDS IN THREADS', cards);
    return (
        <>
            <header>
                <h1>KUDOBOARD</h1>
                <button className="create-button" onClick={displayModal}>add board</button>
                <Link to='/'><button className="home-button">go home</button></Link>
            </header>
            {cards.map(card => (
                <div className="thread" key={card.id}>
                    <h3 className="title">{card.title}</h3>
                    <p className="description">{card.description}</p>
                    <p className="owner">{card.owner}</p>
                    <button className="upvote">upvote: {card.votes}</button>
                    <button className="delete-card">delete card</button>
                </div>
            ))}
            {open && <ThreadModal closeModal={handleClose} />}
        </>
    )
}

export default Threads