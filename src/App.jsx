import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Plays from './pages/Plays';
import PlayDetail from './pages/PlayDetail';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/plays" element={<Plays />} />
          <Route path="/plays/:playId" element={<PlayDetail />} />
          <Route path="/characters/:charId" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
