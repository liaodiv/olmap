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
});

require(['jquery','underscore','backbone','ol','views/Navbar','dom-config', 'bootstrap' ],
    function ($, _, Backbone, ol, Navbar, DomConfig) {
        var navbar = new Navbar({
            items : DomConfig.navbarConfig
        });
        $('.leftnav').append(navbar.$el);

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