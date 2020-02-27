import React from 'react';
import logo from './48.png';
import Header from './Header.js';
import Text from './Text.js';
//import TestComponent from './components/test';
import coloredScale from './coloredScale.png';

function App() {
  const author = localStorage.getItem("author");
    const content = localStorage.getItem("content");
    const publisher = localStorage.getItem("publisher");
  return (
    <div className="App ma3" style={styles}>
        <img src={logo} className="tc pv2" alt="logo" />
        <p className="serif h2">
          affinity 
        </p> 

        
      <div className="flex flex-column" > 
        <Header text="Title"/>
        <Text text={content}/>
        <Header text="Author"/>
        <Text text={author}/>
        <Header text="Publisher"/>
        <Text text={publisher}/>
      </div>
      <div>
        <img src={coloredScale} alt="scale"/>
      </div>
      {/* <TestComponent/> */}
    </div>
  );
}

const styles = {
  minWidth: "250px"
}

//components to add: buttons with image, headings, title, button for determination of left/right leaning
export default App;
