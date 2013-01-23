/**
 * エンド画面(スコア表示)
 */
(function(ns) {

    var UI_DATA = {
        LABELS : {
            children : [
                {
                    type : "Label" , name : "scoreLabel",
                    x : 450, y : 215, width : 400, fillStyle : "white",
                    text : "dammy", fontSize : 48, align : "end"
                }
            ]
        }
    };

    ns.SceneEnd = tm.createClass({

        superClass : tm.app.Scene,

        // 表示するスコア
        score : 0,

        init : function(score) {
            this.superInit();
            this.score = score || 0;
        },

        update : function() {
            // スコア表示用のラベルの作成
            this.fromJSON(UI_DATA.LABELS);
            this.scoreLabel.text = this.score + " / 10 問正解！";

            // ボタン作成
            var title_button = tm.app.iPhoneButton(200, 100, "#222222");
            title_button.setPosition(250, 500);
            title_button.label.text = "Title";
            this.addChild(title_button);

            title_button.onpointingstart = function () {
                ns.app.replaceScene(ns.SceneTitle());
            };
        }
    });

})(game);