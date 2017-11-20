define(['backbone', 'views/IconBar'], function(Backbone, IconBar) {

    var RotateBar = IconBar.extend({

        events : {
            'click .icon-fold' : 'toggle',
            'click .expand-pane>span' : 'rotateMap'
        },
        initialize : function(options) {
            IconBar.prototype.initialize.call(this, options);
            this.expand = false;
            this.map = options && options.map;
        },
        render : function() {
            this.$el.html(this.template({
                iconName : this.options.iconName || ''
            }));
            this.$el.attr('title', 'rotate');
            this.appendExpand();
            this.$el.append(this.expandPane);
        },
        rotateMap : function(event) {
            var $span = $(event.currentTarget),
                view = this.map.getView(),
                className = $span.attr('class');
            if(className.indexOf('arrow-left') > -1) {
                view.animate({
                    rotation: view.getRotation() - Math.PI / 4,
                    easing: ol.easing.easeIn
                });
            }
            else if(className.indexOf('arrow-right') > -1) {
                view.animate({
                    rotation: view.getRotation() + Math.PI / 4,
                    easing: ol.easing.easeIn
                });
            }
            else {
                view.animate({
                    rotation: 0,
                    easing: ol.easing.easeOut
                });
            }

        },
        appendExpand : function() {
            this.expandPane = $('<div class="expand-pane"></div>');
            this.expandPane.append($('<span class="glyphicon glyphicon-arrow-left">'));
            this.expandPane.append($('<span class="glyphicon glyphicon glyphicon-arrow-up">'));
            this.expandPane.append($('<span class="glyphicon glyphicon-arrow-right">'));
        },
        toggle : function() {
            var that = this;
            if(this.expand) {
                this.$('.expand-pane').animate({width: '0em'}, function () {
                    that.expand = false;
                    that.$('.expand-pane').css('display', 'none');
                })
            }
            else {
                this.$('.expand-pane').css('display', 'inline-block');
                this.$('.expand-pane').animate({width: '4.125em'}, function () {
                    that.expand = true;
                });
            }

        }
        });
    return RotateBar

});