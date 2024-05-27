import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
