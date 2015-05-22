var express = require('express');
var router = express.Router();
var pg = require('../pg.js');
var mqtt = require('../mqtt.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.sendFile(__base + 'public/dashboard-1.html')

});

/* GET home page. */
router.get('/markers', function(req, res, next) {

    pg.getLocations(function(rows) {

        console.log('locations:');
        console.log(rows);

        res.send(rows);

    });

});

// INCREMENT BATTERY CYCLES
router.get('/button/cycle', function(req, res, next) {

    mqtt.incrementBatteryCycle();
    res.send('ok');
});

// SIMULATE PANEL ERROR ON
router.get('/button/error-on', function(req, res, next) {

    mqtt.simulatePanelErrorON();
    res.send('ok');
});

// SIMULATE PANEL ERROR OFF
router.get('/button/error-off', function(req, res, next) {

    mqtt.simulatePanelErrorOFF();
    res.send('ok');
});

// TURN ON BUTTON
router.get('/button/on', function(req, res, next) {

    mqtt.switchLightON();
    res.send('ok');
});

router.get('/button/off', function(req, res, next) {

    mqtt.switchLightOFF();
    res.send('ok');
});

// GET MEASURE ROUTES
// Battery Current
router.get('/markers/batterycurrent', function(req, res, next) {

    pg.getMeasures('BatteryCurrent', function(rows) {

        // console.log('BatteryCurrent:');
        // console.log(rows);

        res.send(rows);
    });
});

// Panel Watts - OK
router.get('/markers/panelwatts', function(req, res, next) {

    pg.getMeasures('PanelWatts', function(rows) {

      //  console.log('PanelWatts:');
      //  console.log(rows);

        res.send(rows);
    });
});

// Panel Current - OK
router.get('/markers/panelcurrent', function(req, res, next) {

    pg.getMeasures('PanelCurrent', function(rows) {

        res.send(rows);
    });
});

// Panel Watts - OK
router.get('/markers/panelwatts', function(req, res, next) {

    pg.getMeasures('PanelWatts', function(rows) {

        // console.log('PanelWatts:TEST');
        // console.log(rows);

        res.send(rows);
    });
});

// Appliance Current - OK
router.get('/markers/appliancecurrent', function(req, res, next) {

    pg.getMeasures('ApplianceCurrent', function(rows) {

        // console.log('ApplianceCurrent:');
        // console.log(rows);

        res.send(rows);
    });
});

// Appliance Current - OK
router.get('/markers/appliancewatts', function(req, res, next) {

    pg.getMeasures('ApplianceWatts', function(rows) {

        // console.log('ApplianceCurrent:');
        // console.log(rows);

        res.send(rows);
    });
});


// Appliance Current - OK
router.get('/markers/appliancewatts', function(req, res, next) {

    pg.getMeasures('ApplianceWatts', function(rows) {

        console.log('ApplianceWatts:');
        console.log(rows);

        res.send(rows);
    });
});

// Backup Voltage - OK
router.get('/markers/backupvoltage', function(req, res, next) {

    pg.getMeasures('BackupVoltage', function(rows) {

        // console.log('BackupVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});

// Battery Voltage - OK
router.get('/markers/batteryvoltage', function(req, res, next) {

    pg.getMeasures('BatteryVoltage', function(rows) {

        // console.log('BatteryVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});

// Appliance Voltage - OK
router.get('/markers/appliancevoltage', function(req, res, next) {

    pg.getMeasures('ApplianceVoltage', function(rows) {

        // console.log('ApplianceVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});


module.exports = router;