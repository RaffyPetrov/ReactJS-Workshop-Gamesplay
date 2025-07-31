import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import * as gameService from './services/gameService.js';

import { AuthContext } from './components/contexts/AuthContext.js';
import uniqid from 'uniqid';

import Header from './components/Header/Header.js';
import Home from './components/Home';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';

import CreateGame from './components/CreateGame/CreateGame.js';
import Catalog from './components/Catalog/Catalog.js';
import GameDetails from './components/GameDetails/GameDetails.js';

import './App.css';

const Register = lazy(() => import('./components/Register/Register.js'))

function App() {
  const [games, setGames] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const userLogin = (authData) => {
    setAuth(authData);
  }

  const userLogout = () => {
    setAuth({});
  };

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(game => game._id === gameId);

      const comments = game.comments || [];
      comments.push(comment)

      return [
        ...state.filter(x => x._id !== gameId),
        { ...game, comments },
      ];
    })
  };

  const addGameHandler = (gameData) => {
    setGames(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid(),
      },
    ]);

    navigate('/catalog')
  };

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        console.log(result);
        setGames(result);
      });
  }, []);

  return (
    <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
      <div id="box">

        <Header />

        {/* Main Content */}
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home games={games} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <Suspense fallback={<span>Loading....</span>}>
                <Register />
              </Suspense>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/create" element={<CreateGame addGameHandler={addGameHandler} />} />
            <Route path="/catalog" element={<Catalog games={games} />} />
            <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />

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
    </AuthContext.Provider>

  );
}

export default App;
