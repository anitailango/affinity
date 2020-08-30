/* global chrome */
import React, { useEffect, useState } from "react";
import CircleButton from "./components/CircleButton";
import questionIcon from "./assets/icons/icon-question.png";
import Header from "./components/Header";
import Text from "./components/Text";
import logo from "./assets/icons/logoface-affinity-grey.png";

let DEBUG = false;

const FakeData = {
	isArticle: true,
	author: "Joe Bruin",
	title: "UCLA is the Best",
	publisher: "affinity",
	urlString: "google.com",
	rating: 0.0,
};

function App(_props) {
	const [articleInfo, setArticleInfo] = useState({});

	useEffect(() => {
		if (DEBUG) {
			setArticleInfo(FakeData);
			return;
		}
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.type === "AFFINITY_ARTICLE_INFO") {
				setArticleInfo(message);
			}
		});
	}, []);

	const { author, title, publisher, rating } = articleInfo;
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
			<div className="pa3 flex flex-column items-center">
				<div className="pa3 br2 bg-white w-90 baskerville f4 fw5 tc mid-gray">
					{rating}
				</div>
			</div>
		</div>
	);
}

const containerStyle = {
	minWidth: "314px",
	maxWidth: "314px",
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
