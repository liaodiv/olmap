/**
 * Created by 27353 on 2017/11/25.
 */
define(['underscore','jquery','backbone'], function (_,$,Backbone) {
        var LayerView = Backbone.View.extend({
            template: '<div class="panel-heading">' +
                    '<div class="panel-title"><span class="glyphicon glyphicon-star-empty"></span><a data-parent="#left-navbar" data-toggle="collapse" href="#<%- id %>">layerView</a></div>' +
                      '</div>'+
                      '<div id="layer>" class="panel-collapse collapse in>">' +
                       '<div class="panel-body">' +
                      '<div>11111</div>'+
                     '</div>' +
                     '</div>',
            render:function () {
                this.$el.html(this.template);
                return this;

            }

        })
        return LayerView;
    }
)


