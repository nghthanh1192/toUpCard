const express = require('express');
const request = require('request');
const crypto = require('crypto');
const PORT = process.env.PORT || 3030;



const app = express();
app.use(express.urlencoded());  
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// view engine setup
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/so', (req, res) => {
    res.render('so');
});

app.get('/lienquan', (req, res) => {
    res.render('lienquan');
});

app.get('/freefire', (req, res) => {
    res.render('freefire');
});

app.get('/fifaonline4', (req, res) => {
    res.render('fifaonline4');
});

app.get('/lol', (req, res) => {
    res.render('lol');
});

app.get('/freefire', (req, res) => {
    res.render('freefire');
});

app.post('/top-up-card', (req, res) => {
    let data = req.body;
    console.log(data);

    var partnerId = '7887624661';

    var partnerKey = '';

    var sign = partnerKey + data.code + data.serial; 
    var signMd5 = crypto.createHash('md5').update(sign).digest('hex');

    var requestId = partnerKey + data.code + data.serial; 
    var requestIdMd5 = crypto.createHash('md5').update(requestId).digest('hex');

    var options = {
        'method': 'POST',
        'url': 'https://thesieure.com/chargingws/v2',
        'headers': {
          'Content-Type': 'application/json'
        },
        formData: {
          'telco': data.type,
          'code': data.code,
          'serial': data.serial,
          'amount': data.amount,
          'request_id': requestIdMd5,
          'partner_id': partnerId,
          'sign': signMd5,
            'command': 'charging'
        }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);

    res.send(response.body);

    });
});

app.post('/check-card', (req, res) => {
    let data = req.body;

    console.log(data);
    
    var sign = '18e398cc4b5953b2b14d1c931c061e44' + data.code + data.serial; 
    var signMd5 = crypto.createHash('md5').update(sign).digest('hex');

    console.log(signMd5);

    var options = {
        'method': 'POST',
        'url': 'https://thesieure.com/chargingws/v2',
        'headers': {
          'Content-Type': 'application/json'
        },
        formData: {
          'telco': data.type,
          'code': data.code,
          'serial': data.serial,
          'amount': data.amount,
          'request_id': '0067077678',
          'partner_id': '0771824661',
          'sign': signMd5,
          'command': 'check'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        res.send(response.body.status);
      });

});

