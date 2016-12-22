var express = require('express');
var path = require('path');
var app = express();

// seleciona process.env.PORT, caso exista variavel de ambiente (heroku)
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) { 
  res.sendFile(__dirname + '/public/index.html')
});

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
    console.log(' Server running... in ' + port);
});
