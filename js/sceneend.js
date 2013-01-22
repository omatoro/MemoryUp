/**
 * エンド画面(スコア表示)
 */
(function(ns) {

    ns.SceneEnd = tm.createClass({

        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

        },

        update : function() {
            // ボタン作成
            var title_button = tm.app.iPhoneButton(120, 60, "black");
            title_button.setPosition(250, 500);
            title_button.label.text = "Title";
            this.addChild(title_button);

            title_button.onpointingstart = function () {
                ns.app.replaceScene(ns.SceneTitle());
            };
        }
    });

})(game);