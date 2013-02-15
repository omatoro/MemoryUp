/**
 * ボタン一つのクラス
 */
(function(ns) {

    ns.NumberButtons = tm.createClass({

        init : function(scene) {

            // ボタンの生成
        	this.sprite = [];
            for (var i = 0; i < 9; ++i) {
            	// ボタンの表示位置を計算
            	var image_position_x = ~~(i % 3) * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2);
            	var image_position_y = ~~(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X;

            	// ボタン
            	var sprite = ns.NumberButton(i+1, ns.BUTTON_SIZE_X, image_position_x, image_position_y);
            	this.sprite[i] = sprite;
            	scene.addChild(sprite);
            }
            console.dir(this.sprite);
        },

        // ユーザの入力を取得(配列の添字を返すので、押下したボタンの数値とは一致しない)
        getUserAnswer : function () {
            // クリックされていなかったら以下処理を行わない
            if (ns.app.pointing.getPointingEnd() === false) {
                return null;
            }

            // クリック位置取得
            ns.app.pointing.getPointingEnd();
            var mouse_position = ns.app.pointing;

            // スプライトとマウスのクリック位置が衝突したかを判定
            for (var i = 0; i < this.sprite.length; ++i) {
                if (this.sprite[i].isHitPoint(mouse_position.x, mouse_position.y)) {
                    return i;
                }
            }
            return null;
        },

        // ボタンを全て明転する
        changeBright : function () {
            for (var i = 0; i < this.sprite.length; ++i) {
            	this.sprite[i].clear();
            	this.sprite[i].label.fillStyle = "white";
            }
        },

        update : function () {
            // ボタンの切り替え
            var user_answer = this.getUserAnswer(this.sprite);
            if (0 <= user_answer
            &&  user_answer < 10
            &&  user_answer !== null) {
                this.changeBright();
                this.sprite[user_answer].sellect();
            }
        }
    });

    ns.NumberButton.DEFAULT_ALPHA = 0.8;

})(game);