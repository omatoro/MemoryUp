/**
 * n-backのback数を設定するボタンを生成する
 */
(function(ns) {

    var DRAW_X = ns.SCREEN_WIDTH/2 + 80;
    var DRAW_Y = 70;

    var BACK_DATA = {
        "back数： 1"  : 0,
        "back数： 2"  : 1,
        "back数： 3"  : 2,
        "back数： 4"  : 3,
        "back数： 5"  : 4,
        "back数： 6"  : 5,
        "back数： 7"  : 6,
        "back数： 8"  : 7,
        "back数： 9"  : 8,
        "back数： 10" : 9,
        "back数： 11" : 10,
        "back数： 12" : 11,
        "back数： 13" : 12,
        "back数： 14" : 13,
        "back数： 15" : 14,
        "back数： 16" : 15,
        "back数： 17" : 16,
        "back数： 18" : 17,
        "back数： 19" : 18,
        "back数： 20" : 19,
    };

    ns.FactorySettingBackNumbers = tm.createClass({
        init : function(scene) {
            // プルダウンメニューボタン
            var button = tm.app.GlossyButton(280, 60, "gray", "back数");
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

        // ユーザの入力を取得(配列の添字を返すので、押下したボタンの数値とは一致しない)
        getUserAnswer : function () {
            if (this.button.returnedData) {
                return this.button.returnedData;
            }
            return null;
        }
    });

})(game);