define(['backbone'], function (Backbone) {

    var MapView = Backbone.View.extend({
        tagName: 'div',
        map: null,
        overLayer:null,
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
                zoom: 17,
                projection : ol.proj.get('EPSG:4326')
            });
            this.render();
            _.delay(this.addTasklayer.bind(this),1000);
        },
        render: function () {
            return this;
        },
        setMap: function () {
            this.setOverlayers();
            this.map = new ol.Map({
                target: this.el,
                layers: [
                   /* new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })*/
                    new ol.layer.Group({
                        'title': 'Base maps',
                        layers: [
                            new ol.layer.Tile({
                                title: 'OSM',
                                type: 'base',
                                source: new ol.source.OSM()
                            })
                        ]
                    }),
                    this.overLayer
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
            var layerSwitcher = new ol.control.LayerSwitcher();
            this.map.addControl(layerSwitcher);
        },
        setOverlayers:function () {
            this.overLayer = new ol.layer.Group({
                title: 'Overlays',
                layers: [
                ]
            });
        },
        getMap: function () {
            return this.map;
        },
        addTasklayer: function () {
            var that = this;
            var map = this.getMap();
                $.get('/api/task', function (data) {
                    var features = new ol.format.GeoJSON().readFeatures(data, {featureProjection: 'EPSG:4326'});
                    var layer = new ol.layer.Vector({
                        title:'测试图层',
                        visible:true,
                        source: new ol.source.Vector({
                            features: features
                        }),
                        style: function(feature, resolution) {
                            return new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    color: '#DEB887',
                                    width: 2
                                }),
                                fill:new ol.style.Stroke({
                                    color:'#DEB887',
                                    width:2
                                }),
                                image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({
                                        color: '#DEB887'
                                    })
                                })
                            });
                        }
                    });
                    that.overLayer.getLayers().push(layer)
                    //map.addLayer(layer);
                    console.log(features);
                    var extent = features[0].getGeometry().getExtent();

                    var view = map.getView();
                    view.setCenter([extent[0],extent[1]]);
                });

        }
    });
    return MapView;
});