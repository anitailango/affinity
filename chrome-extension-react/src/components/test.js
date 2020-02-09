import React from 'react';

class TestComponent extends React.Component {
	render() {
		const author = localStorage.getItem("author");
		return (
			<div>
				<p>Yo! I'm a react component</p>
				<p>Here's some data bruh: {author}</p>
			</div>
		);
	}
}

export default TestComponent;