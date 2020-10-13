/* global chrome */
import React, { useEffect, useState, useRef } from "react";
import CircleButton from "./components/GenericComponents/CircleButton";
import questionIcon from "./assets/icons/icon-question.png";
import { ExtensionHeader, ExtensionBody } from "./components/GenericComponents/GenericComponents";
import logo from "./assets/icons/logoface-affinity-grey.png";
import BottomBar from './components/BottomBar/BottomBar';
import RatingView from './components/ExtensionViews/RatingView';
import BookmarksView from './components/ExtensionViews/BookmarksView';
import UserView from './components/ExtensionViews/UserView';

let DEBUG = false;

// const FakeData = {
// 	isArticle: false,
// 	author: "N/A",
// 	title: "N/A",
// 	publisher: "N/A",
// 	urlString: "N/A",
// };

// enum to define the views that can be shown in the extension body
const ExtensionViews = {
	RATING: 'rating',
	BOOKMARKS: 'bookmarks',
	USER: 'user'
}

function App(_props) {
	const [articleInfo, setArticleInfo] = useState({author: "start", title: 'start', publisher: 'start', rating: 'start'});
	const [currentView, setCurrentView] = useState(ExtensionViews.RATING);

	// initial setting of data
	chrome.storage.sync.get([
		'type', 'author', 'title', 'publisher', 'rating'], function(items) {
			console.log(items);
			setArticleInfo(items)
	});
	useEffect(() => {
		// when storage data changes update the article info
		chrome.storage.onChanged.addListener(async function(changes, namespace) {
			await chrome.storage.sync.get([
				'type', 'author', 'title', 'publisher', 'rating'], function(items) {
					console.log(items);
					setArticleInfo(items)
				});			
		  });	
	});

	

	const handleBottomBarClick = (e) => {
		e.persist();
		switch(e.target.id) {
			case 'rating':
				if (currentView !== ExtensionViews.RATING) {
					setCurrentView(ExtensionViews.RATING);
				}
				break;
			case 'user':
				if (currentView !== ExtensionViews.USER) {
					setCurrentView(ExtensionViews.USER);
				}
				break;
			case 'bookmarks':
				if (currentView !== ExtensionViews.BOOKMARKS) {
					setCurrentView(ExtensionViews.BOOKMARKS);
				}
				break;
			default:
				break;			
		}
	}

	const { author, title, publisher, rating } = articleInfo;

	let ViewComponent;
	switch (currentView) {
		case ExtensionViews.RATING:
			ViewComponent = <RatingView author={author} title={title} publisher={publisher} rating={rating} />
			break;
		case ExtensionViews.BOOKMARKS:
			ViewComponent = <BookmarksView />
			break;
		case ExtensionViews.USER:
			ViewComponent = <UserView />
			break;
	}
	
	return (
		<div className="App" style={containerStyle}>
			<ExtensionHeader>
				<CircleButton icon={questionIcon} />
				<img src={logo} style={logoStyle} className="tc pv2" alt="logo" />
				<CircleButton icon={questionIcon} />
			</ExtensionHeader>
			{ ViewComponent }
			<BottomBar handleViewChange={handleBottomBarClick}/>
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
