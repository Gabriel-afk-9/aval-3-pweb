import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import FavoritesPage from './pages/Favorites';
import AboutPage from './pages/About';
import TeamPage from './pages/Team';
import CountryPage from './pages/Country';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="country/:code" element={<CountryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;