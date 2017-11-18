/**
 * Created by liao on 2017/11/14.
 */
/*var pg = require("pg");



class DB {
    constructor(){
        this.client = new pg.Client(conString);
        this.client.connect();
    }
    getCommunication(){
        var query=this.client.query("SELECT * FROM communication");
        query.on("end",function (result) {
            console.log(result);
        })
    }

}

const  db = new DB();
db.getCommunication();*/
/*
'postgis_23_sample','postgres','1234',{
    host:'119.23.244.169',
    dialect:'postgres',*/
/*const { Client } = require('pg')
var conString ="postgres://postgres:1234@119.23.244.169/postgis_23_sample";*/
const { Pool, Client } = require('pg')

/*const pool = new Pool({
    user: 'postgres',
    host: '119.23.244.169',
    database: 'postgis_23_sample',
    password: '1234',
    port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})*/

/*const  client = new Client({
    user: 'postgres',
    host: '119.23.244.169',
    database: 'postgis_23_sample',
    password: '1234',
    port: 5432,
})

client.connect();

client.query('SELECT NOW()').then( (err,res) => {
    console.log(err,res);
    client.end()
})*/
class  DB{
    constructor(){
        this.client = new Client({
            user: 'postgres',
            host: '119.23.244.169',
            database: 'postgis_23_sample',
            password: '1234',
            port: 5432,
        });
        this.client.connect();
    }
    test(){
        this.client.query('SELECT NOW()').then( (err,res) => {
            console.log(err,res);
            client.end()
        })
    }
    querytable(){
        this.client.query("SELECT gid,id,ST_AsGeoJSON(geom) AS geom FROM communication WHERE gid = 1").then(
            (err,res) => {
                console.log(err,res);
            }
        )
    }
}
const db = new DB();
db.test();
db.querytable();
