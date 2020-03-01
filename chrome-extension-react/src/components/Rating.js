import React from 'react';
import coloredScale from '../icons/coloredScale.png';
import FloatingIndicator from './FloatingIndicator';

class Rating extends React.Component {
	render() {
		return (
			<div className="flex flex-column items-center justify-around">
				<div className="ma4 br2 bg-white w-90">
					<p className="ma2 baskerville f4 fw5 tc mid-gray">
						Slightly Left-Leaning
					</p>
				</div>
				<div className="mh3 mb3 f7 avenir fl ttu tracked fw5">
					<div className="flex justify-between moon-gray">
						<FloatingIndicator/>
						<p>100%</p>
						<p>0%</p>
						<p>100%</p>
					</div>
					<img src={coloredScale} alt="scale" />
					<div className="flex justify-between gray">
						<p>LEFT</p>
						<p>MODERATE</p>
						<p>RIGHT</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Rating