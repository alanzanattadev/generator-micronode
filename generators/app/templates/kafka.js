var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
var KeyedMessage = kafka.KeyedMessage;

var config = {
  clients: {
    client: undefined,
    consumer: undefined,
    producer: undefined
  },
  connect: function(cb) {
    cb = cb || function() {};
    config.clients.client = new kafka.Client(process.env.MICROSERVICE_ZOOKEEPER_IP + ":2181", "<%= project.name %>");

    config.clients.producer = new Producer(config.clients.client);
    config.clients.producer.on('error', function(err) {
      console.log("error while producing message: " + err);
    });

    config.clients.consumer = new Consumer(
      config.clients.client,
      [
        { topic: '', partition: 0 }
      ],
      {
        groupId: "<%= project.name %>s"
      }
    );
    config.clients.consumer.on('error', function(err) {
      console.log("error while consuming message: " + err);
    });

    config.clients.producer.on('ready', function() {
      console.log("producer ready");
      // require('../lib/controllers/controller');
      cb();
    });
  },
  onMessage: function(topic, cb) {
    config.clients.consumer.on('message', function(message) {
      if (message.topic == topic) {
        cb(JSON.parse(message.value));
      }
    })
  },
  send: function(topic, message, cb) {
    cb = cb || function() {};
    config.clients.producer.send([{
      topic: topic,
      messages: JSON.stringify(message)
    }], cb);
  }
};

module.exports = config;
