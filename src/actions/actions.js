var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var _store = null;


var makeGithubRequest = function(item) {
    let url = 'https://api.github.com/users/' + item +'/repos';

    fetch('/github',{
        method: 'get',
        accept: 'application/json', 
        mode: 'cors',
        headers: {endpoint: url}
    })
    .then(function(response) {
          if(response.status!=undefined){
              Actions.setStatus(response.status);
          }
          return response.json();
    })
    .then(function(data){
        Actions.updateGithubData(data.data);
        Actions.setStatus(data.status);
    })
    .catch(function(error){
        console.log(error);
    });
};


var Actions = {

  setStatus: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.HTTPSTATUS,
      data: item 
    });
  },

  sendRequest: function(item){
    makeGithubRequest(item);
    AppDispatcher.handleAction({
      actionType: appConstants.SEND_REQUEST,
      data: event
    });
  },

  updateGithubData: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.GITHUB,
      data: item 
    });
  },

  updateUsername: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.USERNAME,
      data: item 
    });
  },

  editUserName: function(item){

    AppDispatcher.handleAction({
      actionType: appConstants.EDITUSERNAME,
      data: item 
    });
  }




};
module.exports = Actions;