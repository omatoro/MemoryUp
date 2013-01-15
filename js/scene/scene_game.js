/**
 * ゲーム画面
 */
(function(ns) {

    // ボタンサイズ
    var BUTTON_SIZE_X = 213;
    var BUTTON_SIZE_Y = 213;

    // ボタンの描画位置
    var BUTTON_START_DRAW_X = 320;

    ns.SceneMain = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {

            this.superInit();

            // 画像の読み込み
            // this.sprite = tm.app.Sprite(128, 128,
            // tm.graphics.TextureManager.get("sprite"));
            // this.sprite.setPosition(240, 360); // 位置(x, y)を格納
            // this.sprite.speed = 5; // 移動量を設定
            // this.addChild(this.sprite); // 親要素(この場合はTitleSceneクラス)に追加

            for ( var i = 0; i < 9; ++i) {
                // ボタン画像のロード
                // ボタン画像のロード
                this.sprite["number"][i] = tm.app.Sprite(
                        BUTTON_SIZE_X,
                        BUTTON_SIZE_Y,
                        tm.graphics.TextureManager.get("num" + (i + 1)));
                this.sprite["number"][i].setPosition(
                        (i % 3)         * BUTTON_SIZE_X + (BUTTON_SIZE_X / 2),
                        parseInt(i / 3) * BUTTON_SIZE_Y + (BUTTON_SIZE_Y / 2) + BUTTON_START_DRAW_X);
                this.sprite["number"][i].speed = 0;  // 移動量を設定
                this.addChild(this.sprite["number"][i]);

                // ボタン暗転時の画像のロード(描画しないのでaddChildは行わない)
                // this.sprite["number_black"][i] = tm.app.Sprite(
                // BUTTON_SIZE_X,
                // BUTTON_SIZE_Y,
                // tm.graphics.TextureManager.get("num_black" + (i + 1)));
                // this.sprite["number_black"][i].setPosition(
                // (i % 3) * BUTTON_SIZE_X + (BUTTON_SIZE_X / 2),
                // parseInt(i / 3) * BUTTON_SIZE_Y + (BUTTON_SIZE_Y / 2) +
                // BUTTON_START_DRAW_X);
            }

            // 問題を作成するクラスを作成
            this.memory = ns.Memory(1);

            // テキスト
            this.drawedNum = tm.app.Label(1, 50); // 生成
            this.drawedNum.x = 25; // X軸
            this.drawedNum.y = 100; // Y軸
            this.drawedNum.width = 200; // 幅
            this.addChild(this.drawedNum); // シーンに追加
        },

        sprite : {
            number : {},
            number_black : {}
        },

        update : function() {

            // this.sprite.x += this.sprite.speed; // 画像を移動

            // 画面外に出ようとしたら進む方向を反対にする
            // if(this.sprite.x < 0 || this.sprite.x > ns.app.width) {
            // this.sprite.speed *= -1;
            // }

            if (ns.app.keyboard.getKeyDown("Z")
            ||  ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.SceneTitle());
            }

            // this.memory.drawQuest();
            this.drawedNum.text = ns.app.frame;

            console.log('Main');
        }
    });

})(GAME);