import React from 'react';
import './App.css';
import Header from './components/header/header.component';
import Main from './components/main/main.component';

function App() {
  return (
    <div className="App">
      <Header appTitle="Yet another issue tracker" />
      <Main />
    </div>
  );
}

export default App;
