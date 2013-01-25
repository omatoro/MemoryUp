/**
 * ゲーム画面
 */
(function(ns) {

    ns.MainScene = tm.createClass({

        superClass : tm.app.Scene,

        sprite : {
            number : [],
            number_black : []
        },

        init : function() {

            this.superInit();

            // 画像の読み込み
            for (var i = 0; i < 9; ++i) {
                // ボタン画像のロード 最後に配列に入れた方が高速＆シンプル
                // (描画しないのでaddChildは行わない)
                var sprite = tm.app.Sprite(
                        ns.BUTTON_SIZE_X,
                        ns.BUTTON_SIZE_Y,
                        tm.graphics.TextureManager.get("num" + (i + 1)));
                sprite.setPosition(
                        (i % 3)         * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2),
                        parseInt(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X);
                sprite.speed = 0;  // 移動量を設定
                //this.addChild(sprite);
                this.sprite["number"][i] = sprite;

                // 暗転時ボタン画像のロード
                // ボタン暗転時の画像のロード
                sprite = tm.app.Sprite(
                        ns.BUTTON_SIZE_X,
                        ns.BUTTON_SIZE_Y,
                        tm.graphics.TextureManager.get("num_black" + (i + 1)));
                sprite.setPosition(
                        (i % 3)         * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2),
                        parseInt(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X);
                sprite.speed = 0;  // 移動量を設定
                this.addChild(sprite);
                this.sprite["number_black"][i] = sprite;
            }

            // 問題を作成するクラスを作成
            this.memory = ns.Memory(ns.BACK_NUMBER);

            // 問題を表示するLabel
            this.drawedNum = tm.app.Label("", 50); // 生成
            this.drawedNum.x = ns.SCREEN_WIDTH / 2; // X軸
            this.drawedNum.y = 100; // Y軸
            this.drawedNum.width = 200; // 幅
            this.addChild(this.drawedNum); // シーンに追加

            var a = tm.createClass({

                superClass : tm.app.Scene,

                init : function() {
                    this.superInit();
                },

                xxx:50,
            });

            console.dir(a());

            var b = tm.createClass({

                xxx:50,
            });

            console.dir(b());

            var func = function () {};
            console.dir(new func);

            console.dir(func);

        },

        update : function() {

            if (this.memory.update(this)) {
                // ゲームが終了したのでスコアを計算する
                var score = this.memory.getScore();

                // スコアをエンドシーンで表示する
                ns.app.replaceScene(ns.EndScene(score));
            }

            // this.memory.drawQuest();
            this.memory.drawQuest(this.drawedNum);


            // ボタン画像の切り替え
            var user_answer = this.memory.button.getUserAnswer(this.sprite);
            var past_user_answer = this.memory.getPastUserAnswer();
            if (0 <= user_answer
            &&  user_answer < 10
            &&  this.memory.isStartGame()) {
                if (past_user_answer !== null
                &&  past_user_answer !== 0) {
                    this.memory.button.changeBright(this, this.sprite);
                    this.addChild(this.sprite.number[past_user_answer-1]);
                }
                this.sprite.number[user_answer].remove();
                this.addChild(this.sprite.number_black[user_answer]);
            }

        }
    });

})(game);