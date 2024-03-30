import React from 'react';
import logo from './logo.svg';
import './App.css';
import Route from './components/Route';
import ScanPage from './pages/ScanPage';
import LoginPage from './pages/LoginPage';
import StatPage from './pages/StatPage';

function App() {
  return (
    <div className="App">
      <Route path="/">
        <ScanPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/scan">
        <ScanPage />
      </Route>
      <Route path="/stats">
        <StatPage />
      </Route>
    </div>
  );
}

export default App;
