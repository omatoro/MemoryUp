/**
 * ゲーム画面
 */
(function(ns) {

    ns.NumberButton = tm.createClass({

        superClass : tm.app.iPhoneButton,

        init : function(number, buttonSize, positionX, positionY) {
            this.superInit(buttonSize, buttonSize, "black", number);

            // 選択時のボタン生成
            this.setPosition(positionX, positionY);
            this.label.fontSize = 64;

            // イベント登録
            this.addEventListener("pointingover", function() {
                //this.animation.fade(1.0, 250);
            });
            this.addEventListener("pointingout", function() {
                this.animation.fade(tm.app.iPhoneButton.DEFAULT_ALPHA, 250);
            });
        }
    });

})(game);