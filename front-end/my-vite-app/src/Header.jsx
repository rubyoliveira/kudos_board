import { useState } from 'react';
import './Header.css';
function Header({ unFilter, filter, searchBoards, fetchCards}) {

    const handleChange = (event) => {
        if (event.target.value === '') {
            fetchCards(); 
        } else {
            searchBoards(event.target.value);
        }
    };

    const handleFilterType = (string) => () => {
        filter(string);
    };

    return (
        <>
            <div className="header">
                <h1 className="title">KUDOBOARD</h1>
                <input className="search" placeholder="search..." onChange = {handleChange}></input>
                <div className="header-buttons">
                    <button className="buttons" onClick={unFilter}>All</button>
                    <button className="buttons" onClick={handleFilterType('recent')}>Recent</button>
                    <button className="buttons" onClick={handleFilterType('celebration')}>Celebration</button>
                    <button className="buttons" onClick={handleFilterType('thank you')}>Thank You</button>
                    <button className="buttons" onClick={handleFilterType('inspiration')}>Inspiration</button>
                </div>
            </div>
        </>
    );
}
export default Header;