import React from 'react';

function FloatingIndicator(props) {
	return (
		<div className="flex flex-column items-center">
			<div style={boxStyle}>
				<p className="avenir ttu tracked fw5" style={textStyle}>25% Right</p>
			</div>
			<div style={triangleStyle}></div>
		</div>
	)
}

const textStyle = {
	fontSize: "0.6rem",
	textAlign: "center"
}

const boxStyle = {
	width: "75px",
	height: "20px",
	background: "gray",
	borderRadius: "1px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}

const triangleStyle = {
	width: "0",
	height: "0",
	borderLeft: "5px solid transparent",
	borderRight: "5px solid transparent",
	borderTop: "6px solid gray"
}

export default FloatingIndicator;