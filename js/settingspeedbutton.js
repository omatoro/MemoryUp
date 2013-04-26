/**
 * ボタン一つのクラス
 */
(function(ns) {

    ns.SettingSpeedButton = tm.createClass({

        superClass : tm.app.GlossyButton,

        init : function(string, buttonSizeX, buttonSizeY, positionX, positionY) {
            this.superInit(buttonSizeX, buttonSizeY, "gray", string);
            this.setPosition(positionX, positionY);
            this.label.fontSize = 40;
            this.label.fillStyle = "white";

            // 現在の背景色
            this.currentColor = "gray";
        },

        clear : function () {
        	if (this.currentColor !== "gray") {
        		this.setBackgroundColor("grey");
        		this.currentColor = "gray";
        	}
        },

        sellect : function () {
        	if (this.currentColor !== "black") {
        		this.setBackgroundColor("black");
        		this.currentColor = "black";
        	}
        },
    });

    tm.app.GlossyButton.DEFAULT_ALPHA = 0.8;

})(game);