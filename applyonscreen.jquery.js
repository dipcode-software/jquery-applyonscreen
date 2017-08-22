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

        size_string = '',
        checkScreen = function(size_string) {
            return window.matchMedia(size_string).matches;
        },
        validateValue = function(size, opt) {
            var type = typeof(size);

            if ( 'min' === opt || 'max' === opt ) {
                if ("string" === type) return this.options[opt][size];
                if ("number" === type) return size;
            }

            return false;
        };

    var Plugin = function(element, applyFn, options) {

        this.element = element;

        this.applyFn = applyFn;

        this.options = {
            min: {
                mobile: 0,
                tablet: 768,
                desktop: 992,
                large: 1200
            },
            max: {
                mobile: 767,
                tablet: 991,
                desktop: 1199,
                large: Number.POSITIVE_INFINITY
            }

        };

        this.init(options);
    };

    Plugin.prototype = {
        init: function(options) {
            $.extend(this.options, options);
        },

        min: function(size) {
            var min = validateValue(size, 'min');

            if (min && checkScreen("(min-width: " + min + "px)")) {
                this.applyFn(this.element);
            }
        },

        max: function(size) {
            var max = validateValue(size, 'max');

            if (max && checkScreen("(max-width: " + max + "px)")) {
                this.applyFn(this.element);
            }
        },

        range: function(minSize, maxSize) {
            var min = validateValue(minSize, 'min'),
                max = validateValue(maxSize, 'max');

            if (min && max) {
                screenBool = checkScreen("(min-width: " + min + "px) and (max-width: " + max + "px)");

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