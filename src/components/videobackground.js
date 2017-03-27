import React, { Component } from 'react';
import '../css/App.css';

class VideoBackground extends Component {

	constructor(){
		super();
			this.index = 0;
			this.videosources = [

						{
							mp4: "https://s3-us-west-2.amazonaws.com/jchiefelkportfolio/videos/Eaze+-+Get+Medical+Marijuana+Delivered+in+20+Minutes+or+Less-QnRgxDO_TpI.mp4" ,
							webm: "https://s3-us-west-2.amazonaws.com/jchiefelkportfolio/videos/Eaze+-+Get+Medical+Marijuana+Delivered+in+20+Minutes+or+Less-QnRgxDO_TpI.webm"
						}

			];

			this.state ={
				mp4src: null,
				webmsrc: null,
				ended: false,
				index: 0,
				view: null
			};
	}

	componentDidMount(){

		this.setState({
				mp4src: this.videosources[0].mp4,
				webmsrc: this.videosources[0].webm,
				view: (
				<video 
				poster="http://powertoinhale.com/wp/wp-content/uploads/2015/12/eaze-to-deliver-cannabis-products-to-your-door-step-within-no-time.jpg"
				className="background-video" 

				onEnded={()=> {
						this.setState({
							ended: true, 
							view: null
						}); 


				}} autoPlay muted >
					  <source src={this.videosources[this.index].mp4} type="video/mp4"/>
					  <source src={this.videosources[this.index].webm} type="video/webm"/>
				</video>
				)
		});
	}

	componentDidUpdate(){
		if(this.state.ended==true){
			this.index+=1;
			if(this.index==(this.videosources.length) ){
				this.index = 0;
			}
			this.setState({
				ended: false,
				view: (
					<video 
				poster="http://powertoinhale.com/wp/wp-content/uploads/2015/12/eaze-to-deliver-cannabis-products-to-your-door-step-within-no-time.jpg"
				className="background-video" 

				onEnded={()=> {
						this.setState({
							ended: true, 
							view: null
						}); 


				}} autoPlay muted >
					  <source src={this.videosources[this.index].mp4} type="video/mp4"/>
					  <source src={this.videosources[this.index].webm} type="video/webm"/>
				</video>
				)
			});
		}
	}
	render() {
		return (this.state.view);
	}


};

export default VideoBackground;