import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminPage from './pages/Admin/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AdminPage />} />
        <Route path="/admin/edit/:id" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
