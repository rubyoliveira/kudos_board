import { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header.jsx";
import Cards from "./Cards.jsx";
import Modal from "./Modal.jsx";
import Threads from "./Threads.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [displayMode, setDisplayMode] = useState('regular'); // 'regular', 'filtered', 'searching'
  const [cardId, setCardId] = useState(0);
  
  const getCardId = (value) => {
    setCardId(value)
  }

  const displayModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCards(data);
        setDisplayMode('regular');
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  };

  const filterBoards = async (filterType) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${filterType}/filter`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCards(data);
        setDisplayMode('filtered');
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  };

  const searchBoards = async (searchQuery) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${searchQuery}/search`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCards(data);
      setDisplayMode('searching');
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header unFilter={fetchCards} filter={filterBoards} searchBoards={searchBoards} fetchCards={fetchCards} />
            <button onClick={displayModal} className="buttons">Create A New Board</button>
            <div className="cards">
              {cards.map(card => (
                <Cards
                  image={`https://picsum.photos/200/300?random=${card.id}`}
                  title={card.title}
                  category={card.category}
                  key={card.id}
                  id={card.id}
                  fetchCards={fetchCards}
                  getCardId={getCardId}
                />
              ))}
            </div>
            <footer><p className="footer-txt">© 2024 Ruby Oliveira</p></footer>
            {open && <Modal closeModal={handleClose} fetchCards={fetchCards} />}
          </>
        } />
        <Route path="/threads" element={<Threads boardId={cardId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;