var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.OS_DEMO_SR_NODE_SERVICE_PORT || 8080,
    ip   = process.env.OS_DEMO_SR_NODE_SERVICE_HOST || '0.0.0.0';

var hostname = process.env.HOSTNAME;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------ METHODS --------------------------------------------------

app.all('/', function (req, res) {
  
  var msg = 'NodeJS SR Service ' + port;
  res.status(200);
  res.end(msg);
})

// ------------------ Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'os-demo-sr-node',
    hostName: hostname,
    ipAddr: ip,
    statusPageUrl: 'http://' + hostname + ':' + port,
    port: {
      '$': 8080,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
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