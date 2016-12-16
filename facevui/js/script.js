
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'featured';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          scrollTop,
          heightWin = $(window).height(),
          heightItem = 0,
          heightDoc = $(document).height();

      console.log(heightItem);
      that.isCalling = false;

      $(window).scroll(function() {
        scrollTop = $(window).scrollTop();
        if (scrollTop + heightItem >= heightDoc - heightWin) {
          that.loadFeatured();
          heightItem = that.element.find('.thumbnail-wrapper').height();
        }
      });
    },
    loadFeatured: function() {
      var that = this,
          data = that.options.target,
          dataRequest = that.options.request;

      $.ajax({
        method: data.type,
        url: data.url,
        data: dataRequest,
        dataType: 'json',
        beforeSend: function() {
          if (that.isCalling) {
            return false;
          }
          that.isCalling = true;
        },
        success: function(res) {
          if ('success' === res.status) {
            console.log(res.status);
            that.element.append(res.data);

            dataRequest.offset += dataRequest.limit;
          }
        },
        error: function(xhr, status, error) {
          console.log(status, error, data.url);
        },
        complete: function() {
          that.isCalling = false;
        }
      });
    },
    destroy: function() {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

