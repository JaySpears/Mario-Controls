'use strict';
(function($) {
  $(document).ready(function() {
    // Variables.
    var person = $('#person');
    var customTrigger = false;
    var moveForwardInterval = undefined;
    var moveBackwardsInterval = undefined;
    var leftPressed = false;
    var rightPressed = false;
    var currentlyJumping = false;
    var dominantKeycode = undefined;
    var characterMovements = {
      moveFoward: moveFoward,
      moveBackwards: moveBackwards,
      jump: jump
    }

    //////////////////////////
    // Function Declartions //
    //////////////////////////

    function moveFoward(){
      person.offset({
        left: person.offset().left + 4
      });
    }

    function moveBackwards(){
      person.offset({
        left: person.offset().left - 4
      });
    }

    function jump(){
      currentlyJumping = true;
      person.addClass('jump');
      setTimeout(function() {
        currentlyJumping = false;
        person.removeClass('jump');
      }, 1500);
    }

    // This function will manually trigger keydown events. Need to keep the
    // character moving when jump is activated.
    function triggerEvent(arrow){
      customTrigger = true;
      switch (arrow){
        case 'right':
          var e = jQuery.Event('keydown');
          e.keyCode = 39;
          $(document).trigger(e);
          break;

        case 'left':
          var e = jQuery.Event('keydown');
          e.keyCode = 37;
          $(document).trigger(e);
          break;

        default:
          return;
      }
    }

    // Keydown events.
    $(document).keydown(function(e) {
      switch (e.which || e.keyCode) {
        //// JUMP ////
        case 32:
          if (!currentlyJumping) {
            characterMovements.jump();
          }
          if (rightPressed) {
            triggerEvent('right');
          }
          if (leftPressed) {
            triggerEvent('left');
          }
          if (rightPressed && leftPressed && dominantKeycode == 39) {
            triggerEvent('right');
          }
          if (rightPressed && leftPressed && dominantKeycode == 37) {
            triggerEvent('left');
          }
          break;

        //// LEFT ////
        case 37:
          if (!leftPressed) {
            moveBackwardsInterval = setInterval(function () {
              characterMovements.moveBackwards();
            }, 40);
          }
          if (rightPressed){
            clearInterval(moveForwardInterval);
          }
          leftPressed = true;
          break;

        //// RIGHT ////
        case 39:
          if (!rightPressed) {
            moveForwardInterval = setInterval(function () {
              characterMovements.moveFoward();
            }, 40);
          }
          if (leftPressed){
            clearInterval(moveBackwardsInterval);
          }
          rightPressed = true;
          break;

        default:
          return;
      }
      e.preventDefault();
    });

    // Keyup events.
    $(document).keyup(function(e) {
      switch (e.which || e.keyCode) {
        //// JUMP ////
        case 32:
          if (rightPressed) {
            triggerEvent('right');
          } else if (leftPressed){
            triggerEvent('left');
          }
          break;

        //// LEFT ////
        case 37:
          leftPressed = false;
          clearInterval(moveBackwardsInterval);
          person.offset({
            left: person.offset().left
          });
          if (rightPressed){
            dominantKeycode = 39;
            clearInterval(moveForwardInterval);
            moveForwardInterval = setInterval(function () {
              characterMovements.moveFoward();
            }, 40);
          }
          break;

        //// RIGHT ////
        case 39:
          rightPressed = false;
          clearInterval(moveForwardInterval);
          person.offset({
            left: person.offset().left
          });
          if (leftPressed){
            dominantKeycode = 37;
            clearInterval(moveBackwardsInterval);
            moveBackwardsInterval = setInterval(function () {
              characterMovements.moveBackwards();
            }, 40);
          }
          break;

        default:
          return;
      }
    });
  });
})(jQuery);
