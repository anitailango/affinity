import React from "react";
import ArticleInfo from "./components/ArticleInfo.js";
import CircleButton from "./components/CircleButton";
import questionIcon from "./assets/icons/icon-question.png";
import logo from "./assets/icons/logoface-affinity-grey.png";

function App() {
	return (
		<div className="App" style={containerStyle}>
			<div class="pa3 flex justify-between" style={topBarStyle}>
				<CircleButton icon={questionIcon} />
				<img src={logo} style={logoStyle} className="tc pv2" alt="logo" />
				<CircleButton icon={questionIcon} />
			</div>
			<ArticleInfo />
		</div>
	);
}

const containerStyle = {
	minWidth: "314px",
	background: "#F8F8F8",
};

const logoStyle = {
	width: "50px",
	height: "17px",
};

const topBarStyle = {
	height: "52px",
};

export default App;
