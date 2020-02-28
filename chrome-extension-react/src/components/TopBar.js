import React from 'react';
import CircleButton from './CircleButton';
import questionIcon from '../icons/icon-question';

function TopBar(props) {
	return (
		<div style={styles}>
			<CircleButton icon={questionIcon}/>
		</div>
	)
}

const styles = {

}