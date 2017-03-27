// server/app.js
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const http = require('http');
const app = express();
// Set Port
app.set('port', (process.env.PORT || 3000));
// Static JavaScript Bundle
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/github', function(req,res){
    let status,
    info = null;

    fetch(req.headers.endpoint,{
        method: 'get',
        accept: 'application/json', 
    })
    .then(function(response){
          status = response.status;
          return response.json();
    })
    .then(function(data){

      res.json({
          status: status,
          data: data
      });
    })
    .catch(function(error){
        console.log(error);
        res.json({err: err});
        next(err);
    });

});
// 
//
// Always return the main index.html, so react-router render the route in the client
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {

  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
   
});
//
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
});