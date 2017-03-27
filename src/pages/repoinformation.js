import React, { Component } from 'react';
import '../css/App.css';
import Store from '../stores/store';
import Actions from '../actions/actions';
import { Router, Route, Link } from 'react-router';
var HTML = require('../jsx/HTML');


class RepoInformation extends Component {
  
  constructor(){
    super();
    this.state={
      mainView: null, 
      githubdata: Store.getGithubData(),
      storeupdated: false
    };
  }

  componentDidMount(){
    Store.addChangeListener(this._onChange.bind(this));
    
    if(this.state.githubdata!=null){
        this.setState({
          mainView:  HTML.setGithubView(this.state.githubdata)
        });
    }
  }

  componentWillUnmount(){
    console.log('Unmounting');
    Store.removeChangeListener(this._onChange.bind(this));

  }

  componentWillUpdate(){
    // console.log(this.state.githubdata);
    if(this.state.storeupdated==true && this.state.githubdata!=null){
        this.setState({
          storeupdated: false,
          mainView:  HTML.setGithubView(this.state.githubdata)
        });
    }

  }

  _onChange(){
    this.setState({
       githubdata: Store.getGithubData(), 
       storeupdated: true,
    });
  }

  render() {
  
    return this.state.mainView;
  }
}

export default RepoInformation;