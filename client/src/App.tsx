
import './App.css'
import AppBar from './components/AppBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from './pages/Hero';
import { QueryPage } from './pages/QueryPage';
function App() {

  return (
    <Router>
      <AppBar />  
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/query" element={<QueryPage/>} />
      
      </Routes>
    </Router>
  )
}

export default App
