import React from 'react';
import '../css/App.css';
import Actions from '../actions/actions';
import VideoBackground from '../components/videobackground';
import Header from '../components/header';
import { Router, Route, Link } from 'react-router';

function HTML(){
	this.username = null;
}


HTML.prototype.setUserInputForm = function() {
	this.username = null;
	return(
      <div className="App">
		<Header/>
      	 <VideoBackground />
         
          <div className="form">
	           <input 
	           	placeholder='Enter Github Username'
	           	className="usernameInput" 
	           	onChange={(e)=> {
	           		this.username = e.target.value;
	           	}} 
	           />
	           <img 
	           		src="https://s3-us-west-2.amazonaws.com/jchiefelkportfolio/enter-circle.png" 
		           className="submitbutton" 
		          	 onClick={()=> {
		          	    Actions.editUserName(false);
		           		Actions.updateUsername(this.username);
		           
		           }}
	           />
          </div>
      </div>
	);

};

HTML.prototype.setSubmitForm = function(item){
	return(
      <div className="App">
        <Header/>
          <div className="form"  >
	          <h1 className="namestyle" style={{cursor: 'pointer'}} onClick={()=> Actions.editUserName(true)}>{item}</h1>
	          <Link to="/repoinfo" onClick={()=> Actions.sendRequest(item) }> <img src="https://s3-us-west-1.amazonaws.com/cointelmob/icons/check.png" className="checkbutton" /> </Link>
          </div>
      </div>
	);
};


HTML.prototype.setGithubView = function(item){
	
	let view=[];

	for(var key in item){
		let data = item[key];

		for(var x=0;x<data.length;x++){
				view.push((
					<div className="githubchild" key={Math.random(x)}>
						<h2>{data[x].name}</h2>
						<h5>Number of Watchers: {data[x].watchers}</h5>
						<h5>{data[x].description}</h5>
					</div>
				));
		};
	};

	return(
      <div className="apiApp">
       		<Header/>
	  		<div className="githubparent">
	   			{view.reverse()}
      		</div>
      </div>
	);
};


HTML.prototype.userNotFound = function() {
	return(
      <div className="App">
      	 	 <Header />
	          <div className="form" >
		           <h1 className="namestyle" style={{cursor: 'pointer'}}>No Github User with that Name!!!</h1>
	          </div>
      </div>
	);

};

module.exports = new HTML();