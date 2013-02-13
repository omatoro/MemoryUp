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

            // 画像読み込み
            this.sprite = {
        		number : [],
                number_black : []
            };

            // タイマーの生成
            var timer = ns.Timer();
            timer.setPosition(ns.SCREEN_WIDTH / 2, ns.BUTTON_START_DRAW_X - 70);
            timer.setBarLength(0);
            this.timer = timer;
            this.addChild(timer);

            // ボタンの生成
            for (var i = 0; i < 9; ++i) {
            	// ボタンの表示位置を計算
            	var image_position_x = ~~(i % 3) * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2);
            	var image_position_y = ~~(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X;

            	// 選択時のボタン生成
            	var sprite_bright = tm.app.iPhoneButton(ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y, "gray");
            	sprite_bright.setPosition(image_position_x, image_position_y);
            	sprite_bright.label.text = i+1;
            	sprite_bright.label.fontSize = 64;
            	this.sprite["number"][i] = sprite_bright;

            	// 非選択時のボタン生成
            	var sprite_dark = tm.app.iPhoneButton(ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y, "black");
            	sprite_dark.setPosition(image_position_x, image_position_y);
            	sprite_dark.label.text = i+1;
            	sprite_dark.label.fontSize = 64;
            	this.sprite["number_black"][i] = sprite_dark;
            	this.addChild(sprite_dark);
            }

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