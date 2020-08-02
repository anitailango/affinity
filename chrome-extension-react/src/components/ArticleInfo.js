/* global chrome */
import React from 'react';
import Header from './Header.js';
import Text from './Text.js';
import notArticle from './notArticle.png'
import Rating from './Rating.js'
import LoadingGif from '../icons/affinity-ball-gif.gif'
import BookmarkButton from './BookmarkButton'

var DEBUG = true;

const DummyData = {
	isArticle: true,
	author: "Joe Bruin",
	title: "UCLA is the Best",
	publisher: "affinity",
	urlString: "google.com"
}

class ArticleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isArticle: false,
			title: "",
			author: "",
			publisher: "",
			urlString: "",
			updated: false
		};
	}

	componentDidMount() {
		if (!DEBUG) {
			chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
				if (message.type === "AFFINITY_ARTICLE_INFO") {
					const { isArticle, author, title, publisher, urlString } = message;
					this.setState({ isArticle, author, title, publisher, urlString});
				}
			});
		}
		else {
			const { isArticle, author, title, publisher, urlString } = DummyData;
			this.setState({ isArticle, author, title, publisher, urlString });
		}
	}

	componentDidUpdate() {
		console.log("UPDATED")
		if (this.state.updated == false) this.setState({ updated: true })
		console.log(this.state)
	}

	renderArticleInfo (isArticle, title, author, publisher, urlString) {
		if (title == "None listed")
		{
			return ( 
			<div className="tc pa3">
				<img src={notArticle} className="pa3 w-80"/>
				<Text text="Not an article"/>
			</div>
			)
		}
		else
		{
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
				<div>
					<Rating />
				</div>
				<div className="avenir flex flex-column items-center">
					<BookmarkButton url={urlString} />
				</div>
			</div>
			)
		}
	}

	render() {
		const { isArticle, title, author, publisher, updated, urlString } = this.state;
		return (
			
			!updated ? 
				<div className="pa3 bg-white"> 				
					<img src={LoadingGif} alt = "loading"/>
				</div>
				:
				this.renderArticleInfo(isArticle, title, author, publisher, urlString)
		)
	}
}

export default ArticleInfo;