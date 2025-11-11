import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Plays from './pages/Plays';
import PlayDetail from './pages/PlayDetail';
import News from './pages/News';
import Activities from './pages/Activities';
import LatestNews from './pages/LatestNews';
import UpcomingEvents from './pages/UpcomingEvents';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen duration={7000} onComplete={handleSplashComplete} />}
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
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
