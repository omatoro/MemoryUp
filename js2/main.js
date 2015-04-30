/**
 * ゲーム起動処理
 */
tm.main(function() {
    // アプリケーション作成
    var app = tm.app.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT); // 画面サイズに合わせる
    app.fitWindow(); // リサイズ対応
    app.background = "rgb(255,255,255)"; // 背景色をセット

    // デバッグ時のみ
    if (DEBUG === true) {
        app.enableStats();
    }

    // シーンの切り替え
    var loadingScene = tm.game.LoadingScene({
        assets: {
            'logo': 'rsc/Icon-72.png'
        },
        nextScene: ManageScene,
    });
    // 先にwebfontを使用しておかないと、適用が遅くなる
    var tempLabel = tm.display.Label('dummy');
    tempLabel.setFontFamily(FONT_FAMILY);

    app.replaceScene(loadingScene);

    // tmlibの実行
    app.run();

});



// シーン管理
tm.define('ManageScene', {
    superClass: 'tm.game.ManagerScene',
    init: function () {
        this.superInit({
            scenes: [
                // {
                //     className: 'TitleScene',
                //     label: 'title',
                // },
                {
                    className: 'SelectModeScene',
                    label: 'selectMode',
                },
                {
                    className: 'GameScene',
                    label: 'game',
                },
            ],
        });
    },
});