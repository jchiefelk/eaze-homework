import React, {  Component } from 'react';
// import { Router, Route, Link } from 'react-router';
require('../css/App.css');

export default class Header extends Component {

	 constructor(){
	  		super();
	  		this.state = {
	  			width: window.innerWidth
	  		};
	 }
	 componentDidMount(){
	    window.addEventListener('resize', this.handleResize.bind(this));
	 }
	 componentWillUnmount(){
	    window.removeEventListener('resize', this.handleResize.bind(this));
	 }
  	 handleResize(e) {
	    this.setState({
	      windowWidth: window.innerWidth
	    });
   	 }
	render() {
	    return (
	      <div className="header">
			    <img src="https://s3-us-west-2.amazonaws.com/jchiefelkportfolio/eaze-black.png" className="header-eazelogo"/>	
	      </div>
	    );
	}

}