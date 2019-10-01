import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Button from './Button';

function App() {

  const [colourMode, setColourMode] = useState("light-mode");

  const changeColourMode = () => {
    setColourMode( colourMode === "dark-mode" ? "light-mode" : "dark-mode");
  };

  return (
    <div className="App">
      <Header text="Example" />
      <header className={"App-header" + ' ' + colourMode}>
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
        <Button onClick={() => changeColourMode()} 
        text = {colourMode === "light-mode" ? "Change to dark mode" : "Change to light mode"} />
      </header>
    </div>
  );
}

export default App;
