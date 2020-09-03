/* global chrome */
import React, { useEffect, useState } from "react";
import CircleButton from "./components/CircleButton";
import questionIcon from "./assets/icons/icon-question.png";
import Header from "./components/Header";
import Text from "./components/Text";
import logo from "./assets/icons/logoface-affinity-grey.png";

const SLIGHTLY_THRESHOLD = 0.5;

let DEBUG = false;

const FakeData = {
	isArticle: true,
	author: "Joe Bruin",
	title: "UCLA is the Best",
	publisher: "affinity",
	urlString: "google.com",
	rating: 0.0,
};

const api = "http://127.0.0.1:5000/";

function ratingToText(rating) {
	if (rating == 0) return "Neutral";
	const modifier = Math.abs(rating) < SLIGHTLY_THRESHOLD ? "Slightly" : "";
	const alignment = rating > 0 ? "Right" : "Left";
	return `${modifier} ${alignment} Leaning`;
}

function App(_) {
	const [articleInfo, setArticleInfo] = useState({});

	useEffect(() => {
		if (DEBUG) {
			setArticleInfo(FakeData);
			return;
		}

		chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
			if (message.type === "AFFINITY_ARTICLE_INFO") {
				console.log(message);
				setArticleInfo(message);
			}
		});

		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			const activeTab = tabs[0];
			console.log(activeTab);
			fetch(api + "?url=" + activeTab.url)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					setArticleInfo(json);
				});
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
			{articleInfo.rating && (
				<>
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
							{ratingToText(rating)}
						</div>
					</div>
				</>
			)}
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
