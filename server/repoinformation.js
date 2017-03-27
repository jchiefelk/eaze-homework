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
      mainView: (<div/>), 
      githubdata: Store.getGithubData(),
      storeupdated: false
    };
  }

  componentDidMount(){
    Store.addChangeListener(this._onChange.bind(this));
     console.log(this.state.githubdata);
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange.bind(this));
  }



  _onChange(){
    this.setState({
       githubdata: Store.getGithubData(), 
       storeupdated: true,
    });
    console.log(this.state.githubdata);
  }

  render() {
    return this.state.mainView;
  }
}

export default RepoInformation;