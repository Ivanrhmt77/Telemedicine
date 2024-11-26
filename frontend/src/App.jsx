import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Patients from './pages/Patiens';
import Navbar from './components/Navbar';
import Doctors from './pages/Doctors';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path='/doctors' element={<Doctors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;