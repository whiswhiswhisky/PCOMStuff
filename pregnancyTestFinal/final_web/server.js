console.log("server is starting!");
//Set up variables -------------------------------------------
var profileId = ""
var content = ""
var code ='';


//Set up server -------------------------------------------
var path = require('path');
var fs = require('fs');
var express = require('express');
var https = require('https');
var bodyParser = require('body-parser')
var request = require('request');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
var router = express.Router();
var app = express();


//Create paths for html files ---------
var path = require('path');
app.get('/ending',function(req,res){
    res.sendFile(path.join(__dirname + '/website/ending.html'))
})

// router.get('/ending',function(req,res){
//     res.sendFile(path.join(__dirname+'/ending.html'));
//     //__dirname : It will resolve to your project folder.
//   });

// app.use('/', router);


// function createServer(req, res) {
//     var path = url.parse(req.url).pathname;
//     var fsCallback = function(error, data) {
//         if(error) throw error;

//         res.writeHead(200);
//         res.write(data);
//         res.end();
//     }

//     switch(path) {
//         case '/ending':
//             doc = fs.readFile(__dirname + '/ending.html', fsCallback);
//         break;
//         default:
//             doc = fs.readFile(__dirname + '/index.html', fsCallback);
//         break;
//     }
// }

//Start server
var server = app.listen(5000,listening);
function listening(){
    console.log("i am listening!");
}

//use the Express package to host static file
app.use(express.static('website'));

var jsonParser = bodyParser.json()



//Main code: Get data from user -------------------------------------------
app.get('/receive_code', function (req, res) {
    code = req.originalUrl.substring(20);
    var html = '';

    // STEP 1: Authorization -- get token ----------------
    request.post({
        url: 'https://api.23andme.com/token/',
        form: {
            client_id: 'ad5e80182caf937c0858c0ad8584b3f2',
            client_secret: '146aca1f1458f0f933eab1934468e24d',
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: "http://localhost:5000/receive_code/",
            scope: "basic report:all"
        },
        json: true }, 

            //STEP 2: Get User's Profile ID  ----------------
            function(e, r, body) {
            if (!e && r.statusCode == 200) {
                var headers = {Authorization: 'Bearer ' + body.access_token};

                request.get({ url:'https://api.23andme.com/3/account/', headers: headers, json: true}, function (e, r, b) {
                    profileId = b.data[0].profiles[0].id;

                    // STEP 3: Get User's Report  ----------------
                    if (profileId.length > 0){
                        request.get({ url:'https://api.23andme.com/3/profile/'+profileId+'/report/', headers: headers, json: true}, function (e, r, b) {
                        console.log(b);
                        console.log("error" + e);
                        console.log("??????");
                        content = b;

                        // STEP 4: Redirect user to the ending page
                        if (!e && r.statusCode == 200){
                            // Method 1:
                            // window.location = "http://localhost:5000/ending"
                            window.location.href = 'http://localhost:5000/ending'

                            // Method 2:
                            // res.redirect('http://google.com');

                            //Method 3:
                            // app.get('/ending', function(req, res){
                            //     res.render('ending.html');
                            // });
                            console.log("DIRECTED!!")
                        }

                        });
                    } 
                                       
                });

            } else {
                console.log('fail');
                res.send(body);
            }
        });

    res.send(html)
  })

//Store fetched data as json on result page -------------------------------------------
app.get('/result',updateContent)
function updateContent(request,response){
    response.send(content);
}

