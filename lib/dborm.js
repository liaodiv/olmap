/**
 * Created by liao on 2017/11/20.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgis_23_sample', 'postgres', '1234', {
    host: '119.23.244.169',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const TASK = sequelize.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pipeId: {
        type: Sequelize.INTEGER
    },
    pipeType: {
        type: Sequelize.STRING
    },
    reasons: {
        type: Sequelize.STRING
    },
    backWords: {
        type: Sequelize.STRING
    },
    checkTime: {
        type: Sequelize.DATEONLY,
    },
    geom: {
        type: Sequelize.GEOMETRY
    }
},
    {
        freezeTableName: true,
        timestamps:false
    });

class dbquery{
    getTask(){
        return TASK.findAll();
    }
    dataTogeojosn(data){
        const  geostr = data.geom;
        delete data['geom'];
        console.log(data.geom);
        const feature={
            type:"Feature",
            geometry:geostr,
            properties:data
        }
        return feature;
    }
}

/*
var DB = new dbquery();

DB.getTask().then((data)=>{
    console.log(data);
    }
)*/
module.exports = dbquery;
