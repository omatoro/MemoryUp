/**
 * 問題数設定ボタンを生成する
 */
(function(ns) {

    var DRAW_X = ns.SCREEN_WIDTH/2 + 80;
    var DRAW_Y = 250;

    var BACK_DATA = {
        "問題数： 10問"  : 10,
        "問題数： 15問"  : 15,
        "問題数： 30問"  : 30
    };

    var BUTTON_STRING = ["10", "15", "30"];

    ns.FactorySettingQuestNumber = tm.createClass({

        init : function(scene) {
            // プルダウンメニューボタン
            var button = tm.app.GlossyButton(280, 60, "gray", "問題数");
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

        // 選択したボタン名を取得
        getUserAnswer : function () {
            if (this.button.returnedData) {
                return this.button.returnedData;
            }
            return null;
        }
    });

    ns.NumberButton.DEFAULT_ALPHA = 0.8;

})(game);