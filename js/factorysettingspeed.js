/**
 * スピード設定ボタンを生成する
 */
(function(ns) {

    

    var DRAW_X = ns.SCREEN_WIDTH/2 + 80;
    var DRAW_Y = 160;

    var BACK_DATA = {
        "ゲーム速度： 遅い"  : 60,
        "ゲーム速度： 早い"  : 30,
        "ゲーム速度： 最速"  : 20
    };
    var BUTTON_STRING = ["遅い", "早い", "最速"];

    ns.FactorySettingSpeed = tm.createClass({

        init : function(scene) {
            // プルダウンメニューボタン
            var button = tm.app.GlossyButton(280, 60, "gray", "ゲーム速度");
            button.setPosition(DRAW_X, DRAW_Y);
            scene.addChild(button);
            this.button = button;

            // メニューボタン押下時の動作
            this.button.addEventListener("pointingend", function(e) {
                // メニューボタンが押されたらプルダウンを行う
                var mouse_position = e.app.pointing;
                if (this.isHitPointRect(mouse_position.x, mouse_position.y)) {
                    e.app.pushScene(ns.iPhonePicker(this, BACK_DATA));
                }
            });
        },

        // ユーザの入力を取得(ゲーム速度)
        getUserAnswer : function () {
            if (this.button.returnedData) {
                return this.button.returnedData;
            }
            return null;
        },

        // 選択したボタン名を取得
        getUserAnswerName : function () {
            if (this.button.ite) {
                return BUTTON_STRING[this.button.ite];
            }
            return null;
        }
    });

    ns.NumberButton.DEFAULT_ALPHA = 0.8;

})(game);