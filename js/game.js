/**
 * ゲーム起動処理
 */
(function(ns) {

    ns.run = function() {

        // デバッグ時定数
        ns.DEBUG = true;

        // アプリケーション作成
        ns.app = tm.app.CanvasApp("#world");
        ns.app.resize(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT); // 画面サイズに合わせる
        ns.app.fitWindow(); // リサイズ対応
        ns.app.background = "rgba(0, 0, 0, 0.1)"; // 背景色をセット

        // デバッグ時のみ
        if (this.DEBUG === true) {
            ns.app.enableStats();
        }

        ns.app.replaceScene(this.SceneTitle());

        // タイトルシーンの生成
        var title = ns.SceneTitle();

        // シーンの切り替え
        ns.app.replaceScene(title);

        // tmlibの実行
        this.app.run();

    };

})(game);