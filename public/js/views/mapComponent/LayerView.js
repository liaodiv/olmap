/**
 * Created by 27353 on 2017/11/25.
 */
define(['underscore','jquery','backbone'], function (_,$,Backbone) {
        var LayerView = Backbone.View.extend({
            template: '<div class="panel-heading">' +
                    '<div class="panel-title"><span class="glyphicon glyphicon-star-empty"></span><a data-parent="#left-navbar" data-toggle="collapse" href="#layer">layerView</a></div>' +
                      '</div>'+
                      '<div id="layer"  class="panel-collapse collapse in>">' +
                       '<div class="panel-body">' +
                      '<div><ul class="list-group">' +
                        '<li class="list-group-item"><div class="task-checkbox"><input type="checkbox"></div><div class="task-title"><span>layername</span></div></li> '+
                        '<li class="list-group-item">2323</li> '+
                        '</ul></div>'+
                     '</div>' +
                     '</div>',
            attributes: {
                class:  'panel-default'
            },
            render:function () {
                this.$el.html(this.template);
                return this;

            }

        })
        return LayerView;
    }
)


