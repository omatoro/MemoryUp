/**
 * 画面初期化、ゲームオブジェクト作成
 */
var GAME = GAME || {};

(function (ns) { ;

// デバッグ時定数
ns.DEBUG = true;

// 初期化関数
ns.init = function () {
    // アプリケーション作成
    ns.app = tm.app.CanvasApp("#world");
    ns.app.resizeWindow(); // 画面サイズに合わせる
    ns.app.fitWindow();    // リサイズ対応
    ns.app.background = "rgba(0, 0, 0, 0.1)";  // 背景色をセット

    // デバッグ時のみ
    if (this.DEBUG === true) {
        ns.app.enableStats();
    }

    ns.app.replaceScene(this.SceneTitle());
};


})(GAME);