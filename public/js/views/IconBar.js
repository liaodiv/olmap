define(['backbone'], function(Backbone) {

    var IconBar = Backbone.View.extend({
        template : _.template('<div class="icon-fold <%-iconName%>"></div>'),
        tagName : 'div',
        className : 'icon-container',
        initialize : function(options) {
            this.options = options;
            this.render();
        },
        render : function() {
            return this;
        },
        toggle : function() {
            return false;
        }
    });
    return IconBar;

});