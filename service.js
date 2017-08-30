var express = require('express');
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
var client = new Client();

var port = process.env.OS_DEMO_SR_NODE_SERVICE_PORT || 8080,
    ip   = process.env.OS_DEMO_SR_NODE_SERVICE_HOST || '127.0.0.1';

var hostname = process.env.HOSTNAME;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------ METHODS --------------------------------------------------

app.all('/', function (req, res) {
  
  var message = '';
  client.get("http://os-demo-complex-node-oc-demo-complex-node.13.70.146.253.nip.io/tasks",
            function(data, response){
              message = response;
              var msg = 'NodeJS SR Service ' + message;

              res.status(200);
              res.end(msg);
            });
  
});

// ------------------ Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'os-demo-sr-node',
    hostName: hostname,
    ipAddr: ip,
    port: 8080,
    vipAddress: 'eureka-os-poc.13.70.146.253.nip.io',
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
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
});

// ------------------ Server Config --------------------------------------------
var server = app.listen(port, function () {
  
  console.log('Listening at http://%s:%s', ip, port);
});