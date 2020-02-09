import React from 'react';
import logo from './48.png';
import Header from './Header.js';
import Text from './Text.js';
import TestComponent from './components/test';

function App() {
  return (
    <div className="App ma3">
        <img src={logo} className="tc pv2" alt="logo" />
        <p className="serif h2">
          affinity 
        </p> 
      <div className="flex flex-column" > 
        <Header text="Title"/>
        <Text />
      </div>
      <TestComponent/>
    </div>
  );
}
//components to add: buttons with image, headings, title, button for determination of left/right leaning
export default App;
