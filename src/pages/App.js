import React, { Component } from 'react';
import '../css/App.css';
import Store from '../stores/store';
import Actions from '../actions/actions';
import { Router, Route, Link } from 'react-router'

var HTML = require('../jsx/HTML');

class App extends Component {
  

  constructor(){
    super();
    this.state={
      mainView: null, 
      githubdata: Store.getGithubData(), 
      httpstatus: Store.getHttpStatus(), 
      username: Store.getUserName(),
      editusername: Store.editUserName_Status(),
      requestsent: Store.isRequestSent(),
      storeupdated: false,
      editusername: false
    };
  }

  componentDidMount(){
    Store.addChangeListener(this._onChange.bind(this));
    this.setState({
        mainView: HTML.setUserInputForm() 
    });
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange.bind(this));
    console.log('First Page Unmount');
  }

  componentDidUpdate(){

    if(this.state.storeupdated==true  && this.state.editusername==true){
      this.setState({
        storeupdated: false,
        mainView: HTML.setUserInputForm() 
      });
    }

    if(this.state.storeupdated==true && this.state.editusername==false) {
       this.setState({
           storeupdated: false,
           mainView: HTML.setSubmitForm(this.state.username)
       });
    }

    if(this.state.storeupdated==true && this.state.github!=null){
      this.setState({
        storeupdated: false,
        mainView: null
      });
    }
/**
    if(this.state.storeupdated==true && this.state.githubdata!=null){
        this.setState({
          storeupdated: false,
          mainView:  HTML.setGithubView(this.state.githubdata)
        });

    }
***/
    if(this.state.storeupdated==true && this.state.httpstatus==404 ){
        this.setState({
          storeupdated: false,
          mainView: HTML.userNotFound()
        });
    }


  }
  _onChange(){
    this.setState({
       githubdata: Store.getGithubData(), 
       httpstatus: Store.getHttpStatus(), 
       username: Store.getUserName(),
       storeupdated: true,
       editusername: Store.editUserName_Status(),
       requestsent: Store.isRequestSent()
    });
  }

  render() {
    return this.state.mainView;
  }
}

export default App;
