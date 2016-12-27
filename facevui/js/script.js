
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'backtotop';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var showCls = this.options.class,
          time = this.options.time,
          self = $(this.element),
          scrollTop;

      $(window).on('scroll load resize', function(){
        scrollTop = $(window).scrollTop();
        if (scrollTop > 100) {
          self.addClass(showCls);
        } else {
          self.removeClass(showCls);
        }
      });

      self.click(function(){
        $('html, body').animate({
          scrollTop: 0
        }, time);
        return false;
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

  $.fn[pluginName].defaults = {
    class: 'show',
    time: 800
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

;(function($, window, FB, undefined) {
  'use strict';

  var pluginName = 'facebook-social';

  var showHideButton = function(isConnected) {
    if (isConnected) {
      this.vars.btnShare.show();
      this.vars.btnLogin.hide();
      this.vars.status.hide();
    }
    else {
      this.vars.status.show();
      this.vars.btnLogin.show();
      this.vars.btnShare.hide();
    }
  };
  var checkLoginState = function() {
    var that = this;
    FB.getLoginStatus(function(response) {
      showHideButton.call(that, response.status === 'connected');
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;

      that.vars = {
        btnLogin: that.element.find('.btn-login'),
        btnShare: that.element.find('.btn-share'),
        status: that.element.find('.status')
      };

      checkLoginState.call(this);

      that.vars.btnLogin.on('click', function() {
        FB.login(function() {
          checkLoginState.call(that);
        }, {scope: 'public_profile,email'});
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

}(jQuery, window, window.FB));

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
          scrollPosition,
          heightDoc,
          heightWin,
          limit,
          offset,
          totalRecord;

      that.elmLoading = that.element.next('.icon-circle');
      that.isCalling = false;
      that.isLoading = true;
      totalRecord = that.options.totalRecord || 0;
      limit = that.options.request.limit || 0;
      offset = that.options.request.offset || 0;

      $(window).scroll(function() {
        heightDoc = $(document).height();
        heightWin = $(window).height();
        scrollTop = $(window).scrollTop();
        scrollPosition = heightWin + scrollTop;
        if ( (heightDoc - scrollPosition) / heightDoc === 0 ) {
          if ( that.isLoading ) {
            that.elmLoading.show();
            setTimeout(function(){ that.loadFeatured(); }, 1000);

          }
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
            that.elmLoading.hide();
            that.element.append(res.data[dataRequest.offset]);

            dataRequest.offset = dataRequest.offset + dataRequest.limit;
            that.element.data('request', dataRequest);

            if ( dataRequest.offset === res.totalRecord ) {
              that.isLoading = false;
            }
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

