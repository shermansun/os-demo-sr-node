var express = require('express');
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
var client = new Client();

var port = process.env.OS_DEMO_SR_NODE_SERVICE_PORT || 8080,
    ip   = process.env.OS_DEMO_SR_NODE_SERVICE_HOST || '127.0.0.1';

var hostname = process.env.HOSTNAME;

process.env['NODE_DEBUG'] = 'request';

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------ METHODS --------------------------------------------------

app.all('/', function (req, res) {
  console.log('GET service');
  var message = '';
  client.get("http://eureka-os-poc.13.70.146.253.nip.io/eureka/apps/",
            function(data, response){
              
              var msg = 'NodeJS SR Service ' + response;

              res.status(200);
              res.end(msg);
            });
  
});

app.all('/eureka', function(req, res){

  console.log('Connecting to eureka');
  eureka.logger.level('debug');
  eureka.start(function(error){
    console.log(error || 'complete');
    res.status(200);
    res.end(erro || 'complete');
  });

});

// ------------------ Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'os-demo-sr-node',
    hostName: 'http://os-demo-sr-node-os-demo-sr-node.13.70.146.253.nip.io/',
    ipAddr: '13.70.146.253',
    port: 80,
    vipAddress: ip,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'eureka-os-poc.13.70.146.253.nip.io',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});

// ------------------ Server Config --------------------------------------------
var server = app.listen(port, function () {
  
  console.log('Listening at http://%s:%s', ip, port);
});