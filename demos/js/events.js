/**
 * @Description a tools file for javascript
 * @Date 2019/11/16
 * @Author lingran
 */

(function(global) {
  var EventUtil = {
    // bind handler
    addHandler: function(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },

    // unbind handler
    removeHandler: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },

    // get event object
    getEvent: function(event) {
      return event ? event : window.event;
    },

    // get target object
    getTarget: function(event) {
      return event.target || event.srcElement;
    },

    // prevent event default behavior
    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },

    // stop event propagation
    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },

    // get button value
    getButton: function(event) {
      if (document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
      } else {
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            return 0;
          case 2:
          case 6:
            return 2;
          case 4:
            return 1;
        }
      }
    },

    // mousewheel hack
    getWheelDelta: function(event) {
      if (event.wheelDelta) {
        return client.engine.opera && client.engine.opera < 9.5
          ? -event.wheelDelta
          : event.wheelDelta;
      } else {
        return -event.detail * 40;
      }
    },

    // get char code
    getCharCode: function(event) {
      if (typeof event.charCode === "number") {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    },

    // get clipboard
    getClipboardText: function(event) {
      var clipboardData = event.clipboardData || window.clipboardData;
      return clipboardData.getData("text");
    },

    // set clipboard
    setClipboardText: function(event, value) {
      if (event.clipboardData) {
        return event.clipboardData.setData("text/plain", value);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", value);
      }
    }
  };

  global.EventUtil = EventUtil;
})(window);
