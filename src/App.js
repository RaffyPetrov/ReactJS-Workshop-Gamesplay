import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as gameService from './services/gameService.js';

import Header from './components/Header/Header.js';
import Home from './components/Home';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import CreateGame from './components/CreateGame/CreateGame.js';
import Catalog from './components/Catalog/Catalog.js';
import GameDetails from './components/GameDetails/GameDetails.js';


import './App.css';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        console.log(result);
        setGames(result);
      });
  }, []);

  return (
    <div id="box">

      <Header />

      {/* Main Content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home games={games}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/catalog" element={<Catalog games={games}/>} />
          <Route path="/catalog/:gameId" element={<GameDetails games={games}/>} />

        </Routes>


      </main>






      {/* Edit Page ( Only for the creator )*/}
      {/* <section id="edit-page" className="auth">
    //     <form id="edit">
    //       <div className="container">
    //         <h1>Edit Game</h1>
    //         <label htmlFor="leg-title">Legendary title:</label>
    //         <input type="text" id="title" name="title" defaultValue="" />
    //         <label htmlFor="category">Category:</label>
    //         <input type="text" id="category" name="category" defaultValue="" />
    //         <label htmlFor="levels">MaxLevel:</label>
    //         <input
    //           type="number"
    //           id="maxLevel"
    //           name="maxLevel"
    //           min={1}
    //           defaultValue=""
    //         />
    //         <label htmlFor="game-img">Image:</label>
    //         <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
    //         <label htmlFor="summary">Summary:</label>
    //         <textarea name="summary" id="summary" defaultValue={""} />
    //         <input className="btn submit" type="submit" defaultValue="Edit Game" />
    //       </div>
    //     </form>
    //   </section> */}

      



    </div>

  );
}

export default App;
