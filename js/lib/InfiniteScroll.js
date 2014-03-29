/* jQuery plugin to continuously cycle through information by item or by page. */ 
(function ($) {﻿  
    $.fn.infiniteScroll = function(options) {
﻿  var speed,
﻿      request,
﻿      scrollTimer = null,
﻿      interactivityTimer = null,
﻿      topIndex = 0,
﻿      isLoading = true,
﻿      isLastItemVisible = false,
﻿      isDown = false,
﻿      isStopped = false,
﻿      lastY = 0,
﻿      delta = 0,﻿  //Issue 810
﻿      layerIndex = 0,
﻿      settings = {
﻿  ﻿  scrollBy: "item",
﻿  ﻿  direction: "up",
﻿  ﻿  duration: 10000,
﻿  ﻿  speed: "medium",
﻿  ﻿  swipingTimeout: 5000,
﻿  ﻿  toggleOddEven: false,
﻿  ﻿  cloneItem: null
﻿      };
﻿      
﻿  $.fn.reverse = [].reverse;
﻿  
﻿  window.requestAnimFrame = (function(){
﻿      return  window.requestAnimationFrame       || 
﻿  ﻿      window.webkitRequestAnimationFrame || 
﻿  ﻿      window.mozRequestAnimationFrame    || 
﻿  ﻿      window.oRequestAnimationFrame      || 
﻿  ﻿      window.msRequestAnimationFrame     ||
﻿  ﻿      function(/* function */ callback, /* DOMElement */ element){
﻿  ﻿  ﻿  return window.setTimeout(callback, 1000 / 60);
﻿  ﻿      };
﻿  })();
﻿  
﻿  window.cancelRequestAnimFrame = ( function() {
﻿      return window.cancelAnimationFrame          ||
﻿  ﻿  window.webkitCancelRequestAnimationFrame    ||
﻿  ﻿  window.mozCancelRequestAnimationFrame       ||
﻿  ﻿  window.oCancelRequestAnimationFrame     ||
﻿  ﻿  window.msCancelRequestAnimationFrame        ||
﻿  ﻿  clearTimeout
﻿  })();
﻿      
﻿  //Merge options with default settings.
﻿  if (options) {
﻿      $.extend(settings, options);
﻿      
﻿      //Duration has to be at least one second since the animation itself takes 600ms.
﻿      if (settings.duration < 1000) {
﻿  ﻿  settings.duration = 1000;
﻿      }
﻿  }
﻿  
﻿  //Set scroll speed.
﻿  if (settings.scrollBy == "continuous") {
﻿      if (settings.speed == "fastest") {
﻿  ﻿  speed = 25;
﻿      }
﻿      else if (settings.speed == "fast") {
﻿  ﻿  speed = 50;
﻿      }
﻿      else if (settings.speed == "medium") {
﻿  ﻿  speed = 75;
﻿      }
﻿      else if (settings.speed == "slow") {
﻿  ﻿  speed = 100;
﻿      }
﻿      else {
﻿  ﻿  speed = 125;
﻿      }
﻿  }
﻿  else {
﻿      if (settings.speed == "fastest") {
﻿  ﻿  speed = 200;
﻿      }
﻿      else if (settings.speed == "fast") {
﻿  ﻿  speed = 400;
﻿      }
﻿      else if (settings.speed == "medium") {
﻿  ﻿  speed = 600;
﻿      }
﻿      else if (settings.speed == "slow") {
﻿  ﻿  speed = 800;
﻿      }
﻿      else {
﻿  ﻿  speed = 1000;
﻿      }
﻿  }
﻿      
﻿  return this.each(function() {
﻿      var $element = $(this),
﻿  ﻿  $page = $element.find(".page");
﻿      
﻿      /* Public methods */   
﻿      $.fn.infiniteScroll.start = function() {
﻿  ﻿  if ($.fn.infiniteScroll.canScroll() && (settings.direction != "none") && (settings.scrollBy != "none")) {
﻿  ﻿      clearInterval(scrollTimer);
﻿  ﻿      
﻿  ﻿      if (settings.scrollBy == "continuous") {
﻿  ﻿  ﻿  startContinuousScroll();﻿  ﻿  ﻿  
﻿  ﻿      }
﻿  ﻿      else {﻿  ﻿  ﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  scrollTimer = setInterval(function() {
﻿  ﻿  ﻿      startScroll();
﻿  ﻿  ﻿  }, settings.duration);
﻿  ﻿      }
﻿  ﻿  }
﻿      };
﻿      
﻿      $.fn.infiniteScroll.stop = function() {﻿  
﻿  ﻿  clearInterval(scrollTimer);
﻿  ﻿  clearTimeout(interactivityTimer);
﻿  
﻿  ﻿  //Detach the event handlers.
﻿  ﻿  if ($element != null) {
﻿  ﻿      if (isTouchDevice()) {
﻿  ﻿  ﻿  $element.unbind("touchstart");
﻿  ﻿  ﻿  $element.unbind("touchmove");
﻿  ﻿  ﻿  $element.unbind("touchend");
﻿  ﻿  ﻿  $element.unbind("touchleave");﻿  ﻿  
﻿  ﻿      }
﻿  ﻿      else {
﻿  ﻿  ﻿  $element.unbind("mousedown");
﻿  ﻿  ﻿  $element.unbind("mousemove");
﻿  ﻿  ﻿  $element.unbind("mouseup");
﻿  ﻿  ﻿  $element.unbind("mouseleave");
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  $element = null;
﻿  ﻿  $page = null;
﻿      };
﻿  ﻿  
﻿      $.fn.infiniteScroll.pause = function() {
﻿  ﻿  clearInterval(scrollTimer);
﻿      }
﻿      
﻿      //Check if content is larger than viewable area.
﻿      $.fn.infiniteScroll.canScroll = function() {
﻿  ﻿  return $page.height() > $element.height();
﻿      }
﻿      
﻿      $.fn.infiniteScroll.scrollToClass = function(className, animate) {
﻿  ﻿  var success = false;
﻿  ﻿  
﻿  ﻿  $(".item").each(function(i) {
﻿  ﻿      if ($(this).hasClass(className)) {
﻿  ﻿  ﻿  success = true;
﻿  ﻿  ﻿  return false;
﻿  ﻿      }
﻿  ﻿      else {
﻿  ﻿  ﻿  $.fn.infiniteScroll.scrollByItem();
﻿  ﻿      }
﻿  ﻿  });
﻿  ﻿  
﻿  ﻿  return success;
﻿      }
﻿      
﻿      if ($.fn.infiniteScroll.canScroll()) {
﻿  ﻿  //Add event handlers for swiping.﻿  ﻿  
﻿  ﻿  if (isTouchDevice()) {
﻿  ﻿      $element.bind({﻿  ﻿      
﻿  ﻿  ﻿  touchstart: function(e) {
﻿  ﻿  ﻿      handleStart(e);
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  touchmove: function(e) {
﻿  ﻿  ﻿      handleMove(e);
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  touchend: function() {
﻿  ﻿  ﻿      handleEnd();
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  touchleave: function() {
﻿  ﻿  ﻿      handleLeave();
﻿  ﻿  ﻿  }
﻿  ﻿      });
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿      $element.bind({﻿  ﻿      
﻿  ﻿  ﻿  mousedown: function(e) {
﻿  ﻿  ﻿      handleStart(e);
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  mousemove: function(e) {
﻿  ﻿  ﻿      handleMove(e);
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  mouseup: function() {
﻿  ﻿  ﻿      handleEnd();
﻿  ﻿  ﻿  },
﻿  ﻿  ﻿  mouseleave: function() {
﻿  ﻿  ﻿      handleLeave();
﻿  ﻿  ﻿  }
﻿  ﻿  });
﻿  ﻿  }
﻿      }
﻿      
﻿      if ($.fn.infiniteScroll.canScroll()) {
﻿  ﻿  $(".item").removeClass("lastItem");
﻿  ﻿  
﻿  ﻿  if ((settings.scrollBy == "item") || (settings.scrollBy == "continuous")) {
﻿  ﻿      $(".item:last").addClass("lastItem");
﻿  ﻿  }
﻿  ﻿  else if (settings.scrollBy == "page") {
﻿  ﻿      topIndex = $(".item").length;
﻿  ﻿      $(".item:last").addClass("lastItem");
﻿  ﻿      
﻿  ﻿      //Duplicate all items to ensure that the viewable area is always filled.
﻿  ﻿      $page.append($(".item").clone(true));
﻿  ﻿      
﻿  ﻿      //If there were an odd number of items before cloning occurred, toggle the odd and even classes of the cloned items.
﻿  ﻿      if (topIndex % 2 != 0) {
﻿  ﻿  ﻿  for (var i = topIndex; i < $(".item").length; i++) {
﻿  ﻿  ﻿      $(".item").eq(i).toggleClass("even");
﻿  ﻿  ﻿      $(".item").eq(i).toggleClass("odd");
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      
﻿  ﻿      //Move to second instance of first item so that there are items available to scroll on from the top.
﻿  ﻿      if (settings.direction == "down") {
﻿  ﻿  ﻿  $page.css("marginTop", $page.position().top - $(".item").eq(topIndex).position().top + "px");
﻿  ﻿      }
﻿  ﻿  }
﻿      }
﻿      
﻿      /* Private methods */
﻿      function isTouchDevice() {
﻿  ﻿  return "ontouchstart" in window;
﻿      }
﻿      
﻿      function scrollNow() {
﻿  ﻿  if ($.fn.infiniteScroll.canScroll() && (settings.direction != "none")) {
﻿  ﻿      clearInterval(scrollTimer);
﻿  ﻿      
﻿  ﻿      if (settings.scrollBy == "continuous") {
﻿  ﻿  ﻿  startContinuousScroll();﻿  ﻿  ﻿  
﻿  ﻿      }
﻿  ﻿      else {﻿  ﻿  ﻿  
﻿  ﻿  ﻿  startScroll();
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  scrollTimer = setInterval(function() {
﻿  ﻿  ﻿      startScroll();
﻿  ﻿  ﻿  }, settings.duration);
﻿  ﻿      }
﻿  ﻿  }
﻿      }
﻿      
﻿      function startContinuousScroll() {
﻿  ﻿  if (!isDown && !isStopped) {
﻿  ﻿      scrollTimer = setInterval(function() {
﻿  ﻿  ﻿  requestAnimFrame($.fn.infiniteScroll.scrollContinuously);
﻿  ﻿      }, speed);
﻿  ﻿  }
﻿      }
﻿      
﻿      function startScroll() {
﻿  ﻿  if (!isDown && !isStopped) {
﻿  ﻿      if (settings.scrollBy == "item") {
﻿  ﻿  ﻿  $.fn.infiniteScroll.scrollByItem();
﻿  ﻿      }
﻿  ﻿      else if (settings.scrollBy == "page") {
﻿  ﻿  ﻿  $.fn.infiniteScroll.scrollByPage();
﻿  ﻿      }
﻿  ﻿      else {
﻿  ﻿  ﻿  $.error(settings.scrollBy + " is not a valid value for scrollBy parameter.");
﻿  ﻿      }
﻿  ﻿  }
﻿      }
﻿      
﻿      /* Scroll the content one item at a time. */
﻿      $.fn.infiniteScroll.scrollByItem = function() {
﻿  ﻿  if (settings.direction == "up") {
﻿  ﻿      var $item = $element.find(".item:first"),
﻿  ﻿  ﻿  top = 0;
﻿  ﻿      
﻿  ﻿      if ($item) {﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Append the cloned item and then scroll by altering the top margin.
﻿  ﻿  ﻿  top = $item.position().top + $item.outerHeight(true);
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Append the cloned item and then scroll by altering the top margin.
﻿  ﻿  ﻿  if (settings.cloneItem) {
﻿  ﻿  ﻿      settings.cloneItem();
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿      if (!$(".item:first").hasClass("delete")) {
﻿  ﻿  ﻿  ﻿  $page.append($item.clone(true));
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  $page.animate({"marginTop": $page.position().top + parseInt($page.css("marginTop")) - top + "px"}, speed, function() {
﻿  ﻿  ﻿      onItemScrolledUp($item);
﻿  ﻿  ﻿  });
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  else {﻿  //Down
﻿  ﻿      var $first = $element.find(".item:first"),
﻿  ﻿  ﻿  $last = $element.find(".item:last"),
﻿  ﻿  ﻿  scrollBy = 0, isCloned = false;
﻿  ﻿  ﻿  
﻿  ﻿      if ($first) {
﻿  ﻿  ﻿  //Clone the item at the bottom if the top item is fully visible.
﻿  ﻿  ﻿  if ($first.position().top >= $page.position().top) {
﻿  ﻿  ﻿      if (settings.cloneItem) {
﻿  ﻿  ﻿  ﻿  settings.cloneItem();
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      else {
﻿  ﻿  ﻿  ﻿  if (!$(".item:last").hasClass("delete")) {
﻿  ﻿  ﻿  ﻿      toggleOddEvenClass($(".item:last"));
﻿  ﻿  ﻿  ﻿      $page.prepend($last.clone(true));
﻿  ﻿  ﻿  ﻿  }﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      
﻿  ﻿  ﻿      $page.css("marginTop", parseInt($page.css("marginTop")) - $last.outerHeight(true) + "px");
﻿  ﻿  ﻿      scrollBy = $last.outerHeight(true);
﻿  ﻿  ﻿      isCloned = true;
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿      scrollBy = $page.position().top - $first.position().top;
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  $page.animate({"marginTop": parseInt($page.css("marginTop")) + scrollBy + "px"}, speed, function() {
﻿  ﻿  ﻿      if (isCloned) {
﻿  ﻿  ﻿  ﻿  $last.remove();
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      
﻿  ﻿  ﻿      onItemScrolledDown();
﻿  ﻿  ﻿  });
﻿  ﻿      }
﻿  ﻿  }
﻿      };
﻿      
﻿      /* Scroll the content by page (viewable area) */
﻿      /* Making this a private function fixes issue 690.
﻿         Without it, on a refresh the contents scroll right off the page and aren't duplicated. */
﻿      $.fn.infiniteScroll.scrollByPage = function() {
﻿  ﻿  var count = 0,
﻿  ﻿      scrollBy = 0,
﻿  ﻿      isLastItemClipped = true;
﻿  ﻿  
﻿  ﻿  if (settings.direction == "up") {
﻿  ﻿      //Find item that is cut off at the bottom.
﻿  ﻿      $(".item").each(function(i) {
﻿  ﻿  ﻿  var height = $(this).outerHeight(true),
﻿  ﻿  ﻿      top = $(this).position().top;
﻿  
﻿  ﻿  ﻿  if ((top + height) > ($element.height() + $element.position().top)) {
﻿  ﻿  ﻿      //Since this item is cut off at the bottom, show it in its entirety when it scrolls to the top.
﻿  ﻿  ﻿      scrollBy = $element.height() - $(this).position().top;
﻿  ﻿  ﻿      isLastItemClipped = false;
﻿  ﻿  ﻿      
﻿  ﻿  ﻿      return false;
﻿  ﻿  ﻿  }
﻿  ﻿      });
﻿  ﻿      
﻿  ﻿      //If the last item was fully visible, then scroll by the height of the page element.
﻿  ﻿      if (isLastItemClipped) {
﻿  ﻿  ﻿  scrollBy = $element.height();
﻿  ﻿      }
﻿      
﻿  ﻿      $page.animate({"marginTop": $element.position().top - $element.height() + scrollBy + "px"}, speed, function() {
﻿  ﻿  ﻿  //Starting at the last item, work backwards to find which items have scrolled off-screen.
﻿  ﻿  ﻿  for (var i = $(".item").length - 1; i >= 0; i--) {﻿  
﻿  ﻿  ﻿      var $item = $(".item").eq(i),
﻿  ﻿  ﻿  ﻿  top = $item.position().top,﻿  ﻿  
﻿  ﻿  ﻿  ﻿  height = $item.outerHeight(true);﻿  
﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿      //Item has scrolled off-screen. Remove it and add a new one at the bottom.
﻿  ﻿  ﻿      if ((top + height) <= $page.position().top) {
﻿  ﻿  ﻿  ﻿  var $clone = $item.clone(true);
﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  if (count == 0) {
﻿  ﻿  ﻿  ﻿      $page.append($clone);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿      var $elem;
﻿  ﻿  ﻿  ﻿      
﻿  ﻿  ﻿  ﻿      //If more than one item has scrolled off-screen, they have to be inserted into the
﻿  ﻿  ﻿  ﻿      //right position since we are working backwards.
﻿  ﻿  ﻿  ﻿      if (count == 1) {
﻿  ﻿  ﻿  ﻿  ﻿  $elem = $page.find(".item:last");
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿      else {
﻿  ﻿  ﻿  ﻿  ﻿  $elem = $page.find(".item").slice(-count, -count + 1);
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿      
﻿  ﻿  ﻿  ﻿      $clone.insertBefore($elem);﻿  ﻿  ﻿      
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  $item.remove();
﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) + height + "px");
﻿  ﻿  ﻿  ﻿  count++;
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  $element.trigger("onScroll");
﻿  ﻿  ﻿  checkLastItem();
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  if (isLastItemVisible) {
﻿  ﻿  ﻿      $element.trigger("onLastItemScrolled");
﻿  ﻿  ﻿  }
﻿  ﻿      });
﻿  ﻿  }
﻿  ﻿  else if (settings.direction == "down") {
﻿  ﻿      var totalHeight = 0;
﻿  ﻿      
﻿  ﻿      //Working backwards from top item, calculate how many items can be fully displayed within the viewable area.
﻿  ﻿      do {
﻿  ﻿  ﻿  topIndex--;
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  if (topIndex < 0) {
﻿  ﻿  ﻿      topIndex = $(".item").length - 1;
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  var $item = $(".item").eq(topIndex);
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  if ((totalHeight + $item.outerHeight(true)) <= $element.height()) {
﻿  ﻿  ﻿      totalHeight += $item.outerHeight(true);
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  ﻿      } while ((totalHeight + $item.outerHeight(true)) <= $element.height())
﻿  ﻿      
﻿  ﻿      $page.animate({"marginTop": parseInt($page.css("marginTop")) + totalHeight + "px"}, speed, function() {
﻿  ﻿  ﻿  //The item that is at the top is the one that has a positive top position.
﻿  ﻿  ﻿  $(".item").each(function(index) {
﻿  ﻿  ﻿      if ($(this).position().top >= $page.position().top) {
﻿  ﻿  ﻿  ﻿  topIndex = index;
﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Starting at the last item, work backwards to find which items have scrolled off-screen.
﻿  ﻿  ﻿  $(".item").reverse().each(function() {
﻿  ﻿  ﻿      if ($(this).position().top > ($element.outerHeight(true) + $page.position().top)) {
﻿  ﻿  ﻿  ﻿  $page.prepend($(this));
﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) -$(this).outerHeight(true) + "px");
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      else {﻿  //Found them all.
﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  $element.trigger("onScroll");
﻿  ﻿  ﻿  checkLastItem();
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  if (isLastItemVisible) {
﻿  ﻿  ﻿      $element.trigger("onLastItemScrolled");
﻿  ﻿  ﻿  }
﻿  ﻿      });
﻿  ﻿  }
﻿      };
﻿      
﻿      /* Scroll items continuously without stopping. */
﻿      $.fn.infiniteScroll.scrollContinuously = function() {
﻿  ﻿  var $item = $(".item:first"),
﻿  ﻿      $lastItem = $(".lastItem");
﻿  ﻿  
﻿  ﻿  if (settings.direction == "up") {
﻿  ﻿      $page.css("marginTop", parseInt($page.css("marginTop")) - 1 + "px");
﻿  ﻿      
﻿  ﻿      if ($lastItem.length > 0) {
﻿  ﻿  ﻿  if (($lastItem.position().top + $lastItem.outerHeight(true)) < $page.position().top) {
﻿  ﻿  ﻿      $element.trigger("onLastItemScrolled");
﻿  ﻿  ﻿  }
﻿  ﻿      }﻿  ﻿      ﻿  ﻿  
﻿  ﻿      
﻿  ﻿      //Move first item to the bottom if it has scrolled off at the top.
﻿  ﻿      if (($item.position().top + $item.outerHeight(true)) < $page.position().top) {
﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) + $item.outerHeight(true));
﻿  ﻿  ﻿  $page.append($item);﻿  ﻿  ﻿  
﻿  ﻿  ﻿  toggleOddEvenClass($item);﻿  ﻿  ﻿  
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿      //Move last item to the top if the first item is fully visible.
﻿  ﻿      if ($item.position().top == $page.position().top) {
﻿  ﻿  ﻿  $page.prepend($(".item:last"));
﻿  ﻿  ﻿  $page.css("marginTop", -$(".item:first").outerHeight(true));
﻿  ﻿  ﻿  toggleOddEvenClass($(".item:first"));﻿  ﻿  ﻿  
﻿  ﻿      }
﻿  ﻿      
﻿  ﻿      if (!isLoading) {
﻿  ﻿  ﻿  if ($lastItem.length > 0) {
﻿  ﻿  ﻿      if (($lastItem.position().top + $lastItem.outerHeight(true)) <= $page.position().top) {
﻿  ﻿  ﻿  ﻿  $element.trigger("onLastItemScrolled");
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      else {
﻿  ﻿  ﻿  isLoading = false;
﻿  ﻿      }

﻿  ﻿      $page.css("marginTop", parseInt($page.css("marginTop")) + 1 + "px");
﻿  ﻿  }
﻿      };
﻿      
﻿      function toggleOddEvenClass($item) {
﻿  ﻿  //If there are an odd number of items, toggle the odd and even classes.
﻿  ﻿  if (settings.toggleOddEven) {
﻿  ﻿      if ($(".item").length % 2 != 0) {
﻿  ﻿  ﻿  $item.toggleClass("even");
﻿  ﻿  ﻿  $item.toggleClass("odd");
﻿  ﻿      }
﻿  ﻿  }
﻿      }
﻿      
﻿      function onItemScrolledUp($item) { 
﻿  ﻿  $item.remove();
﻿  ﻿  $page.css("marginTop", "0px");
﻿  ﻿  toggleOddEvenClass($(".item:last"));
﻿  ﻿  
﻿  ﻿  if ($(".item:last").hasClass("lastItem")) {
﻿  ﻿      $element.trigger("onLastItemScrolled");
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  //To be replaced with onLastItemScrolled once removed from all Gadgets.
﻿  ﻿  $element.trigger("onScroll");
﻿      }
﻿      
﻿      function onItemScrolledDown() {
﻿  ﻿  if ($(".item:last").hasClass("lastItem")) {
﻿  ﻿      $element.trigger("onLastItemScrolled");
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  $element.trigger("onScroll");
﻿      }
﻿      
﻿      function checkLastItem() {
﻿  ﻿  var $item;
﻿  ﻿  
﻿  ﻿  if (settings.direction == "up") {
﻿  ﻿      $item = $(".lastItem:first");
﻿  ﻿  }
﻿  ﻿  else if (settings.direction == "down") {
﻿  ﻿      $item = $(".lastItem:last");
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  //The last item is visible within the viewable area of $element if
﻿  ﻿  //the bottom of the last item is <= the height of $element and
﻿  ﻿  //the top of the last item is >= the top of $element.
﻿  ﻿  if ((($item.position().top + $item.outerHeight(true)) <= ($element.outerHeight(true) + $element.position().top)) &&
﻿  ﻿      ($item.position().top >= $element.position().top)) {
﻿  ﻿      isLastItemVisible = true;
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿      isLastItemVisible = false;
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  //var $item;
﻿  ﻿  //
﻿  ﻿  //if (settings.direction == "up") {
﻿  ﻿  //    $item = $(".lastItem:first");
﻿  ﻿  //    
﻿  ﻿  //    //if ($item.position().top > ($element.outerHeight(true) + $element.position().top)) {﻿  // ? > 600
﻿  ﻿  //    if ((($item.position().top + $item.outerHeight(true)) <= ($element.outerHeight(true) + $element.position().top)) &&
﻿  ﻿  //﻿  ($item.position().top >= $element.position().top)) {
﻿  ﻿  //﻿  isLastItemVisible = true;
﻿  ﻿  //    }
﻿  ﻿  //    else {
﻿  ﻿  //﻿  isLastItemVisible = false;
﻿  ﻿  //    }
﻿  ﻿  //}
﻿  ﻿  //else if (settings.direction == "down") {
﻿  ﻿  //    $item = $(".lastItem:last");
﻿  ﻿  //}
﻿      };
﻿      
﻿      function handleStart(event) {
﻿  ﻿  clearInterval(scrollTimer);
﻿  ﻿  
﻿  ﻿  isDown = true;
﻿  ﻿  
﻿  ﻿  if (isTouchDevice()) {
﻿  ﻿      if (event.originalEvent.targetTouches.length == 1) {
﻿  ﻿  ﻿  var touch = event.originalEvent.targetTouches[0];
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  lastY = touch.clientY;
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  else {﻿  ﻿      
﻿  ﻿      lastY = event.clientY;﻿  ﻿      
﻿  ﻿  }
﻿      };
﻿      
﻿      function handleEnd(event) {
﻿  ﻿  var len = $(".item").length - 1;
﻿  ﻿  
﻿  ﻿  clearTimeout(interactivityTimer);
﻿  ﻿  interactivityTimer = setTimeout(function() {
﻿  ﻿      //Need to move items around in case swiping has occurred.
﻿  ﻿      if (settings.direction != "none") {
﻿  ﻿  ﻿  if (settings.scrollBy == "item") {}
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿      if (settings.direction == "up") {
﻿  ﻿  ﻿  ﻿  $(".item").each(function() {
﻿  ﻿  ﻿  ﻿      if (($(this).position().top + $(this).outerHeight(true)) < 0) {
﻿  ﻿  ﻿  ﻿  ﻿  $page.append($(this));
﻿  ﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) + $(this).outerHeight(true) + "px");
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿      else {﻿  //Found them all.
﻿  ﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      else {
﻿  ﻿  ﻿  ﻿  for (var i = len; i >= 0; i--) {
﻿  ﻿  ﻿  ﻿      var $item = $(".item").eq(i);
﻿  ﻿  ﻿  ﻿      
﻿  ﻿  ﻿  ﻿      if ($item.position().top > $element.outerHeight(true)) {
﻿  ﻿  ﻿  ﻿  ﻿  $page.prepend($item);
﻿  ﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) - $item.outerHeight(true) + "px");
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿      else {﻿  //Found them all.
﻿  ﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      
﻿  ﻿      isStopped = false;
﻿  ﻿      scrollNow();
﻿  ﻿  }, settings.swipingTimeout);

﻿  ﻿  isStopped = true;
﻿  ﻿  isDown = false;
﻿  ﻿  
﻿  ﻿  $element.trigger("onSwipeEnd");
﻿      };﻿      
﻿      
﻿      function handleLeave() {
﻿  ﻿  if (isDown) {
﻿  ﻿      isDown = false;
﻿  ﻿      $.fn.infiniteScroll.start();
﻿  ﻿  }
﻿      };
﻿      
﻿      function handleMove(event) {
﻿  ﻿  var touch, newY,
﻿  ﻿      totalHeight = 0,
﻿  ﻿      $firstItem = $(".item:first"),
﻿  ﻿      $lastItem = $(".item:last");
﻿  ﻿  
﻿          if (!isDown) {
﻿  ﻿      return;
﻿          }
﻿  ﻿  
﻿  ﻿  if (isTouchDevice()) {
﻿  ﻿      if (event.originalEvent.targetTouches.length == 1) {
﻿  ﻿  ﻿  touch = event.originalEvent.targetTouches[0];
﻿  ﻿  ﻿  newY = touch.clientY;
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿      newY = event.clientY;
﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  //Issue 810 - Start
﻿  ﻿  delta = delta + lastY - newY;
﻿  ﻿  
﻿  ﻿  if (Math.abs(delta) < $firstItem.outerHeight(true)) {
﻿  ﻿      return;
﻿  ﻿  }
﻿  ﻿  //Issue 810 - End
﻿  ﻿  
﻿  ﻿  if (delta > 0) {﻿  //Swiping up
﻿  ﻿      $page.css("marginTop", parseInt($page.css("marginTop")) - delta + "px");
﻿  ﻿      
﻿  ﻿      if (settings.scrollBy == "item") {
﻿  ﻿  ﻿  //If the item has scrolled off the top, move it to the bottom.
﻿  ﻿  ﻿  if (($firstItem.position().top + $firstItem.outerHeight(true)) < $page.position().top) {
﻿  ﻿  ﻿      $page.css("marginTop", "0px").append($firstItem);
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      else if (settings.scrollBy == "page") {
﻿  ﻿  ﻿  $(".item").each(function() {
﻿  ﻿  ﻿      if (($(this).position().top + $(this).outerHeight(true)) < $page.position().top) {
﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) + $(this).outerHeight(true) + "px").append($(this));
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      else {﻿  //Found them all.
﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  });
﻿  ﻿      }
﻿  ﻿      //Issue 810
﻿  ﻿      else {
﻿  ﻿  ﻿  //Use next to last item to ensure there will always be enough rows at the bottom.
﻿  ﻿  ﻿  var $nextToLastItem = $(".item:last").prev();
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Move first item to the bottom if there are no extra rows at the bottom.
﻿  ﻿  ﻿  if ($nextToLastItem.length > 0) {
﻿  ﻿  ﻿      while (($nextToLastItem.position().top + $nextToLastItem.outerHeight(true)) <= ($page.position().top + $element.outerHeight(true))) {
﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) + $firstItem.outerHeight(true) + "px").append($firstItem);
﻿  ﻿  ﻿  ﻿  $firstItem = $(".item:first");
﻿  ﻿  ﻿  ﻿  $nextToLastItem = $(".item:last").prev();
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿  }
﻿  ﻿  else if (delta < 0) {﻿  //Swiping down
﻿  ﻿      //Issue 876 Start
﻿  ﻿      if ((settings.direction == "none") || (settings.scrollBy == "none") || (settings.scrollBy == "item")) {﻿  
﻿  ﻿  ﻿  $page.css("margin-top", parseInt($page.css("margin-top")) - delta + "px");
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Move enough items from the bottom to the top to compensate for the swipe.
﻿  ﻿  ﻿  if ($firstItem.position().top >= $page.position().top) {
﻿  ﻿  ﻿      while (totalHeight < Math.abs(delta)) {﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  $page.css("margin-top", -$lastItem.outerHeight(true) + "px").prepend($lastItem);
﻿  ﻿  ﻿  ﻿  totalHeight += $lastItem.outerHeight(true);
﻿  ﻿  ﻿  ﻿  $lastItem = $(".item:last");
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      //Issue 876 End
﻿  ﻿      else if (settings.scrollBy == "page") {
﻿  ﻿  ﻿  //Work backwards to find which items are hidden at the bottom and move them to the top.
﻿  ﻿  ﻿  $(".item").reverse().each(function() {
﻿  ﻿  ﻿      if ($(this).position().top > ($element.outerHeight(true) + $page.position().top)) {
﻿  ﻿  ﻿  ﻿  $page.css("marginTop", parseInt($page.css("marginTop")) - $(this).outerHeight(true) + "px").prepend($(this));
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿      else {﻿  //Found them all.
﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  $page.css("margin-top", parseInt($page.css("margin-top")) - delta + "px");﻿  //Issue 876
﻿  ﻿      }
﻿  ﻿      //Issue 810
﻿  ﻿      else {
﻿  ﻿  ﻿  $page.css("margin-top", parseInt($page.css("margin-top")) - delta + "px");﻿  //Issue 876
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Use second item to ensure there will always be enough rows at the top.
﻿  ﻿  ﻿  var $secondItem = $(".item").eq(1);
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  //Move last item to the top if there are no extra rows at the top.
﻿  ﻿  ﻿  if ($secondItem.length > 0) {
﻿  ﻿  ﻿      while ($secondItem.position().top >= $page.position().top) {﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿          $page.css("margin-top", parseInt($page.css("margin-top")) - $lastItem.outerHeight(true) + "px").prepend($lastItem);
﻿  ﻿  ﻿          $secondItem = $(".item").eq(1);
﻿  ﻿  ﻿          $lastItem = $(".item:last");
﻿  ﻿  ﻿      }
﻿  ﻿  ﻿  }
﻿  ﻿      }
﻿  ﻿      
﻿  ﻿      //$page.css("marginTop", parseInt($page.css("marginTop")) - delta + "px");﻿  Issue 876
﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  ﻿  delta = 0;﻿  //Issue 810
﻿  ﻿  lastY = newY;
﻿  ﻿  isStopped = false;
﻿  ﻿  
﻿  ﻿  $element.trigger("onSwipe");
﻿      };
﻿  });
    };
})(jQuery);