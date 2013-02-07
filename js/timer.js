/**
 * タイマー バークラスからの派生で作る
 */
(function(ns) {

    ns.Timer = tm.createClass({
    	superClass: ns.ProgressBar,

    	init: function (width, height, barColor, backgroundColor) {
    		this.superInit(width, height, barColor, backgroundColor);
    		this.time = 100;
    	},

        update : function () {
//            if (this.plus > 0) {
//            	this.plus  -= this.plusTmp;
//            	this.width += this.plusTmp;
//            	if (this.width >= ns.app.width) {
//            		this.width = app.width;
//            	}
//            }
//            else {
//            	this.width -= this.timerSpeed;
//            	++userData.time;
//            	--gameData.time;
//            }
        },

//        draw: function (canvas) {
//        	canvas.fillStyle = this.color;
//        	canvas.fillRect(this.x, this.y, this.width, 30);
//        },

        plusTime: function (plus) {
//        	this.plus = plus * this.timerSpeed;
//        	this.plusTmp = this.plus / effectTime;
//        	gameData.tim += plus;
//        	if (gameData.time >= gameData.maxTime) {
//        		gameData.time = gameData.maxTime;
//        	}
        }
    });

})(game);