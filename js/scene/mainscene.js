/**
 * ゲーム画面
 */
(function(ns) {

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // タイマーの生成
            var timer = ns.Timer();
            timer.setPosition(ns.SCREEN_WIDTH / 2, ns.BUTTON_START_DRAW_X - 70);
            timer.setBarLength(0);
            this.timer = timer;
            this.addChild(timer);

            // ボタンの生成
            this.buttons = ns.NumberButtons(this);

            // 問題を作成するクラスを作成
            this.memory = ns.Memory(ns.BACK_NUMBER);

            // 問題を表示するLabel
            this.drawedNum = tm.app.Label(" ", 50); // 生成
            this.drawedNum.x = ns.SCREEN_WIDTH / 2; // X軸
            this.drawedNum.y = 130; // Y軸
            this.drawedNum.width = 200; // 幅
            this.addChild(this.drawedNum); // シーンに追加
        },

        update : function() {
            if (this.memory.update(this)) {
                // ゲームが終了したのでスコアを計算する
                var score = this.memory.getScore();

                // スコアをエンドシーンで表示する
                ns.app.replaceScene(ns.EndScene(score));
            }

            this.memory.drawQuest(this.drawedNum);

            // ボタン画像の切り替え
            if (this.memory.isStartGame()) {
            	this.buttons.update();
            }

        }
    });

})(game);