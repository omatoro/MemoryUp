/**
 * ボタン一つのクラス
 */
(function(ns) {

    ns.NumberButton = tm.createClass({

        superClass : tm.app.iPhoneButton,

        init : function(number, buttonSize, positionX, positionY) {
            this.superInit(buttonSize, buttonSize, "rgb(80,20,20)", number);
            this.setPosition(positionX, positionY);
            this.label.fontSize = 64;
            this.label.fillStyle = "rgb(170,40,40)";

            // イベント登録(上書きできない？)
            this.addEventListener("pointingover", function() {
                //this.animation.fade(1.0, 250);
            });
            this.addEventListener("pointingout", function() {
            	//this.setBackgroundColor("black");
            });
        },

        clear : function () {
        	this.setBackgroundColor("grey");
        },

        sellect : function () {
        	this.setBackgroundColor("black");
        },
    });

    tm.app.iPhoneButton.DEFAULT_ALPHA = 0.8;

})(game);