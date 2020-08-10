import React, { useState } from 'react';
import CircleButton from './components/CircleButton';
import questionIcon from './assets/icons/icon-question.png';
import Header from "./components/Header";
import Text from "./components/Text";
import logo from "./assets/icons/logoface-affinity-grey.png";

let DEBUG = true;

const DummyData = {
  isArticle: true,
  author: "Joe Bruin",
  title: "UCLA is the Best",
  publisher: "affinity",
  urlString: "google.com"
}
function getInfo() {
  // if (!DEBUG) {
  //   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //     if (message.type === "AFFINITY_ARTICLE_INFO") {
  //       const { isArticle, author, title, publisher, urlString } = message;
  //       this.setState({ isArticle, author, title, publisher, urlString });
  //     }
  //   });
  // }
  // else {
  const { isArticle, author, title, publisher, urlString } = DummyData;
  //   this.setState({ isArticle, author, title, publisher, urlString });
  // }
  return ({ isArticle, author, title, publisher, urlString });
}
function App() {
  let { isArticle, author, title, publisher, urlString } = getInfo();//.then(

  return (
    <div className="App" style={containerStyle}>
      <div class="pa3 flex justify-between" style={topBarStyle}>
        <CircleButton icon={questionIcon} />
        <img src={logo} style={logoStyle} className="tc pv2" alt="logo" />
        <CircleButton icon={questionIcon} />
      </div>
      <div className="bg-white flex flex-column pa3 ph4">
        <Header text="Title" />
        <Text text={title} />
        <Header text="Author" />
        <Text text={author} />
        <Header text="Publisher" />
        <Text text={publisher} />
      </div>
    </div>
  );
}

const containerStyle = {
  minWidth: "314px",
  background: "#F8F8F8",
};

const topBarStyle = {
  height: "52px"
}

const logoStyle = {
  width: "50px",
  height: "17px"
}

export default App;
