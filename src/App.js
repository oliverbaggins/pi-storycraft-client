import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NewProjectPage from './components/NewProjectPage';
import UserStoryList from './components/UserStoryList';
import NewNewProjectPage from './components/NewNewProject';
import Project from './components/Project';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/new-new-project" element={<NewNewProjectPage />} />
        <Route path="/project/:id" element={<Project/>} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/user-stories/:id" element={<UserStoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
