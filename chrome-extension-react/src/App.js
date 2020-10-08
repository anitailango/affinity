/* global chrome */
import React, { useEffect, useState, useRef } from "react";
import CircleButton from "./components/GenericComponents/CircleButton";
import questionIcon from "./assets/icons/icon-question.png";
import { Header, Text, ExtensionHeader, ExtensionBody } from "./components/GenericComponents/GenericComponents";
import logo from "./assets/icons/logoface-affinity-grey.png";
import BottomBar from './components/BottomBar/BottomBar';

let DEBUG = false;

const FakeData = {
	isArticle: false,
	author: "N/A",
	title: "N/A",
	publisher: "N/A",
	urlString: "N/A",
};

function App(_props) {
	const [articleInfo, setArticleInfo] = useState(FakeData);
	useEffect(() => {
		chrome.runtime.onMessage.addListener(message_handler);
	});

	const message_handler = (message, sender, sendResponse) => {
		if (message.type === "AFFINITY_ARTICLE_INFO") {
			const { isArticle, author, title, publisher, rating, urlString } = message;
			setArticleInfo({ isArticle, author, title, publisher, rating, urlString, done: true });
		}
	}

	const { author, title, publisher, rating } = articleInfo;
	return (
		<div className="App" style={containerStyle}>
			<ExtensionHeader>
				<CircleButton icon={questionIcon} />
				<img src={logo} style={logoStyle} className="tc pv2" alt="logo" />
				<CircleButton icon={questionIcon} />
			</ExtensionHeader>				
			<ExtensionBody>
				<Header text="Title" />
				<Text text={title} />
				<Header text="Author" />
				<Text text={author} />
				<Header text="Publisher" />
				<Text text={publisher} />
				<Header text="Rating" />
				<Text text={rating} />
			</ExtensionBody>			
			<BottomBar />
		</div>
	);
}

const containerStyle = {
	minWidth: "314px",
	background: "#F8F8F8",
};

const topBarStyle = {
	height: "52px",
};

const logoStyle = {
	width: "50px",
	height: "17px",
};

export default App;
