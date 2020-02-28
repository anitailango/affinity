import React from 'react';

class TestComponent extends React.Component {
	render() {
		const author = sessionStorage.getItem("author");
		const content = sessionStorage.getItem("content");
		return (
			<div>
				<p>Yo! I'm a react component</p>
				<p>Here's some data bruh: {author}</p>
				<p>Lemme get u some more data here: {content}</p>
				<p>If it doesn't say "Bob Roberts" and "Hello World", try navigating to <a href="https://www.nytimes.com/">https://www.nytimes.com/</a></p>
			</div>
		);
	}
}

export default TestComponent;