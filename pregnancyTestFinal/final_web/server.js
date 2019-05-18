console.log("server is starting!");

var path = require('path');
var fs = require('fs');
var express = require('express');
var https = require('https');
var bodyParser = require('body-parser')
// const axios = require('axios');
var request = require('request');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
var content = ""
//reference to express with a express variable “app”
var app = express();
// var server = https.createServer(certOptions, app).listen(443,listening)
var server = app.listen(5000,listening);

var code ='';

var jsonParser = bodyParser.json()


function listening(){
    console.log("i am listening!");
}

//use the Express package to host static file
app.use(express.static('website'));

// app.get('/receive_code', function (req, res) {
//     code = req.originalUrl.substring(20);
    
//     var html = '';

//     request.post({
//         url: 'https://api.23andme.com/token/',
//         form: {
//             client_id: 'ad5e80182caf937c0858c0ad8584b3f2',
//             client_secret: '146aca1f1458f0f933eab1934468e24d',
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: "http://localhost:5000/receive_code/",
//             scope: "genomes"
//         },
//         json: true }, function(e, r, body) {
//             if (!e && r.statusCode == 200) {
//                 console.log(body);
//                 var headers = {Authorization: 'Bearer ' + body.access_token};
//                 console.log(headers.Authorization)
//                     request.get({ url:'https://api.23andme.com/3/profile/a55cd4e314e810e9/marker/?accession_id=NC_000017.10', headers: headers, json: true}, function (e, r, b) {
//                         console.log(b);
//                         // console.log(b.data[0].summary);

//                         html = b;
//                         content = html;
//                     });


//             } else {
//                 console.log('fail');
//                 res.send(body);
//             }
//         });
//     res.send(html)
//   })

// // // REPORT
app.get('/receive_code', function (req, res) {
    code = req.originalUrl.substring(20);
    
    var html = '';

    request.post({
        url: 'https://api.23andme.com/token/',
        form: {
            client_id: 'ad5e80182caf937c0858c0ad8584b3f2',
            client_secret: '146aca1f1458f0f933eab1934468e24d',
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: "http://localhost:5000/receive_code/",
            scope: "report:all"
        },
        json: true }, function(e, r, body) {
            if (!e && r.statusCode == 200) {
                console.log(body);
                var headers = {Authorization: 'Bearer ' + body.access_token};
                console.log(headers.Authorization)
                    request.get({ url:'https://api.23andme.com/3/profile/a55cd4e314e810e9/report/', headers: headers, json: true}, function (e, r, b) {
                        console.log(b);
                        console.log(b.data[0].summary);

                        html = b;
                        content = html;
                    });


            } else {
                console.log('fail');
                res.send(body);
            }
        });
    res.send(html)
  })

app.get('/result',updateContent)
function updateContent(request,response){
    response.send(content);
}

// create a route to run certain part of code
// :foo some area to be entered by user
// app.get('/search/:foo/:num',sendFlower);

// function sendFlower(request,response){
//     document.body.style.backgroundColor = col;
//     var data = request.params;
//     var num = data.num;
//     var reply = "";
//     for (var i = 0; i < num; i ++){
//         reply += "I LOVE " + data.foo + " too";
//     }
//     response.send(reply);
// }
