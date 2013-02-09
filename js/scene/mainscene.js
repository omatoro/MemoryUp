/**
 * ゲーム画面
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {
		bright: {
			"num1": { "image": "num1", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 0 },
			"num2": { "image": "num2", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 1 },
			"num3": { "image": "num3", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 2 },
			"num4": { "image": "num4", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 3 },
			"num5": { "image": "num5", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 4 },
			"num6": { "image": "num6", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 5 },
			"num7": { "image": "num7", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 6 },
			"num8": { "image": "num8", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 7 },
			"num9": { "image": "num9", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 8 },
		},

		dark: {
			"num_black1": { "image": "num_black1", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 0 },
			"num_black2": { "image": "num_black2", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 1 },
			"num_black3": { "image": "num_black3", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X +                      0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 2 },
			"num_black4": { "image": "num_black4", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 3 },
			"num_black5": { "image": "num_black5", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 4 },
			"num_black6": { "image": "num_black6", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 5 },
			"num_black7": { "image": "num_black7", "rect": [                     0 + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 6 },
			"num_black8": { "image": "num_black8", "rect": [(ns.BUTTON_SIZE_X)     + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 7 },
			"num_black9": { "image": "num_black9", "rect": [(ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_START_DRAW_X + (ns.BUTTON_SIZE_X * 2) + (ns.BUTTON_SIZE_X / 2), ns.BUTTON_SIZE_X, ns.BUTTON_SIZE_Y], num: 8 }
		}
	};

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
            var i = 0;
            for (var key in IMAGES.bright) {
            	var value = IMAGES.bright[key];
            	var sprite = tm.app.iPhoneButton(value.rect[2], value.rect[3], "gray");
            	sprite.setPosition(value.rect[0], value.rect[1]);
            	sprite.label.text = ++i;
            	sprite.label.fontSize = 64;
            	this.sprite["number"][value.num] = sprite;
            }
            i = 0;
            for (var key in IMAGES.dark) {
            	var value = IMAGES.dark[key];
            	var sprite = tm.app.iPhoneButton(value.rect[2], value.rect[3], "black");
            	sprite.setPosition(value.rect[0], value.rect[1]);
            	sprite.label.text = ++i;
            	sprite.label.fontSize = 64;
            	this.sprite["number_black"][value.num] = sprite;
            	this.addChild(sprite);
            }

            // 問題を作成するクラスを作成
            this.memory = ns.Memory(ns.BACK_NUMBER);

            // 問題を表示するLabel
            this.drawedNum = tm.app.Label("", 50); // 生成
            this.drawedNum.x = ns.SCREEN_WIDTH / 2; // X軸
            this.drawedNum.y = 100; // Y軸
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