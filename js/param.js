/**
 * ゲーム用ネームスペース作成、定数作成
 */
var game = game || {};

(function(ns) {

    // スクリーンサイズ
    ns.SCREEN_WIDTH  = 640;
    ns.SCREEN_HEIGHT = 960;

    // ボタンサイズ
    ns.BUTTON_SIZE_X = 213;
    ns.BUTTON_SIZE_Y = 213;

    // ボタンの描画位置
    ns.BUTTON_START_DRAW_X = 320;

    // 問題数
    ns.QUESTNUM = 10;

})(game);