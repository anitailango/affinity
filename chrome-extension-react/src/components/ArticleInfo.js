/* global chrome */
import React from 'react';
import Header from './Header.js';
import Text from './Text.js';

class ArticleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			author: "",
			publisher: ""
		};
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.type === "AFFINITY_ARTICLE_INFO") {
				const { author, content, publisher } = message;
				this.setState({ author, content, publisher});
			}
		});
	}

	render() {
		const { content, author, publisher } = this.state;
		return (
			<div className="bg-white flex flex-column pa3 ph4">
				<Header text="Title" />
				<Text text={content} />
				<Header text="Author" />
				<Text text={author} />
				<Header text="Publisher" />
				<Text text={publisher} />
			</div>
		);
	}
}

export default ArticleInfo;