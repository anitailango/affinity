import React from 'react';

const CircleButton = (props) => {
	return (
		<div className="br-100 bg-white" style={circleStyle}>
			<a href="#">
				<img src={props.icon} style={imgStyle}/>
			</a>
		</div>
	);
}

const circleStyle = {
	width: "26px",
	height: "26px",
	padding: "6px"
}

const imgStyle = {
	display: "block",
	margin: "auto",
	maxHeight: "100%",
	maxWidth: "100%"
}

export default CircleButton;