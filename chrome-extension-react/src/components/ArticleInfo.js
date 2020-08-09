/* global chrome */
import React from "react";
import Header from "./Header.js";
import Text from "./Text.js";
import notArticleImage from "../assets/images/notArticle.png";
import LoadingGif from "../assets/images/affinity-ball-gif.gif";

class ArticleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isArticle: false,
			title: "",
			author: "",
			publisher: "",
			updated: false,
		};
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.type === "AFFINITY_ARTICLE_INFO") {
				const { isArticle, author, title, publisher } = message;
				this.setState({ isArticle, author, title, publisher });
			}
		});
	}

	componentDidUpdate() {
		console.log("UPDATED");
		if (this.state.updated == false) this.setState({ updated: true });
		console.log(this.state);
	}

	renderArticleInfo(isArticle, title, author, publisher) {
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

	render() {
		const { isArticle, title, author, publisher, updated } = this.state;
		return !updated ? (
			<div className="pa3 bg-white">
				<img src={LoadingGif} alt="loading" />
			</div>
		) : (
			this.renderArticleInfo(isArticle, title, author, publisher, updated)
		);
	}
}

export default ArticleInfo;
