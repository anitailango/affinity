import React from 'react';
import CircleButton from './CircleButton';
import questionIcon from '../icons/icon-question.png';
import logo from '../icons/logoface-affinity-grey.png';


function TopBar(props) {
	return (
		<div class="pa3 flex justify-between" style={styles}>
			<CircleButton icon={questionIcon}/>
			<img src={logo} style={logoStyles} className="tc pv2" alt="logo" />
			<CircleButton icon={questionIcon}/>
		</div>
	)
}

const styles = {
	height: "52px"
}

const logoStyles = {
	width: "50px",
	height: "17px"
}

export default TopBar;