(function ($, window, document, undefined) {
  "use strict";
  var animationFinished = false;
  var pageLoaded = false;
  function whichAnimationEvent() {
    var t,
      el = document.createElement("fakeelement");

    var animations = {
      animation: "animationend",
      OAnimation: "oAnimationEnd",
      MozAnimation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
    };

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

  var $winW = function () {
    return $(window).width();
  };
  var $winH = function () {
    return $(window).height();
  };
  var $screensize = function (element) {
    $(element).width($winW()).height($winH());
  };
  var screencheck = function (mediasize) {
    if (typeof window.matchMedia !== "undefined") {
      var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
      if (screensize.matches) {
        return true;
      } else {
        return false;
      }
    } else {
      if ($winW() <= mediasize) {
        return true;
      } else {
        return false;
      }
    }
  };

  var count = 0;
  var animationEvent = whichAnimationEvent();
  $("#loader").on(animationEvent, function (event) {
    count++;
    if (count === 14) {
      animationFinished = true;
      tryPageOpen();
    }
  });

  function tryPageOpen() {
    if (animationFinished && pageLoaded) {
      $(".preloader").fadeOut("slow");
      $(".animated-row").each(function () {
        var $this = $(this);
        $this.find(".animate").each(function (i) {
          var $item = $(this);
          var animation = $item.data("animate");
          $item.on("inview", function (event, isInView) {
            if (isInView) {
              setTimeout(function () {
                $item.addClass("animated " + animation).removeClass("animate");
              }, i * 50);
            } else if (!screencheck(767)) {
              $item.removeClass("animated " + animation).addClass("animate");
            }
          });
        });
      });
    }
  }
  $(document).ready(function () {
    $(window).on("load", function () {
      pageLoaded = true;
      tryPageOpen();
    });
  });
})(jQuery, window, document);
