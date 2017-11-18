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

require(['jquery','underscore','backbone','ol','views/Navbar','views/MapView','dom-config','bootstrap' ],
    function ($, _, Backbone, ol, Navbar, MapView, DomConfig) {
        var navbar = new Navbar({
            items : DomConfig.navbarConfig
        });
        $('.leftnav').append(navbar.$el);
        var mapView = new MapView();
        $('.right-content').append(mapView.$el);
        mapView.setMap();

    });