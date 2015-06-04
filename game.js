/*****************************
********CONTROL class*********
*****************************/
(function() {

  function Control() {
    this.initialize();
  }
    
  var p = Control.prototype = new createjs.Container();
  Control.prototype.Container_initialize = Control.prototype.initialize;

  p.initialize = function() {
    
    this.Container_initialize();
    
    var x = 90;
    var y = 90;
    var radius = 60
    var startAngle;
    var endAngle;
    var counterClockwise = false;
    var shape;
    
    function onClickHandler(evt) {
    alert(evt.target == this.stage.getObjectUnderPoint(evt.stageX, evt.stageY));
    }

    for (var i = 0; i <= 20; i ++) {
    
    if (i == 14 || i % 2 != 0 || i == 0) {
      continue;
    }
    
    startAngle = i/10 * Math.PI;
    endAngle = i == 12 ? startAngle + 0.18 * Math.PI : startAngle + 0.08 * Math.PI;
     
    shape = new createjs.Shape();
    shape.graphics.beginStroke('#DDD').setStrokeStyle(17, 'round').arc(x, y, radius, startAngle, endAngle, counterClockwise).endFill();
    
    if (i == 12) {
      shape.graphics.beginStroke('#DDD').setStrokeStyle(10, 'round').moveTo(x - 40, y - radius - 5).lineTo(x - 15, y - radius).lineTo(x - 20, y - radius + 22);
    }
    
    if (i == 16) {
      shape.graphics.beginFill('#DDD').drawCircle(x + 8, y - radius, 5);
    }
    
    shape.name = 'shape_' + i;    
    this.addChild(shape);
    shape.alpha = 0.7;
    
     // shape.on('click', onClickHandler, this);    
    }
  };

  createjs.Control = Control;
  
}());
/*****************************
****end of CONTROL class******
*****************************/

/*****************************
********CAR class*************
*****************************/
(function() {

  function Car(label, upColor, downColor) {
    this.color = [upColor, downColor];
    this.label = label;
    
    this.initialize();
  }
    
  var p = Car.prototype = new createjs.Container();
  Car.prototype.Container_initialize = Car.prototype.initialize;

  p.initialize = function() {
    
    this.Container_initialize();
    
    var body = new createjs.Shape();
    body.graphics.beginStroke('black').setStrokeStyle(2, 'round').beginFill('blue').drawRect(0, 0, 160, 40);
    body.y = 40;
    
    var upper = new createjs.Shape();
    upper.graphics.beginFill('blue').beginStroke('black')
    .moveTo(40, 0)
    .lineTo(120, 0)
    .lineTo(140, 40)
    .lineTo(20, 40)
    .lineTo(40, 0)
    .endFill();  
    
    var doorBefore = new createjs.Shape();
    doorBefore.graphics.beginFill('yellow').beginStroke('black').drawRect(0, 0, 25, 25);
    doorBefore.x = 50;
    doorBefore.y = 8;
    
    var doorAfter = new createjs.Shape();
    doorAfter.graphics.beginFill('yellow').beginStroke('black').drawRect(0, 0, 25, 25);
    doorAfter.x = 90;
    doorAfter.y = 8;
    
    var wheelBefore = new createjs.Shape();
    wheelBefore.graphics.beginStroke('black').setStrokeStyle(2, 'round').beginFill('grey').drawCircle(0, 0, 20).endFill();
    wheelBefore.graphics.beginStroke('black').setStrokeStyle(2, 'round').beginFill('#666666').drawCircle(0, 0, 12);  
    wheelBefore.x = 120;
    wheelBefore.y = 80;
    
    var wheelAfter = new createjs.Shape();
    wheelAfter.graphics.beginStroke('black').setStrokeStyle(2, 'round').beginFill('grey').drawCircle(0, 0, 20);
    wheelAfter.graphics.beginStroke('black').setStrokeStyle(2, 'round').beginFill('#666666').drawCircle(0, 0, 12);
    wheelAfter.x = 40;
    wheelAfter.y = 80;
    
    this.addChild(body, upper, doorBefore, doorAfter, wheelBefore, wheelAfter);  
  };

  createjs.Car = Car;
  
}());
/*****************************
****end of CAR class**********
*****************************/

var canvas, stage, arrPos = [], touches = [], car;

window.addEventListener('load', onLoadedHandler);
window.addEventListener('resize', onResizedHandler);

function onResizedHandler(evt) {  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
  
function onLoadedHandler(evt) {
  canvas = document.querySelector('canvas');
  onResizedHandler();
  
  canvas.addEventListener( 'touchstart', onTouchStart, false );
  canvas.addEventListener( 'touchmove', onTouchMove, false );
  canvas.addEventListener( 'touchend', onTouchEnd, false );
  
  //create Stage instance to wrap canvas element
  stage = new createjs.Stage("canvas");
  stage.enableMouseOver();
  
  car = stage.addChild(new createjs.Car());
  //car.y = 200;
  stage.addChild(car);

  var controlLeft = stage.addChild(new createjs.Control());
  controlLeft.x = 70;
  controlLeft.y = 130;
  stage.addChild(controlLeft);
  
  var controlRight = stage.addChild(new createjs.Control());
  controlRight.x = 230;
  controlRight.y = 130;
  stage.addChild(controlRight);
  
  //update Stage by using Ticker - can use requestAnimationFrame
  createjs.Ticker.on("tick", onTickHandler);
};

function onTouchStart(evt) { 
  touches = evt.touches; 
  isTouch = true;
}
 
function onTouchMove(evt) {
   // Prevent the browser from doing its default thing (scroll, zoom)
  evt.preventDefault();
  touches = evt.touches;
} 
 
function onTouchEnd(evt) { 
   touches = evt.touches;
   
   for(var i = 0; i < arrPos.length; i ++) {
    resetPos(arrPos[i]);
  }
}

function resetPos(pos) {
  for(var i = 0; i < pos.targets.length; i ++) {
    pos.targets[i].alpha = 0.7;
  }
  pos.targets = [];
}

function getPos(touchID) {
  for(var i = 0; i < arrPos.length; i ++) {
    if (arrPos[i].identifier == touchID) {
      return i;
    }
  }
  return -1;
}


function onTickHandler(evt) {

  var i, touch, shape, index, pos;
  for(i = 0; i < touches.length; i ++) {
    touch = touches[i]; 
    
    index = getPos(touch.identifier);
    
    if (index == -1) {
      index = arrPos.length;
      arrPos.push({'identifier': touch.identifier, 'targets': []});
    } 
    
    pos = arrPos[index];
    
    shape = stage.getObjectUnderPoint(touch.clientX, touch.clientY);

    if (shape && isTouch) {
      
      if (pos.targets.indexOf(shape) == - 1) {
        pos.targets.push(shape);
        shape.alpha = 1;
      } 

      else {
        
        if (pos.targets.length > 1 && pos.targets[0] == shape) {
          for(var j = 0; j < pos.targets.length; j ++) {
            pos.targets[j].alpha = 0.7;
          }
          pos.targets = [];
          car.x ++;
          //

        }
      }
    }   
  }
  
  stage.update();
};
