define(['backbone'], function(Backbone) {

     var MapView = Backbone.View.extend({
         tagName : 'div',
         map : null,
         attributes : {
             id : 'map'
         },
         initialize : function() {
             this.render();
         },
         render : function() {
            return this;
         },
         setMap : function() {
             this.map = new ol.Map({
                 target: this.el,
                 layers:[
                     new ol.layer.Tile({
                         source:new ol.source.OSM()
                     })
                 ],
                 view:new ol.View({
                     center:ol.proj.fromLonLat([114,24]),
                     zoom:4
                 })
             });
         },
         getMap : function() {
             return this.map;
         }
     });
    return MapView;
});