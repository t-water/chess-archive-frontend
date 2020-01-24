import React, {Component} from 'react'

function Spinner(props){
	const spinnerStyle = {
		'height': props.height ? props.height + 'px' : '50px',
		'width': 'auto'
	}
	return <img style={spinnerStyle} src="/assets/images/spinner.gif" alt="loading-spinner"/>
}

export default Spinner