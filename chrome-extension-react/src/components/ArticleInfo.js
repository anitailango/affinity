/* global chrome */
import React from "react";
import Header from "./GenericComponents/Header.js";
import Text from "./GenericComponents/Text.js";
import notArticleImage from "../assets/images/notArticle.png";
import LoadingGif from "../assets/images/affinity-ball-gif.gif";

// haven't tested this update on non-debug yet
const ArticleInfo = (props) => {
	const [state, setState] = useState({
		isArticle: false, 
		title: '', 
		author: '', 
		publisher: '',
		urlString: '', 
		updated: false
	});

	// data fetch effect
	useEffect(() => {
		if (!DEBUG) {
			chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
				if (message.type === "AFFINITY_ARTICLE_INFO") {
					const { isArticle, author, title, publisher, urlString } = message;
					setState({ isArticle, author, title, publisher, urlString });
				}
			});
		} else {
			const { isArticle, author, title, publisher, urlString } = DummyData;
			setState({ isArticle, author, title, publisher, urlString });
		}
	}, () => {
		// clean up
		chrome.runtime.onMessage.removeListener(message, sender, sendResponse);
	});

	// update effect
	useEffect(() => {
		console.log("UPDATED");
		if (updated == false) setState({ updated: true });
		console.log(state);
	}, [state])

	const renderArticleInfo = (isArticle, title, author, publisher) => {
		if (title == "None listed") {
			return (
				<div className="tc pa3">
					<img src={notArticleImage} className="pa3 w-80" />
					<Text text="Not an article" />
				</div>
			);
		} else {
			return (
				<div>
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
	}

	return (
		! updated ? (
			<div className="pa3 bg-white">
				<img src={LoadingGif} alt="loading" />
			</div>
		) : (
				renderArticleInfo(isArticle, title, author, publisher, updated)
		)
	);
}

export default ArticleInfo;
