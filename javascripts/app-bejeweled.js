//BejeweledItem
window.Org = window.Org || {};

(function(Org, createjs) {
  
  "use strict";

  var BejeweledItem = function(data) {
    this.data = data;

    this.initialize();
  };

  var p = BejeweledItem.prototype = new createjs.Shape();
  
  p.data = null;

  p.initialize = function() {
    this.cursor = "pointer";
    this.mouseChildren = false;
    
    this.x = this.data.x + 10;
    this.y = this.data.y + 10;
    
  };
  
  Org.BejeweledItem = BejeweledItem;

}(window.Org, window.createjs));

/* =================
 * app-bejeweled/app.js
 * ================= */

(function($, createjs, Org, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  //var dataTrigger = '[data-bejeweled]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Bejeweled(opts) {
    this.settings = $.extend({}, defaults, opts);

    this.stage = null;
    this.groups = null;
    this.group = null;
    this.container = null;
    this.arrPersonItem = null;

    this.TOTAL_COL = 17;
    this.TOTAL_ROW = 8;
    this.ITEM_WIDTH = 70;
    this.ITEM_HEIGHT = 70;
    this.matrix = [];

    this.sprItem = null;
    this.sprSelect = null;

    this.isWait = false;

    this.previousRow = -10;
    this.previousCol = -10;

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Bejeweled.prototype.init = function() {

    this.stage = new createjs.Stage("cvsOrg");

    this.container = new createjs.Container();
    this.stage.addChild(this.container);

    this.sprItem = new createjs.Container();
    this.sprItem.x = this.sprItem.y = 35;
    this.stage.addChild(this.sprItem);

    this.drawBackground();

    this.sprSelect = new createjs.Shape();
    this.sprSelect.graphics.beginFill('#FFFF00').drawRect(1, 1, this.ITEM_WIDTH - 2, this.ITEM_HEIGHT - 2).endFill();
    this.sprSelect.visible = false;
    this.sprItem.addChild(this.sprSelect);

    this.createBejeweledItem();

    var that = this;
    createjs.Ticker.addEventListener("tick", function(event) {
      that.stage.update();
      that.checkResult();
    });
  };

  Bejeweled.prototype.drawBackground = function() {
    var line = new createjs.Shape();
    line.x = line.y = 35;

    var WIDTH = this.ITEM_WIDTH * (this.TOTAL_COL - 1);
    var HEIGHT = this.ITEM_HEIGHT  * (this.TOTAL_ROW - 1);

    for (var i = 0; i < this.TOTAL_ROW; i += 1) {
      line.graphics.s("#000000").moveTo(0, this.ITEM_WIDTH * i).lineTo(WIDTH, this.ITEM_WIDTH * i);
    }

    for (i = 0; i < this.TOTAL_COL; i += 1) {
      line.graphics.s("#000000").moveTo(this.ITEM_HEIGHT * i, 0).lineTo(this.ITEM_HEIGHT * i, HEIGHT);
    }
    
    this.container.addChild(line);
  };

  Bejeweled.prototype.createBejeweledItem = function() {
    
    var bejeweledItem;
    var type = 0;
    var shape;
    var that = this;

    for (var i = 0; i < this.TOTAL_ROW - 1; i+= 1) {
      this.matrix[i] = [];
      
      for (var j = 0; j < this.TOTAL_COL - 1; j+= 1) {
        
        //create item that there is not more than 2 color in row or col
        do {
          this.matrix[i][j] = Math.ceil(Math.random() * 5);
        } while (this.checkRow(i, j) > 2 || this.checkCol(i, j) > 2);

        type = this.matrix[i][j];

        shape = this.createShapeByType(type);
        shape.x = shape.y = 10;

        bejeweledItem = new createjs.Container();
        bejeweledItem.mouseChildren = false;
        bejeweledItem.name = i + '_' + j;
        bejeweledItem.x = j * this.ITEM_WIDTH;
        bejeweledItem.y = i * this.ITEM_HEIGHT;
        bejeweledItem.addChild(shape);

        bejeweledItem.addEventListener("mousedown", function(evt) { that.onClickHandler(evt); });

        this.sprItem.addChild(bejeweledItem);
      }
    }
  };

  Bejeweled.prototype.onClickHandler = function(evt) {

    var bejeweledItem = evt.target;
    var src = bejeweledItem.name.split("_");
    var sr = Number(src[0]);
    var sc = Number(src[1]);

    //don't have selected item before then
    if (this.previousRow === -10 && this.previousCol === -10) {
      this.previousRow = sr;
      this.previousCol = sc;

      this.sprSelect.x = bejeweledItem.x;
      this.sprSelect.y = bejeweledItem.y;
      this.sprSelect.visible = true;
    }

    var that = this;
    bejeweledItem.addEventListener("pressmove", function(evt) {
      that.onPressMoveHandler(evt);
    });
  };

  Bejeweled.prototype.onPressMoveHandler = function(evt) {
    var bejeweledItem = evt.target;
    
    var rc = bejeweledItem.name.split("_");
    var r = Number(rc[0]);
    var c = Number(rc[1]);

    var sr = r;
    var sc = c;

    var point = bejeweledItem.globalToLocal(evt.stageX, evt.stageY);

    if (point.x < 0) {
      sc = sc - 1;
    }

    else if (Math.abs(point.x) > this.ITEM_WIDTH) {
      sc = sc + 1;
    }

    else if (point.y < 0) {
      sr = sr - 1;
    }

    else if (Math.abs(point.y) > this.ITEM_HEIGHT) {
      sr = sr + 1;
    }

    var mcItem, mcItem1, mcItem2;
    var that = this;

    if (sr !== r || sc !== c) {
      
      bejeweledItem.removeAllEventListeners("pressmove");

      this.swapItem(this.previousRow, this.previousCol, sr, sc);
      
      //if total color of row or col is more than 2, get score
      if (this.checkRow(this.previousRow, this.previousCol) > 2 || this.checkCol(this.previousRow, this.previousCol) > 2 || this.checkRow(sr, sc) > 2 || this.checkCol(sr, sc) > 2) {
        
        this.isWait = true;
        
        //previouse item
        mcItem = this.sprItem.getChildByName(this.previousRow + "_" + this.previousCol);
        mcItem.name = "_temp_";

        createjs.Tween.get(mcItem, {override:true}).to({x: sc * this.ITEM_WIDTH, y: sr * this.ITEM_HEIGHT}, 200);

        //new item
        mcItem = this.sprItem.getChildByName(sr + "_" + sc);
        mcItem.name = this.previousRow + "_" + this.previousCol;

        createjs.Tween.get(mcItem, {override:true}).to({x: this.previousCol * this.ITEM_WIDTH, y: this.previousRow * this.ITEM_HEIGHT}, 200).call(function() {
          that.isWait = false;
        });
        
        this.sprItem.getChildByName("_temp_").name = sr + "_" + sc;
      }
      
      //if total color of row or col is less than 3
      else {
        this.isWait = true;
        
        mcItem1 = this.sprItem.getChildByName(this.previousRow + "_" + this.previousCol);
        mcItem2 = this.sprItem.getChildByName(sr + "_" + sc);
        
        createjs.Tween.get(mcItem1, {override:true}).to({x: mcItem2.x, y: mcItem2.y}, 200);
        createjs.Tween.get(mcItem2, {override:true}).to({x: mcItem1.x, y: mcItem1.y}, 200).wait(200).call(this.swapAgain, [mcItem1, mcItem2], this);

        this.swapItem(this.previousRow, this.previousCol, sr, sc);
      }

      this.previousRow = -10;
      this.previousCol = -10;
      this.sprSelect.visible = false;
    }
  };

  Bejeweled.prototype.swapAgain = function(mcItem1, mcItem2) {
    createjs.Tween.get(mcItem1, {override:true}).to({x: mcItem2.x, y: mcItem2.y}, 200);
    createjs.Tween.get(mcItem2, {override:true}).to({x: mcItem1.x, y: mcItem1.y}, 200);
    
    this.isWait = false;
  };

  Bejeweled.prototype.createShapeByType = function(type) {
    var shape = new createjs.Shape();
    if (type === 1) {
      shape.graphics.beginFill('#FF0000').drawRect(0, 0, 50, 50).endFill();
    }

    else if (type === 2) {
      shape.graphics.beginFill('#32CD32').drawRect(0, 0, 50, 50).endFill();
    }

    else if (type === 3) {
      shape.graphics.beginFill('#0000FF').drawCircle(25, 25, 25).endFill();
    }

    else if (type === 4) {
      shape.graphics.beginFill('#FF00FF').drawCircle(25, 25, 25).endFill();
    }

    else if (type === 5) {
      shape.graphics.beginFill('#800080').moveTo(25, 0).moveTo(50, 50).lineTo(0, 50).lineTo(25, 0).endFill();
    }
    return shape;
  };

  Bejeweled.prototype.checkRow = function(row, col) {
    var type = this.matrix[row][col];
    var total = 1;
    var i = col;
    
    //check left 0 0 0 1 . . . 
    while (this.checkType(type, row, i - 1)) {
      i -= 1;
      total += 1;
    }
    
    //check right . . . 1 0 0 0
    i = col;
    while (this.checkType(type, row, i + 1)) {
      i += 1;
      total += 1;
    }

    return total;
  };

  Bejeweled.prototype.checkCol = function(row, col) {
    var type = this.matrix[row][col];
    var total = 1;
    var j = row;
    
    //check up 
    // 0 
    // 0 
    // 0 
    // 1 
    // . 
    // . 
    // . 
    while (this.checkType(type, j - 1, col)) {
      j -= 1;
      total += 1;
    }
    
    //check down
    // . 
    // . 
    // . 
    // 1 
    // 0 
    // 0 
    // 0
    j = row;
    while (this.checkType(type, j + 1, col)) {
      j += 1;
      total += 1;
    }
    
    return total;
  };

  Bejeweled.prototype.checkType = function(type, row, col) {
    if (!this.matrix[row]) {
      return false;
    }
      
    if (!this.matrix[row][col]) {
      return false;
    }
      
    return (type === this.matrix[row][col]);
  };

  Bejeweled.prototype.swapItem = function(row1, col1, row2, col2) {
    var type = this.matrix[row1][col1];
    this.matrix[row1][col1] = this.matrix[row2][col2];
    this.matrix[row2][col2] = type;
  };

  Bejeweled.prototype.checkResult = function() {
    
    if (this.isWait) {
      return;
    }

    var isMove = this.moveItem();

    if (!isMove) {

      var isNew = this.createItem();

      if (!isNew) {
        
        var isReplace = this.replaceItems();
        if (!isReplace) {
          this.isWait = true;
        }
      }
    }
  };
    
  Bejeweled.prototype.moveItem = function() {
      
    var mcItem;
    var i;
    var j;
    var toY;
    var isMove = false;
    var count = 0;
    
    for (i = this.TOTAL_ROW - 3; i >= 0; i -= 1) {
      for (j = 0; j < this.TOTAL_COL - 1; j += 1) {
        if (this.matrix[i][j] !== -1 && this.matrix[i + 1][j] === -1) {
          
          this.matrix[i + 1][j] = this.matrix[i][j];
          this.matrix[i][j] = -1;
          
          mcItem = this.sprItem.getChildByName(i + "_" + j);
          
          toY = mcItem.y + this.ITEM_HEIGHT;
          
          mcItem.name = (i + 1) + "_" + j;

          createjs.Tween.get(mcItem, {override:true}).to({y: toY}, 150);

          isMove = true;
        }
      }
    }
    
    if (isMove) {
      this.isWait = true;
      
      var that = this;
      createjs.Tween.get(this, {override:true}).to({alpha: 1}, 200).call(function() {
        that.isWait = false;
      });
    }
    
    return false;
  };
    
  Bejeweled.prototype.createItem = function() {
      
    var bejeweledItem;
    var i;
    var j;
    var shape;
    var that = this;

    for (i = this.TOTAL_ROW - 2; i >= 0; i -= 1) {
      for (j = 0; j < this.TOTAL_COL - 1; j += 1) {
        if (this.matrix[i][j] === -1) {

          //random type of item
          this.matrix[0][j] = Math.ceil(Math.random() * 5);
          
          //create new item for i, j position
          shape = this.createShapeByType(this.matrix[0][j]);
          shape.x = shape.y = 10;
        
          bejeweledItem = new createjs.Container();
          bejeweledItem.mouseChildren = false;
          bejeweledItem.name = 0 + '_' + j;
          bejeweledItem.x = j * this.ITEM_WIDTH;
          bejeweledItem.y = 0;
          bejeweledItem.addChild(shape);
          bejeweledItem.addEventListener("mousedown", function(evt) { that.onClickHandler(evt); });
          
          this.sprItem.addChild(bejeweledItem);
          
          return true;
        }
      }
    }
    
    return false;
  };
  
  Bejeweled.prototype.replaceItems = function() {
      
    var isReplace = false;
    var i;
    var j;
    var mcItem;
    var tr;
    var u;
    var t;
    var k;
    var cd;
    var that = this;
    
    for (i = this.TOTAL_ROW - 2; i >= 0; i -= 1) {
      for (j = 0; j < this.TOTAL_COL- 1; j += 1) {
        
        if (this.checkRow(i, j) > 2 || this.checkCol(i, j) > 2) {

          isReplace = true;
          
          tr = [i + "_" + j];

          u = this.matrix[i][j];

          //get all items in row
          if (this.checkRow(i, j) > 2) {
            
            t = j;
            
            while (this.checkType(u, i, t - 1)) {
              t -= 1;
              tr.push(i + "_" + t);
            }

            t = j;
            while (this.checkType(u, i, t + 1)) {
              t += 1;
              tr.push(i + "_" + t);
            }
          }
          
          //get all items in col
          if (this.checkCol(i, j) > 2) {
            t = i;
            while (this.checkType(u, t - 1, j)) {
              t -= 1;
              tr.push(t + "_" + j);
            }
            
            t = i;
            while (this.checkType(u, t + 1, j)) {
              t += 1;
              tr.push(t + "_" + j);
            }
          }
          
          //remove them
          for (k = 0; k < tr.length; k += 1) {
            this.isWait = true;
            
            mcItem = this.sprItem.getChildByName(tr[k]);
            
            cd = tr[k].split("_");
            
            this.matrix[cd[0]][cd[1]] = -1;

            createjs.Tween.get(mcItem, {override:true}).to({x: mcItem.x + this.ITEM_WIDTH/2, y: mcItem.y + this.ITEM_HEIGHT/2, scaleX: 0, scaleY: 0}, 150).call(function(item, isEnd) {
              
              if (item.parent) {
                item.parent.removeChild(item);
              }

              if (isEnd) {
                that.isWait = false;
              }

            }, [mcItem, (k === tr.length - 1)]);
     
            //score += 1;
          }

          break;
        }
      }
      
      if (isReplace) {
        break;
      }
    }
    
    return isReplace;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.bejeweled = new Bejeweled(opts);
  });

}(window.jQuery, window.createjs, window.Org, window.App));


