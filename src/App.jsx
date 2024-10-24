// import { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
// import './App.css';
import HomePage from './pages/home-page';
import { LoginPage, RegisterPage } from './pages/auth';
import { NavBar } from './components/index';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
