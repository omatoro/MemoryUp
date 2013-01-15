/**
 * ゲーム用ネームスペース作成、初期化処理
 */
var GAME = GAME || {};

/*
 * ゲーム初期化処理
 */
(function(ns) {

    // デバッグ時定数
    ns.DEBUG = true;

    // 初期化関数
    ns.init = function() {

        // アプリケーション作成
        ns.app = tm.app.CanvasApp("#world");
        ns.app.resizeWindow(); // 画面サイズに合わせる
        ns.app.fitWindow(); // リサイズ対応
        ns.app.background = "rgba(0, 0, 0, 0.1)"; // 背景色をセット

        // デバッグ時のみ
        if (this.DEBUG === true) {
            ns.app.enableStats();
        }

        ns.app.replaceScene(this.SceneTitle());
    };

})(GAME);

/*
 * ゲーム起動処理
 */
(function(ns) {

    ns.run = function() {

        // 画面初期化など
        this.init();

        // タイトルシーンの生成
        var title = ns.SceneTitle();

        // シーンの切り替え
        ns.app.replaceScene(title);

        // tmlibの実行
        this.app.run();

    };

})(GAME);