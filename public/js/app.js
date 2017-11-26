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
        'ol':'lib/ol-debug',
        'ol-ls':'lib/ol3-layerswitcher'
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
        },
        'ol-ls':{
            deps:['ol']
        }
    }
});

require(['jquery','underscore','backbone','ol','views/Navbar','views/MapView','dom-config','views/RotateBar','bootstrap' ,'ol-ls'],
    function ($, _, Backbone, ol, Navbar, MapView, DomConfig, RotateBar) {
        var navbar = new Navbar({
            items : DomConfig.navbarConfig
        });
        $('.leftnav').append(navbar.$el);

        var mapView = new MapView();
        $('.right-content').append(mapView.$el);
        mapView.setMap();

        var rotateBar = new RotateBar({
            iconName : DomConfig.iconBarConfig[0],
            map : mapView.getMap()
        });
        mapView.addControl(rotateBar, {
            top : 10,
            right : 10,
            position : 'absolute'
        })

    });