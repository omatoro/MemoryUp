/**
 * ゲーム画面
 */
(function(ns) {

    ns.SceneMain = tm.createClass({

        superClass : tm.app.Scene,

        sprite : {
            number : {},
            number_black : {}
        },

        init : function() {

            this.superInit();

            // 画像の読み込み
            for ( var i = 0; i < 9; ++i) {
                // ボタン画像のロード 最後に配列に入れた方が高速＆シンプル
                var sprite = tm.app.Sprite(
                        ns.BUTTON_SIZE_X,
                        ns.BUTTON_SIZE_Y,
                        tm.graphics.TextureManager.get("num" + (i + 1)));
                sprite.setPosition(
                        (i % 3)         * ns.BUTTON_SIZE_X + (ns.BUTTON_SIZE_X / 2),
                        parseInt(i / 3) * ns.BUTTON_SIZE_Y + (ns.BUTTON_SIZE_Y / 2) + ns.BUTTON_START_DRAW_X);
                sprite.speed = 0;  // 移動量を設定
                this.addChild(sprite);
                this.sprite["number"][i] = sprite;

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