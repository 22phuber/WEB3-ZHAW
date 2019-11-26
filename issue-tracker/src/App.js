import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header/header.component';

import Main from './components/main/main.component';

import Footer from './components/footer/footer.component';

function App() {

  const colourModeKey = "cmk";
  const [colourMode, setColourMode] = useState(localStorage.getItem(colourModeKey)|| "-light");

  const changeColourMode = () => {
    if(colourMode === "-light"){
      setColourMode("-dark");
    } else {
      setColourMode("-light");
    }
  }

  useEffect(() => {
    localStorage.setItem(colourModeKey, colourMode);
  }, [colourMode]);


  //Needed to block touch on iOS devices
  App.ontouchstart = (e) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <Header appTitle="Yet another issue tracker" colourMode={colourMode}/>
      <Main />
      <Footer checked={colourMode === "-dark"} onChange={changeColourMode} colourMode={colourMode}/>
    </div>
  );
}

export default App;
