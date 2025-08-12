import './css/App.css'
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favourites" element={<Favourites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
