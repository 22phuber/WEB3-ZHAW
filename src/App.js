import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.component';

import Main from './components/main/main.component';

import Footer from './components/footer/footer.component';

function App() {

  const darkModeKey = "darkMode";
  const [darkModeActive, setDarkMode] = useState(localStorage.getItem(darkModeKey) === 'true');
  const [isMobileDevice, setIsModuleDevice] = useState(false);

  const changeColourMode = () => {
    setDarkMode(!darkModeActive);
  }

  useEffect(() => {
    localStorage.setItem(darkModeKey, darkModeActive);
  }, [darkModeActive]);

  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      setIsModuleDevice(true);
    }
  },[]);


  //Needed to block touch on iOS devices
  App.ontouchstart = (e) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <Header appTitle="Yet another issue tracker" darkMode={darkModeActive} mobileDevice={isMobileDevice} />
      <Main darkMode={darkModeActive} mobileDevice={isMobileDevice} changeDarkMode={changeColourMode}/>
      <Footer checked={darkModeActive} onChange={changeColourMode}
        darkMode={darkModeActive}
        mobileDevice={isMobileDevice} 
      />
    </div>
  );
}

export default App;
