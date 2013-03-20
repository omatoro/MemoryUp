/**
 * ゲーム画面
 */
(function(ns) {

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(backNum, gameSpeed, gameSpeedName, questNumber) {
            this.superInit();

            // スピードの名称を保持
            this.gameSpeedName = gameSpeedName;

            // 問題数を保持(バック数＋問題数)->9バックにて9つ覚えてしまえばワーキングメモリを鍛えられない
            this.questNumber = parseInt(questNumber) + backNum + 1;

            // ゲームスピード
            if      (gameSpeed === 0) { gameSpeed = 60; }
            else if (gameSpeed === 1) { gameSpeed = 30; }
            else if (gameSpeed === 2) { gameSpeed = 20; }
            this.gameSpeed = gameSpeed;

            // タイマーの生成
            var timer = ns.Timer(this.gameSpeed);
            timer.setPosition(ns.SCREEN_WIDTH / 2, ns.BUTTON_START_DRAW_X - 70);
            timer.setBarLength(0);
            this.timer = timer;
            this.addChild(timer);

            // ボタンの生成
            this.buttons = ns.FactoryNumberButtons(this);

            // バック数(引数の値は0からカウントされているので+1する)
            this.backNum = backNum + 1;

            // 問題を作成するクラスを作成
            this.memory = ns.Memory(this.backNum, this.gameSpeed, this.questNumber);

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
                ns.app.replaceScene(ns.EndScene(score, this.backNum, this.gameSpeedName, this.questNumber));
            }

            this.memory.drawQuest(this.drawedNum);

            // ボタン画像の切り替え
            if (this.memory.isStartGame()) {
            	this.buttons.update();
            }

        }
    });

})(game);