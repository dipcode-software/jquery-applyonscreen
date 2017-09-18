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

        checkScreen = function (size_string) {
            return window.matchMedia(size_string).matches;
        },
        
        validateValue = function (obj, size, opt) {
            var type = typeof(size);

            if ( 'min' === opt || 'max' === opt ) {
                if ("string" === type) {
                    return obj.options[opt][size];
                }
                else if ("number" === type) {
                    return size;
                }
            }

            return false;
        };

    var Plugin = function (element, applyFn, options) {

        this.element = element;

        this.applyFn = applyFn;

        this.defaults = {
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
                large: 10000
            }

        };

        this.init(options);
    };

    Plugin.prototype = {

        init: function (options) 
        {
            this.options = $.extend(this.defaults, options);
        },

        min: function (size) 
        {
            var min = validateValue(this, size, 'min');

            if (min && checkScreen("(min-width: " + min + "px)")) {
                this.applyFn(this.element);
            }
        },

        max: function (size) 
        {
            var max = validateValue(this, size, 'max');

            if (max && checkScreen("(max-width: " + max + "px)")) {
                this.applyFn(this.element);
            }
        },

        range: function (minSize, maxSize) 
        {
            var min = validateValue(this, minSize, 'min'),
                max = validateValue(this, maxSize, 'max');

            if (min && max) {
                var screenBool = checkScreen("(min-width: " + min + "px) and (max-width: " + max + "px)");

                if (screenBool) {
                    this.applyFn(this.element);
                }
            }
        }
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function(applyFn, options) {
        return new Plugin(this, applyFn, options);
    };

})(jQuery);