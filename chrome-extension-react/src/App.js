import React from 'react';
import TopBar from './components/TopBar.js';
import ArticleInfo from './components/ArticleInfo.js';
import Rating from './components/Rating.js';

function App() {
  return (
    <div className="App" style={styles}>
      <TopBar/>
      <ArticleInfo/>
      <Rating/>
    </div>
  );
}

const styles = {
  minWidth: "314px",
  background: "#F8F8F8"
}

//components to add: buttons with image, headings, title, button for determination of left/right leaning
export default App;
