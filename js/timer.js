/**
 * タイマー バークラスからの派生で作る
 */
(function(ns) {

    ns.Timer = tm.createClass({
    	superClass: ns.ProgressBar,

    	init: function (width, height, barColor, backgroundColor) {
    		this.superInit(width, height, barColor, backgroundColor);
    		this.time = ns.NEXT_GAME_FRAME;
    		this.timeUnit = 100 / ns.NEXT_GAME_FRAME;
    	},

        update : function () {
        	this.setBarLength(this.time * this.timeUnit);
        },

        countDown : function () {
        	--this.time;
        },

        reset : function () {
        	this.time = ns.NEXT_GAME_FRAME;
        }
    });

})(game);