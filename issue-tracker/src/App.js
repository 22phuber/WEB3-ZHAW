import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.component';
import Input from './components/input/input.component';
import Modal from './components/modal/modal.component';
import Form from './components/form/form.component';
import Popup from './components/popup/popup.component';
import Button from './components/button/button.component';

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
        <Button
          elementId="myDamnButton"
          classes="btn btn-primary"
          type="button"
          name="myTestButton"
          clickHandler={e => alert("button clicked" )}
          text="click me"
          disabled={false}
        />
        <Popup title="Add Information!" show={true} />
      </header>
    </div>
  );
}

export default App;
