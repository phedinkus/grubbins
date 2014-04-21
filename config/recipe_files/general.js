(function ($) {
  $(function() {
    // Homepage Twitter feed
    $('.home #twitter ul').tweet({
      username: "paleoplan",
      retweets: false,
      avatar_size: 32,
      count: 1,
      intro_test: false,
      join_text: false,
      outro_text: false,
      loading_text: "Loading tweets...",
      template: "{text} {time}"
    });
    // Nutrition pop-down
    $('.dropdown').click(function(event) {
      var link = $(this),
          panel = link.next('div');
      event.preventDefault();
      link.toggleClass('expanded');
      panel.toggle();
    });
    // Global navigation behavior for small-screen touch devices
    $('#global li a').click(function(event) {
      if (window.outerWidth <= 768) {
        var nav = $(this).closest('nav');
        if (nav.hasClass('expanded') == false || event.target.href == document.location.href) {
          event.preventDefault();
        }
        nav.toggleClass('expanded');
      }
    });
    $('.template-tour .products li a').click(function(event) {
      if (window.outerWidth <= 768) {
        var nav = $(this).closest('ul');
        if (nav.hasClass('expanded') == false || event.target.href == document.location.href) {
          event.preventDefault();
        }
        nav.toggleClass('expanded');
      }
    });
    watchPopup('#global');
    if ($('body').hasClass('template-tour')) {
      var tab_navigation = $(".tab-navigation > li"),
          tab_navigation_links = tab_navigation.find("a"),
          tabs = $(".tabs > li"),
          global_navigation = $("#menu-primary-nav > li"),
          global_navigation_links = $("#menu-primary-nav a[href^='/tour/']");
      if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7)) {
        window.onhashchange = function() {
          updateTourTabs(window.location.hash, global_navigation, global_navigation_links, tabs, tab_navigation, tab_navigation_links);
        };
      } else {
        tab_navigation_links.add(global_navigation_links).click(function(event) {
          var $this = $(this),
              hash = '#' + $this.attr('href').replace( /^[^#]*#?(.*)$/, '$1' );
          event.preventDefault();
          window.location.hash = hash;
          updateTourTabs(hash, global_navigation, global_navigation_links, tabs, tab_navigation, tab_navigation_links);
        });
      }
      if (window.location.hash !== "") {
        updateTourTabs(window.location.hash, global_navigation, global_navigation_links, tabs, tab_navigation, tab_navigation_links);
      }
    }
    function updateTourTabs(hash, global_navigation, global_navigation_links, tabs, tab_navigation, tab_navigation_links) {
      var $window = $(window),
          $tab_container = $(".tab-navigation");
      if (global_navigation.filter("[href=" + hash + "]").length !== 0 || tab_navigation_links.filter("[href=" + hash + "]").length !== 0) {
        global_navigation.removeClass("current-menu-item");
        global_navigation_links.filter("[href$=" + hash + "]").closest('li').addClass("current-menu-item");
        tab_navigation.removeClass("current");
        tab_navigation_links.filter("[href=" + hash + "]").closest('li').addClass("current");
        tabs.removeClass("current");
        tabs.filter(hash + "-tab").addClass("current");
        if ($(window).scrollTop() > ($tab_container.offset().top + $tab_container.outerHeight())) {
          $(window).scrollTop(0);
        }
      }
    }
    if ($('body').hasClass('dashboard')) {
      var tab_navigation = $(".tab-navigation > li"),
          tab_navigation_links = tab_navigation.find("a"),
          tabs = $(".tabs > li");
      if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7)) {
        window.onhashchange = function() {
          updateDashboardTabs(window.location.hash, tabs, tab_navigation, tab_navigation_links);
        };
      } else {
        tab_navigation_links.add(global_navigation_links).click(function(event) {
          var $this = $(this),
              hash = '#' + $this.attr('href').replace( /^[^#]*#?(.*)$/, '$1' );
          event.preventDefault();
          window.location.hash = hash;
          updateDashboardTabs(hash, tabs, tab_navigation, tab_navigation_links);
        });
      }
      if (window.location.hash !== "") {
        updateDashboardTabs(window.location.hash, tabs, tab_navigation, tab_navigation_links);
      }
    }
    function updateDashboardTabs(hash, tabs, tab_navigation, tab_navigation_links) {
      if (tab_navigation_links.filter("[href=" + hash + "]").length !== 0) {
        tab_navigation.removeClass("current");
        tab_navigation_links.filter("[href=" + hash + "]").closest('li').addClass("current");
        tabs.removeClass("current");
        tabs.filter(hash).addClass("current");
      }
    }
    // Show input notes for checkout form
    if ($('body').hasClass('woocommerce-checkout')) {
      $('.woocommerce .checkout').on('focus', 'fieldset input, fieldset select', function() {
        var $this = $(this),
            $fieldset = ($this.parents('fieldset').find('.checkout__group__note').length > 0) ? $this.parents('fieldset') : $this.parents('fieldset').parents('fieldset');
            console.log($fieldset);
        $('.checkout__group__note').removeClass('checkout__group__note--show');
        $fieldset.find('.checkout__group__note').addClass('checkout__group__note--show');
      });
    }
    
    // function animateSlideshow(direction) {
    //   var slides = $("#heros .slides > li"),
    //       slide_container = $(".home #heros .slides"),
    //       slide_count = slides.length,
    //       current_position = slide_container.css("marginLeft");
    //   if (current_position.match(/px/g) == 'px') {
    //     current_position = parseInt(current_position.replace(/[^-0-9]/g, '') / slides.first().width()) * 100;
    //   } else {
    //     current_position = parseInt(current_position.replace(/[^-0-9]/g, ''));
    //   }
    //   if (direction == 'left') {
    //     var target_position = current_position + 100,
    //         maxed_out = target_position > 0;
    //   } else {
    //     var target_position = current_position - 100,
    //         maxed_out = target_position <= (slide_count * -100);
    //   }
    //   if (slide_container.not(":animated") && !maxed_out) {
    //     slide_container.animate({marginLeft: target_position + "%"});
    //     checkSlideshowState(target_position, (slide_count - 1) * -100);
    //   }
    // }
    
    // function checkSlideshowState(position, limit) {
    //   var prev = $("#slideshow-navigation .prev"),
    //       next = $("#slideshow-navigation .next");
    //   if (position == 0) {
    //     prev.addClass('disabled');
    //   }
    //   if (position < 0) {
    //     prev.removeClass('disabled');
    //   }
    //   if (position == limit) {
    //     next.addClass('disabled');
    //   }
    //   if (position > limit) {
    //     next.removeClass('disabled');
    //   }
    // }
    
    function watchPopup(popup) {
      $(document).mouseup(function(event) {
        if ($(event.target).parents(popup).length == 0) {
          $(popup).closest('.expanded').removeClass('expanded');
        }
      });
    };

    // Checkout
    $('form.checkout_coupon').unbind('submit');
    /* AJAX Coupon Form Submission */
    $('form.checkout_coupon').submit( function() {
      var $form = $(this);

      if ( $form.is('.processing') ) return false;

      $form.addClass('processing').block({message: null, overlayCSS: {background: '#fff url(' + woocommerce_params.ajax_loader_url + ') no-repeat center', backgroundSize: '16px 16px', opacity: 0.6}});

      var data = {
        action:       'woocommerce_apply_coupon',
        security:       woocommerce_params.apply_coupon_nonce,
        coupon_code:    $form.find('input[name=coupon_code]').val()
      };

      $.ajax({
        type:     'POST',
        url:    woocommerce_params.ajax_url,
        data:     data,
        success:  function( code ) {
          //reload page upon success to show updated total with coupon changes

          $('.woocommerce-error, .woocommerce-message').remove();
          $form.removeClass('processing').unblock();

          if ( code ) {
            if (code.indexOf("woocommerce-error") == -1) {
              window.location.href = '/checkout';
            } else {
              $form.before( code );
              $form.slideUp();
            }
            

            // $('body').trigger('update_checkout');
          }
        },
        dataType:   "html"
      });
      return false;
    });
  });
}(jQuery));
