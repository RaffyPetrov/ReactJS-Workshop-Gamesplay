import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext.js';
import { GameProvider } from './contexts/GameContext.js';
import Header from './components/Header/Header.js';
import Home from './components/Home';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import CreateGame from './components/CreateGame/CreateGame.js';
import EditGame from './components/EditGame/EditGame.js';
import Catalog from './components/Catalog/Catalog.js';
import GameDetails from './components/GameDetails/GameDetails.js';
import './App.css';


const Register = lazy(() => import('./components/Register/Register.js'))

function App() {

  return (
    <AuthProvider>
      <div id="box">

        <Header />

        {/* Main Content */}
        <GameProvider>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={
                <Suspense fallback={<span>Loading....</span>}>
                  <Register />
                </Suspense>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/create" element={<CreateGame />} />
              <Route path="/games/:gameId/edit" element={<EditGame />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:gameId" element={<GameDetails  />} />
            </Routes>
          </main>
        </GameProvider>
      </div>
    </AuthProvider>

  );
}

export default App;
