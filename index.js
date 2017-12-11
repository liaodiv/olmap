/**
 * Created by liao on 2017/11/14.
 */

var express = require('express');
var bodyParser = require('body-parser');
const DB = require('./lib/dborm');



const db = new DB();


app = express();
app.use(bodyParser());
app.use(express.static('public'))


app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

/*app.get('/index', function (req, res) {
    console.log('/index');
    res.sendfile('./public/index.html');
});*/

app.get('/api/task', (req, res) => {
    db
        .getTask()
        .then((data) => {
                const geoCollection = {
                    type:"FeatureCollection",
                    crs: {
                        type: 'name',
                        properties: {
                            'name': 'EPSG:4326'
                        }
                    },
                    features:[]
                };
                data.forEach( (datai) => {
                    geoCollection.features.push(db.dataTogeojosn(datai));
                } );
            res.send(geoCollection)
        })
        .catch((error) => {
           console.log('task查询出错',error);
        })
})

/*
 app.post('/login', function (request, response) {
 var user = {
 username: request.body.UserName,
 password: request.body.Pwd,

 };
 console.log(user);
 db.findByUsername(user, function (error, data) {
 if(data) {
 response.send({state: "success", username: data})
 }else {
 response.send({state:'error'})
 }
 })

 })
 */


var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
