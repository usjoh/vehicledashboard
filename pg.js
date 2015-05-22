var pg = require('pg');
var config = require('./config.js');

options = {
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    host: config.db.host,
    ssl: true
}

exports.saveSetting = function(panelId, settingType, settingValue) {

    pg.connect(options, function(err, pgClient, done) {

        if (err) {
            console.log(err);

        } else {

            var query = 'INSERT INTO locationlogs(locationid, panelid, settingtype, settingvalue, timestamp) values($1, $2, $3, $4, $5)';

            pgClient.query(query, ['1', panelId, settingType, settingValue, new Date()], function(err, result) {

                done();

                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    // console.log('INSERT COMPLETED');
                }
            });
        }

    });
}

exports.getMeasures = function(settingType, success, error) {

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query('SELECT timestamp, settingtype, settingvalue FROM locationlogs WHERE settingtype = $1 ORDER BY timestamp DESC LIMIT 1', [settingType], function(err, result) {

            done();
            if (err) {
                error(err);
            } else {
                success(result.rows[0]);
            }
        });
    });
}

exports.getLocations = function(success, error) {

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query('SELECT * FROM salesforce.account', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return err;
            } else {
                success(result.rows);
            }
        });
    });

}

exports.createCase = function(panelId, settingType, settingValue, success, error) {


    var query = 'INSERT INTO salesforce.case(status, origin, description) VALUES($1, $2, $3)';
    var description = 'Battery Charge Cycles Reached ' + settingValue;

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, ['New', 'Web', description], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return err;
            }
        });
    });
}

exports.createOpportunity = function(panelId, settingType, settingValue, success, error) {

    var description = 'Battery Charge Reached ' + settingValue;
    var query = 'INSERT INTO salesforce.opportunity(name, stagename, closedate, description) VALUES($1, $2, $3, $4)';
    
    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, ['Test', 'Prospecting', new Date()], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return err;
            }
        });
    });
}

exports.incrementPanelAsset = function(panelId, success, error) {

    var query = 'UPDATE salesforce.asset SET Battery_Cycle_Incremented__c = true WHERE SerialNumber = $1';
    console.log(query);
    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, [panelId], function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            if (err) {
                return err;
            } else {
                console.log(result);
            }            
        });
    });
}
