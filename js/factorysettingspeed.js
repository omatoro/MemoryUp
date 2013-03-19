/**
 * スピード設定ボタンを生成する
 */
(function(ns) {

    var DRAW_Y = 500;
    var BUTTON_POS_X = ns.BUTTON_SIZE_X;
    var BUTTON_POS_Y = ~~(ns.BUTTON_SIZE_Y/2);
    var BUTTON_SIZE_X = ~~(ns.BUTTON_SIZE_X/1.2);
    var BUTTON_SIZE_Y = ~~(ns.BUTTON_SIZE_Y/3);

    var BUTTON_STRING = ["遅い", "早い", "最速"]

    ns.FactorySettingSpeed = tm.createClass({

        init : function(scene) {

            // ボタンの生成
        	this.sprite = [];
            for (var i = 0; i < 3; ++i) {
            	// ボタンの表示位置を計算
            	var image_position_x = ~~(i % 3) * BUTTON_POS_X + (BUTTON_POS_X / 2);
            	var image_position_y = ~~(i / 3) * BUTTON_POS_Y + (BUTTON_POS_Y / 2) + DRAW_Y;

            	// ボタン
            	var sprite = ns.NumberButton(i+1, BUTTON_SIZE_X, BUTTON_SIZE_Y, image_position_x, image_position_y);
                var sprite = ns.SettingSpeedButton(BUTTON_STRING[i], BUTTON_SIZE_X, BUTTON_SIZE_Y, image_position_x, image_position_y);
            	this.sprite[i] = sprite;
            	scene.addChild(sprite);
            }

            // ボタンをゲーム開始時に一度だけ初期化する
            //this.once = ns.Once();
            // this.wakeUpButtons();
            // this.changeBright();
            this.sprite[0].sellect();
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

        // 選択したボタン名を取得
        getUserAnswerName : function () {
            if (this.getUserAnswer() === null) {
                return null;
            }
            return BUTTON_STRING[this.getUserAnswer()];
        },

        // ボタンを全て明転する
        changeBright : function () {
            for (var i = 0; i < this.sprite.length; ++i) {
            	this.sprite[i].clear();
            	this.sprite[i].label.fillStyle = "white";
            }
        },

        // ボタンを起こす
        wakeUpButtons : function () {
        	for (var i = 0; i < 9; ++i) {
        		this.sprite[i].wakeUp();
        	}
        },

        update : function () {
        	// フェードイン、アウトするようボタンを起こす
        	//this.once.call(true, this, this.wakeUpButtons);

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