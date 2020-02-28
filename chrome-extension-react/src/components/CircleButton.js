import React from 'react';

function CircleButton(props) {
	return (
		<a className="br-100">
			<img src={props.icon}/>
		</a>
	)
}

export default CircleButton;