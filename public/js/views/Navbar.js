/**
 * first View aha~ created 2017/11/18
 */

define(['backbone'], function(Backbone) {
    var Navbar =  Backbone.View.extend({
        tagName : 'div',
        className : 'pane-group',
        attributes : {
          id : 'left-navbar'
        },
        template : _.template('<div class="panel panel-default"></div>'),
        itemTempalte : _.template('<div class="panel-heading">' +
                                    '<div class="panel-title"><span class="<%-iconName%>"></span><a data-parent="#left-navbar" data-toggle="collapse" href="#<%- id %>"><%- main %></a></div>' +
                                  '</div>'+
                                  '<div id="<%-id %>" class="panel-collapse collapse in>">' +
                                    '<div class="panel-body">' +
                                        '<%_.each(sublist, function(list){%>' +
                                            '<div><%- list %></div>' +
                                        '<%});%>' +
                                    '</div>' +
                                  '</div>'),
        initialize : function(options) {
            this.items = options.items;
            this.render();
        },
        render : function() {
            this.$el.html(this.template());
            this.$('.panel').append(this.createSubList());
        },
        createSubList : function() {
            var list = '', that = this;
            _.each(this.items, function(item, idx) {
                list += that.itemTempalte({
                    id : item.id,
                    main : item.main,
                    sublist : item.sublist,
                    iconName : item.iconName
                });
            });
            return list;
        }
    });
    return Navbar;


});