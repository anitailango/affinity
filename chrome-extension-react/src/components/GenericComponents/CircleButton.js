import React from 'react';
import styled from 'styled-components';

const CircleButton = (props) => {
	return (
		<CircleButtonDiv>
			<a href="#">
				<CircleImage src={props.icon} />
			</a>
		</CircleButtonDiv>
	);
}

const CircleButtonDiv = styled.div`
	border-radius: 100%;
	background-color: white;
	width: 26px;
	height: 26px;
	padding: 6px;
`
const CircleImage = styled.img`
	display: block;
	margin: auto;
	max-height: 100%;
	max-width: 100%;
`




export default CircleButton;