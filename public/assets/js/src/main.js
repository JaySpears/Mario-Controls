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
      }, 1400);
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
          break;

        //// LEFT ////
        case 37:
          if (!leftPressed) {
            moveBackwardsInterval = setInterval(function () {
              characterMovements.moveBackwards();
            }, 40);
          }
          leftPressed = true;
          break;

        //// RIGHT ////
        case 39:
          // rightPressed = true;
          if (!rightPressed) {
            moveForwardInterval = setInterval(function () {
              characterMovements.moveFoward();
            }, 40);
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
          break;

        //// RIGHT ////
        case 39:
          rightPressed = false;
          clearInterval(moveForwardInterval);
          person.offset({
            left: person.offset().left
          });
          break;

        default:
          return;
      }
    });
  });
})(jQuery);
