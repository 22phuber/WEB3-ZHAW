import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.component';
import Input from './components/input/input.component';
import Modal from './components/modal/modal.component';
import Form from './components/form/form.component';


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
        <Modal show={false} />
        <Form action={"https://dublin.zhaw.ch/~bkrt/cgi/showenv.cgi"} method={"POST"}
          children={
            <>
              <Input type={Input.types.email} id={"emailId"} autocomplete={"off"}
                name={"emailName"} placeholder={"email@test.com"} required={"true"} label={"email"} />
              <Input type={Input.types.date} id={"dateId"}
                name={"dateName"} required={"false"} label={"date"} autocomplete={"off"} />
              <Input type={Input.types.submit} id={"submit"} name={"submit"} value={"send"} />
            </>
          } />
      </header>
    </div>
  );
}

export default App;
