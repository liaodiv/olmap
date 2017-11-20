define(['backbone'], function(Backbone) {

     var MapView = Backbone.View.extend({
         tagName : 'div',
         map : null,
         attributes : {
             id : 'map'
         },
         addControl : function(control, position) {
            if(control && position) {
                var element = control.$el;
                element.css(position);
                control.parent = this;
                $(this.map.getViewport()).append(element);
                this.trigger('componentAdded', control);
                control.trigger('componentAdded', this);
            }

         },
         initialize : function() {
             this.view = new ol.View({
                center : ol.proj.fromLonLat([114, 24]),
                zoom:4
             });
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
                 loadTilesWhileAnimating: true,
                 view : this.view
             });
         },
         getMap : function() {
             return this.map;
         }
     });
    return MapView;
});