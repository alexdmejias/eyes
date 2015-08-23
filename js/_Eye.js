var V = require('V')
  , utils
;

var eyeDefaults = {
  scleraSize: 100,
  scleraColor: '#fff',
  scleraStrokeColor: 'rgba(0, 0, 0, 1)',
  scleraStrokeSize: 2,

  pupilSize: 50,
  pupilColor: '#000',
  pupilStrokeColor: 'rgba(0, 0, 0, 0)',
  pupilStrokeSize: 0

};

function Eye(cx, canvas, options) {
  utils = require('utils')(cx, canvas);

  this.cx = cx;
  this.canvas = canvas;

  this.x = options.x;
  this.y = options.y;

  // merge the default parameters with the passed object
  var eyeOpts = utils.merge(eyeDefaults, options);

  // dump all the eyeOpts properties into the object
  for (prop in eyeOpts) {
    this[prop] = eyeOpts[prop];
  }

  var half = this.scleraSize / 2;
}

Eye.prototype.display = function() {
  this.cx.save();
  this.cx.translate(this.x, this.y);

  this.cx.fillStyle = this.scleraColor;
  this.cx.strokeStyle = this.scleraStrokeColor;
  utils.ellipse(0, 0, this.scleraSize, {strokeStyle: this.scleraStrokeColor});
  this.cx.restore();
  this.displayPupil();
};

Eye.prototype.update = function(mousePos) {
  this.mousePos = mousePos;
};

Eye.prototype.guides = function() {
  this.cx.save();
  this.cx.translate(this.x, this.y);
  var p = new Path2D();
  this.cx.strokeStyle = 'red';
  p.moveTo(0, 0);
  p.lineTo(0, this.canvas.height);
  p.moveTo(0, 0);
  p.lineTo(this.canvas.width, 0);
  this.cx.stroke(p);
  this.cx.restore();
}

Eye.prototype.displayPupil = function() {
  this.cx.save();
  this.cx.translate(this.x, this.y);

  var mouseVec = new V(this.mousePos.x, this.mousePos.y);
  var centerVec = new V(this.x, this.y);

  mouseVec.sub(centerVec);
  mouseVec.limit(this.scleraSize - (this.pupilSize / 2));

  this.cx.fillStyle = this.pupilColor;
  this.cx.strokeStyle = this.pupilStrokeColor;
  this.cx.lineWidth = 0;

  utils.ellipse(mouseVec.x, mouseVec.y, this.pupilSize / 2, {lineWidth: this.pupilStrokeSize, strokeStyle: this.pupilStrokeColor});

  this.cx.restore();
};
module.exports = Eye;
