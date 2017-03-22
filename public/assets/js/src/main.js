'use strict';
(function ($) {
    $(document).ready(function(){
      var leftEye = $('.portrait-container img.left-eye');
      var leftEyeOffset = leftEye.offset();
      var rightEye = $('.portrait-container img.right-eye');
      var rightEyeOffset = rightEye.offset();
      $(document).mousemove(function(event){
        var leftEyeCenterX = (leftEyeOffset.left) + (leftEye.width()/2);
        var leftEyeCenterY = (leftEyeOffset.top) + (leftEye.height()/2);
        var rightEyeCenterX = (rightEyeOffset.left) + (rightEye.width()/2);
        var rightEyeCenterY = (rightEyeOffset.top) + (rightEye.height()/2);
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        var radiansForLeftEye = Math.atan2(mouseX - leftEyeCenterX, mouseY - leftEyeCenterY);
        var degreesForLeftEye = (radiansForLeftEye * (180 / Math.PI) * -1) + 90;
        var radiansForRightEye = Math.atan2(mouseX - rightEyeCenterX, mouseY - rightEyeCenterY);
        var degreesForRightEye = (radiansForRightEye * (180 / Math.PI) * -1) + 90;
        leftEye.css('-moz-transform', 'rotate('+degreesForLeftEye+'deg)');
        leftEye.css('-webkit-transform', 'rotate('+degreesForLeftEye+'deg)');
        leftEye.css('-o-transform', 'rotate('+degreesForLeftEye+'deg)');
        leftEye.css('-ms-transform', 'rotate('+degreesForLeftEye+'deg)');
        rightEye.css('-moz-transform', 'rotate('+degreesForRightEye+'deg)');
        rightEye.css('-webkit-transform', 'rotate('+degreesForRightEye+'deg)');
        rightEye.css('-o-transform', 'rotate('+degreesForRightEye+'deg)');
        rightEye.css('-ms-transform', 'rotate('+degreesForRightEye+'deg)');
      });
    });
})(jQuery);
