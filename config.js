var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'ec2-23-21-73-32.compute-1.amazonaws.com';
config.db.port = process.env.DB_PORT || 5432;
config.db.username = process.env.DB_USERNAME || 'putujooxlyfpep';
config.db.password = process.env.DB_PASSWORD || 'uO1GsyvEHAx5lRAVTJA23X_fAD';
config.db.database = process.env.DB_NAME || 'd2incm6jg4v8nm';

config.mqtt.host = process.env.MQTT_HOST || 'broker.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;
config.mqtt.username = process.env.MQTT_USERNAME || 'e2d8c2c5-43a4-4ad3-9389-ddde3494d7f7';
config.mqtt.password = process.env.MQTT_PASSWORD || '611yAL8X+sXLFlUlhCgE1A==';
config.mqtt.topic = process.env.MQTT_TOPIC || 'xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/5603a24f-d43d-4642-969d-1a61a63f6f13/solarpanel';
// var topicPrefix = "/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel1008";

module.exports = config;