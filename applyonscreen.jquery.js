/* globals jQuery */

/******************************************************************
 * Author: tcl
 *
 * To conditionaly run function on the screen limit defined by min and max;
 *
 *****************************************************************/


(function($) {

    "use strict";

    var pluginName = "applyOnScreen",
        dataKey = "plugin_" + pluginName,

        validScreens = ['mobile', 'tablet', 'desktop', 'large'],

        size_string = '',
        checkScreen = function(size_string) {
            return window.matchMedia(size_string).matches;
        };

    var Plugin = function(element, applyFn, options) {

        this.element = element;

        this.applyFn = applyFn;

        this.options = {
            min: {
                tablet: 768,
                desktop: 992,
                large: 1200
            },
            max: {
                mobile: 767,
                tablet: 991,
                desktop: 1199
            }

        };

        this.init(options);
    };

    Plugin.prototype = {
        init: function(options) {
            $.extend(this.options, options);
        },

        min: function(size) {
            var min = false,
                type = typeof(size);

            if ("string" === type) min = this.options.min[size];
            if ("number" === type) min = size;

            console.log('min: (' + type + ' -> ' + size + ') ' + min);

            if (min && checkScreen("(min-width: " + min + "px)")) {
                this.applyFn(this.element);
            }
        },

        max: function(size) {
            var max = false,
                type = typeof(size);

            if ("string" === type) max = this.options.max[size];
            if ("number" === type) max = size;

            console.log('max: (' + type + ' -> ' + size + ') ' + max);

            if (max && checkScreen("(max-width: " + max + "px)")) {
                this.applyFn(this.element);
            }
        },

        range: function(minSize, maxSize) {
            var min = false,
                max = false,
                screenBool = false,
                minType = typeof(minSize),
                maxType = typeof(maxSize);

            if ("string" === minType) min = this.options.min[minSize];
            if ("number" === minType) min = minSize;

            if ("string" === maxType) max = this.options.min[maxSize];
            if ("number" === maxType) max = maxSize;

            console.log('min: (' + minType + ' -> ' + minSize + ') ' + min);
            console.log('max: (' + maxType + ' -> ' + maxSize + ') ' + max);

            if (min && max) {
                screenBool = checkScreen("(min-width: " + min + "px) and (max-width: " + this.limits.max + "px)");

                if (screenBool) this.applyFn(this.element);
            }
        }
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function(applyFn, options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, applyFn, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

})(jQuery);