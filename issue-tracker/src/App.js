import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.component';
import Input from './components/input/input.component';


function App() {
  return (
    <div className="App">
      <Header appTitle="Yet another issue tracker" />
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
        <Input type={Input.types.email} id= {"emailId"} 
        name={"emailName"} placeholder={"email@test.com"} required={"true"}/>
        <Input type={Input.types.date} id= {"dateId"} 
        name={"dateName"} required={"false"}/>
      </header>
    </div>
  );
}

export default App;
