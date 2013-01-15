/**
 * ゲーム画面
 */
(function(ns) {

    ns.SceneMain = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {

            this.superInit();

            // 画像の読み込み
            for ( var i = 0; i < 9; ++i) {
                // ボタン画像のロード
                // ボタン画像のロード
                this.sprite["number"][i] = tm.app.Sprite(
                        ns.BUTTON_SIZE_X,
                        ns.BUTTON_SIZE_Y,
                        tm.graphics.TextureManager.get("num" + (i + 1)));
                this.sprite["number"][i].setPosition(
                        (i % 3)         * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2),
                        parseInt(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X);
                this.sprite["number"][i].speed = 0;  // 移動量を設定
                this.addChild(this.sprite["number"][i]);

                // ボタン暗転時の画像のロード(描画しないのでaddChildは行わない)
                // @todo
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

            if (ns.app.keyboard.getKeyDown("Z")
            ||  ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.SceneTitle());
            }

            // this.memory.drawQuest();
            this.drawedNum.text = ns.app.frame;

            console.log('Main');
        }
    });

})(game);