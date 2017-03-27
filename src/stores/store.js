'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

let _store = {
  github: null
};

function StoreData(){
      this.github = null;
      this.httpstatus = null;
      this.username = null;
      this.editusername = true; // initial state is true
      this.requestsent = false;
};

StoreData.prototype.sortGithubData = function(item) {
  console.log('sorting github data');
};


StoreData.prototype.updateGithub = function(item){
  this.github  = [];
  for(var x=0; x<item.length; x++){
          this.github.push({
            name: item[x].name,
            description: item[x].description,
            watchers: item[x].watchers
          });
  };

  let sorted={}; 
  //
  // hashtable with seperated chaining
  for(var x=0;x<item.length; x++){
          if(sorted[item[x].watchers]==undefined) {
                sorted[item[x].watchers] = [];

                sorted[item[x].watchers].push({
                      index: x,
                      watchers: item[x].watchers,
                      name: item[x].name,
                      description: item[x].description,
                      watchers: item[x].watchers
                });

          } else {
                sorted[item[x].watchers].push({
                      index: x,
                      watchers: item[x].watchers,
                      name: item[x].name,
                      description: item[x].description,
                      watchers: item[x].watchers
                });
          }
  };
  _store.github = sorted;

};


var Data = new StoreData();

var Store = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getGithubData: function() {

    return _store.github;
  },
  getHttpStatus: function(){
    return Data.httpstatus;
  },
  getUserName: function(){
    return Data.username;
  },
  editUserName_Status: function(){
    return Data.editusername; 
  },
  isRequestSent: function(){
    return Data.requestsent;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.GITHUB:
      Data.updateGithub(action.data);
      Store.emitChange(CHANGE_EVENT);
      break;
    case appConstants.HTTPSTATUS:
      Data.httpstatus =  action.data;
      Store.emitChange(CHANGE_EVENT);
      break;
    case appConstants.USERNAME:
      Data.username =  action.data;
      Store.emitChange(CHANGE_EVENT);
      break;
    case appConstants.EDITUSERNAME:
      Data.username = null;
      Data.editusername = action.data;
      Store.emit(CHANGE_EVENT);
      break;
    case appConstants.SEND_REQUEST:
      Data.requestsent = true;
      Store.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = Store;
