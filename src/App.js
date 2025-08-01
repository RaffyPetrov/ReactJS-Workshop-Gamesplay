import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import * as gameService from './services/gameService.js';
import { AuthContext } from '../../games-play/src/contexts/AuthContext.js'
import { GameContext } from './contexts/GameContext.js';

import Header from './components/Header/Header.js';
import Home from './components/Home';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';

import CreateGame from './components/CreateGame/CreateGame.js';
import EditGame from './components/EditGame/EditGame.js';
import Catalog from './components/Catalog/Catalog.js';
import GameDetails from './components/GameDetails/GameDetails.js';

import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const Register = lazy(() => import('./components/Register/Register.js'))

function App() {
  const [games, setGames] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});
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

  const gameAdd = (gameData) => {
    setGames(state => [
      ...state,
      gameData,
    ]);

    navigate('/catalog');
  };

  const gameEdit = (gameId, gameData) => {
    setGames(state => state.map(x => x._id === gameId ? gameData : x))
  }

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        setGames(result);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div id="box">

        <Header />

        {/* Main Content */}
        <GameContext.Provider value={{games, gameAdd, gameEdit}}>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home games={games} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={
                <Suspense fallback={<span>Loading....</span>}>
                  <Register />
                </Suspense>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/create" element={<CreateGame addGameHandler={gameAdd} />} />
              <Route path="/games/:gameId/edit" element={<EditGame />} />
              <Route path="/catalog" element={<Catalog games={games} />} />
              <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />
            </Routes>
          </main>
        </GameContext.Provider>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
