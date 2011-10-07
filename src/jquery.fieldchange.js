/* FieldChange (jQuery Plugin)
 * version: 0.1
 * @homepage https://github.com/kristinalim/jquery-fieldchange
 *
 * Copyright (c) 2011 Kristina Lim
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function(jQuery) {
  jQuery.fn.fieldState = function() {
    var tagName = this[0].nodeName.toLowerCase();
    var tagType = $(this).attr('type');

    if ((tagName == 'input' && jQuery.inArray(tagType, ['text', 'hidden']) != -1) ||
      (tagName == 'textarea')) {
      return $(this).val();
    } else {
      return $(this).text();
    }
  };

  var
  defaults = {
    interval: 4000
  },
  eventName = 'fieldchange';

  jQuery.event.special.fieldchange = {
    setup: function(data, namespaces) {
    },
    teardown: function(namespaces) {
    },
    add: function(handlerObject) {
      var element = $(this);

      if (element.data(eventName) == null) {
        element.data(eventName, {
          cycles: { }
        });
      }

      var elementData = element.data(eventName);

      if (elementData.cycles[handlerObject.namespace] == null) {
        elementData.cycles[handlerObject.namespace] = new Array();
      }

      var cycleProperties = {
        interval: ((handlerObject.data != null && handlerObject.data.interval != null) ?
          handlerObject.data.interval :
          defaults.interval),
        handler: handlerObject.handler,
        lastState: element.fieldState()
      };

      cycleProperties.execution = setInterval(function() {
        jQuery.event.special[eventName].handler(element, cycleProperties);
      }, cycleProperties.interval);

      elementData.cycles[handlerObject.namespace].push(cycleProperties);
    },
    remove: function(handlerObject) {
      var element = $(this);
      var elementData = element.data(eventName);

      while (elementData.cycles[handlerObject.namespace].length > 0) {
        clearInterval(elementData.cycles[handlerObject.namespace].shift().execution);
      }
      delete elementData.cycles[handlerObject.namespace];
    },
    handler: function(element, cycleProperties) {
      var elementData = $(element).data(eventName);

      if (element.fieldState() != cycleProperties.lastState) {
        cycleProperties.lastState = element.fieldState();
        cycleProperties.handler.apply(element);
      }
    }
  };

  jQuery.fn.fieldchange = function(data, fn) {
    if (fn == null) {
      fn = data;
      data = null;
    }

    return arguments.length > 0 ?
      this.bind(eventName, data, fn) :
      this.trigger(eventName);
  };
})(jQuery);
