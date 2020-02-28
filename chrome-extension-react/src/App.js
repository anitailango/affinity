import React from 'react';
// import logo from '../public/favicons/48.png';
import Header from './components/Header.js';
import Text from './components/Text.js';
import TestComponent from './components/Test.js';

function App() {
  return (
    <div className="App pa3" style={styles}>
      
      <div className="flex flex-column" > 
        <Header text="Title"/>
        <Text text="Text"/>
      </div>
      <TestComponent/>
    </div>
  );
}

const styles = {
  minWidth: "250px",
  background: "#F8F8F8"
}

//components to add: buttons with image, headings, title, button for determination of left/right leaning
export default App;
