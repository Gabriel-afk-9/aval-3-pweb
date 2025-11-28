import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import CountryPage from './pages/Country'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country" element={<CountryPage />} />
      </Routes>
    </Router>
  )
}

export default App
