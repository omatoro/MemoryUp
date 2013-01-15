/**
 * 記憶ゲームクラス
 */
(function(ns) {

    ns.Memory = tm.createClass({

        // 何問前の回答を答えるか
        back : 0,

        // 問題のスタック
        quest : {},

        // 正解数
        sum_result : 0,

        init : function(_back) {

            // 何問前の回答を答えるか
            this.back = _back || 1;

            // テキスト
            this.drawedNum = tm.app.Label("asdasdfasdfasdff"); // 生成
            this.drawedNum.x = 25; // X軸
            this.drawedNum.y = 50; // Y軸
            this.drawedNum.width = 200; // 幅
            ns.app.currentScene.addChild(this.drawedNum); // シーンに追加

            // 問題を管理するクラスの生成
            this.quest = ns.QuestNumber();
        },

        // クリックした場所の取得
        getClickPosition : function() {

            var mouse_x = ns.app.pointing.x; // マウスのx位置を取得
            var mouse_y = ns.app.pointing.y; // マウスのy位置を取得

            // ボタンの配置開始位置を引く
            mouse_y -= ns.BUTTON_Y;

            return {
                x : mouse_x,
                y : mouse_y
            };
        },

        // クリックした場所が正解かどうかを判定する
        checkAnswer : function() {

            // クリック位置取得
            var mouse_position = getClickPosition();

            // クリックした場所がボタンの場所でなかったら終了する
            if (mouse_position.y < BUTTON_Y) {
                return false;
            }

            // クリック位置でユーザの回答を探す
            /*
             * ボタンの配置 １２３ ４５６ ７８９ ０
             */

            // ボタンのサイズ
            var button_size = {
                x : ns.SCREEN_WIDTH / 3,
                y : ns.SCREEN_HEIGHT / 3
            };

            var click_number_x = mouse_position.x / button_size.x | 0; // 横3列
            var click_number_y = mouse_position.y / button_size.y | 0; // 縦4列

            // 0の左右の位置であった場合は無視する
            if (click_number_x === 0 && click_number_y === 3) {
                return false;
            } else if (click_number_x === 2 && click_number_y === 3) {
                return false;
            }

            // 回答が正解か調べる
            var user_answer = null;
            if (click_number_x === 0 && click_number_y === 0) { user_answer = 1; }
            if (click_number_x === 0 && click_number_y === 1) { user_answer = 2; }
            if (click_number_x === 0 && click_number_y === 2) { user_answer = 3; }
            if (click_number_x === 1 && click_number_y === 0) { user_answer = 4; }
            if (click_number_x === 1 && click_number_y === 1) { user_answer = 5; }
            if (click_number_x === 1 && click_number_y === 2) { user_answer = 6; }
            if (click_number_x === 2 && click_number_y === 0) { user_answer = 7; }
            if (click_number_x === 2 && click_number_y === 1) { user_answer = 8; }
            if (click_number_x === 2 && click_number_y === 2) { user_answer = 9; }
            if (click_number_x === 3 && click_number_y === 1) { user_answer = 0; }

            var answer = quest[quest.length - this.back - 1]; // -1は配列が0開始なので

            if (user_answer === answer) {
                return true;
            }

            return false; // 何にも引っかかってない、エラー

        },

        // 問題を表示
        drawQuest : function() {

            this.drawedNum.draw();
        },

    });

})(game);