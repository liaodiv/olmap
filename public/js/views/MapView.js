define(['backbone'], function (Backbone) {

    var MapView = Backbone.View.extend({
        tagName: 'div',
        map: null,
        attributes: {
            id: 'map'
        },
        addControl: function (control, position) {
            if (control && position) {
                var element = control.$el;
                element.css(position);
                control.parent = this;
                $(this.map.getViewport()).append(element);
                this.trigger('componentAdded', control);
                control.trigger('componentAdded', this);
            }

        },
        initialize: function () {
            this.view = new ol.View({
                center: [12734150,3570900],
                zoom: 17
            });
            this.render();
            _.delay(this.addTasklayer.bind(this),1000);
        },
        render: function () {
            return this;
        },
        setMap: function () {
            this.map = new ol.Map({
                target: this.el,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                loadTilesWhileAnimating: true,
                view: this.view,
                controls:ol.control.defaults().extend([
                    new ol.control.ScaleLine(),
                    new ol.control.MousePosition({
                        undefinedHTML: 'None',
                        projection: 'EPSG:4326',
                        coordinateFormat: ol.coordinate.createStringXY(4),
                        className: 'ol-mouse-position'
                    })
                ])
            });
        },
        getMap: function () {
            return this.map;
        },
        addTasklayer: function () {

            var map = this.getMap();
                $.get('/api/task', function (data) {
                    var features = new ol.format.GeoJSON().readFeatures(data, {featureProjection: 'EPSG:4326'});
                    var layer = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: features
                        })
                    });
                    var extent = layer.getExtent();
                    map.addLayer(layer);
                    map.setExtent(extent);
                });

        }
    });
    return MapView;
});