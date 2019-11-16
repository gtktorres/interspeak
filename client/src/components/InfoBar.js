import React from 'react';
import '../styles/InfoBar.css'

const InfoBar = ({room}) => {
	return (
		<div className="infoBar">
		<div className="leftInnerContainer">

		  <h3>{room}</h3>
		</div>
		<div className="rightInnerContainer">

		</div>
	  </div>
	);
};

export default InfoBar;