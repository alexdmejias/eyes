var canvas = document.getElementById('canvas')
  , cx = canvas.getContext('2d')
  , V = require('V')
  , Eye = require('./_Eye')
  , utils
;

var WIDTH = function() { return canvas.width}
  , HEIGHT = function(){return canvas.height}
  , eyes = []
  , left
  , right
  , mousePos = {x: 0, y: 0}
;

function setup() {
  utils = require('utils')(cx, canvas);
  //  draw the first eye
  eyes.push(new Eye(cx, canvas, {x: 300, y: 300}) );
}

function draw() {
  utils.clear();

  cx.fillStyle = '#000';
  cx.fillRect(0, 0, utils.W, utils.H);

  for(var i = 0; i < eyes.length; i++) {
    eyes[i].update(mousePos);
    eyes[i].display();
  }

  window.requestAnimationFrame(draw);
}

function deleteEye(index) {
  if (eyes[index]) {
    eyes.splice(index, 1);
  }
}

function removeNotification() {
  var notification =document.getElementsByClassName('notification')[0];
  notification.classList.add('hide');
}

canvas.addEventListener('mousemove', function(event) {
  mousePos = utils.getMousePos(event);
});

document.addEventListener('keydown', function(event) {
  console.log('pressed', event.keyCode);
  if (event.keyCode === 32) { // space
    eyes = [];
  } else if (event.keyCode === 8) { //back space
    deleteEye(eyes.length - 1);
  }

}, false);

canvas.addEventListener('click', function() {
  eyes.push(new Eye(cx, canvas, {x: mousePos.x, y: mousePos.y}) );
}, false);

(function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  setTimeout(removeNotification, 5000);

  if (canvas.getContext) {
    setup();
    window.requestAnimationFrame(draw);
  }

}());
