/**
 * ボタンを管理するクラス(当ゲーム依存処理,汎用性なし)
 */
(function(ns) {

    ns.ButtonNumber = tm.createClass({

        init : function () {},

        // クリックしたかを返す
        isClick : function () {
            return ns.app.pointing.getPointingEnd();
        },

        // クリックした場所の取得
        getClickPosition : function() {
            ns.app.pointing.getPointingEnd();
            return ns.app.pointing;
        },

        // ユーザの入力を取得(配列の添字を返すので、押下したボタンの数値とは一致しない)
        getUserAnswer : function (sprite) {
            // クリックされていなかったら以下処理を行わない
            if (this.isClick() === false) {
                return -1;
            }

            // クリック位置取得
            var mouse_position = this.getClickPosition();

            // スプライトとマウスのクリック位置が衝突したかを判定
            for (var i = 0; i < sprite.number.length; ++i) {
                if (sprite.number[i].isHitPoint(mouse_position.x, mouse_position.y)) {
                    return i;
                }
            }
            for (var i = 0; i < sprite.number_black.length; ++i) {
                if (sprite.number_black[i].isHitPoint(mouse_position.x, mouse_position.y)) {
                    return i;
                }
            }
            return -1;
        },

        // ボタンを全て明転する
        changeBright : function (scene, sprites) {
            for (var i = 0; i < sprites.number_black.length; ++i) {
                scene.removeChild(sprites.number_black[i]);
            }
            for (var i = 0; i < sprites.number.length; ++i) {
                scene.removeChild(sprites.number[i]);
            }
            for (var i = 0; i < sprites.number.length; ++i) {
                scene.addChild(sprites.number[i]);
            }
        },

        // ボタンを全て暗転する
        changeDark : function (scene, sprites) {
            for (var i = 0; i < sprites.number_black.length; ++i) {
                scene.removeChild(sprites.number_black[i]);
            }
            for (var i = 0; i < sprites.number.length; ++i) {
                scene.removeChild(sprites.number[i]);
            }
            for (var i = 0; i < sprites.number.length; ++i) {
                scene.addChild(sprites.number_black[i]);
            }
        },
    });

})(game);