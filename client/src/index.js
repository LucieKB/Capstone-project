import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { GoalsProvider } from './contexts/GoalsContext';
import { RewardsProvider } from './contexts/RewardsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
   
    <UserProvider>
    <GoalsProvider>
    <RewardsProvider>
    <App />
    </RewardsProvider>
    </GoalsProvider>
    </UserProvider>
    
  </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
