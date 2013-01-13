/**
 * ゲームメイン処理
 */
(function (ns) { ;

ns.run = function () {

    // タイトルシーンの生成
    var title = ns.SceneTitle();

    // シーンの切り替え
    ns.app.replaceScene(title);





};


})(GAME);