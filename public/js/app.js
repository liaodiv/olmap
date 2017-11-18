/**
 * Created by 27353 on 2017/10/19.
 */
require.config({
    baseUrl:"./js",
    paths:{
        'jquery':'lib/jquery.min',
        'bootstrap':'lib/bootstrap.min',
        'backbone':'lib/backbone',
        'underscore':'lib/underscore',
        'serializeObject':'lib/serializeObject',
        'ol':'lib/ol-debug'
    },
    shim:{
        'underscore':{
            exports:'_'
        },
        'backbone':{
            deps:['underscore','jquery'],
            exports:'Backbone'
        },
        'bootstrap':{
            deps:["jquery"]
        }
    }
})

require(['jquery','underscore','backbone','ol','bootstrap'],
    function ($,_,Backbone,ol) {
      var map = new ol.Map({
          target:'map',
          layers:[
              new ol.layer.Tile({
                  source:new ol.source.OSM()
              })
          ],
          view:new ol.View({
              center:ol.proj.fromLonLat([114,24]),
              zoom:4
          })
      })
        
    });