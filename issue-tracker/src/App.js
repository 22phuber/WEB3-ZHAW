import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Button from './Button';

const changeBackgroundColor = () => {
  document.querySelector('header')
  .style.backgroundColor = #121212;
}

function App() {
  return (
    <div className="App">
      <Header text="Example" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={changeBackgroundColor()} text = "Change colour!" />
      </header>
    </div>
  );
}

export default App;
