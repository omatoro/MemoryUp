/**
 * ゲーム画面
 */
(function (ns) { ;



var BUTTON_Y = 300;
var QUESTNUM = 10; // 10門

// ボタンサイズ
var BUTTON_SIZE_X = 213;
var BUTTON_SIZE_Y = 213;

// ボタンの描画位置
var BUTTON_START_DRAW_X = 320;


/*
 * 問題となる数字を扱うクラス
 */
var QuestNumber = tm.createClass({
    init: function (_back) {
        for (var i = 0; i < _back + QUESTNUM; ++i) {
            this.number[i] = tm.util.Random.randint(0, 9);
        }
    },

    number: [],

    // 引数の問題数目の答えを返す
    getAunwer: function (quest_number) {
        if (0 <= quest_number && quest_number <= 10) {
            return number[quest_number];
        }

        // error
        return null;
    }
});



/*
 * 記憶ゲームクラス
 */
var Memory = tm.createClass({
    init: function (_back) {
        // 何問前の回答を答えるか
        this.back = _back || 1;

        // テキスト
        this.drawedNum = tm.app.Label("asdasdfasdfasdff"); // 生成
        this.drawedNum.x = 25; // X軸
        this.drawedNum.y = 50; // Y軸
        this.drawedNum.width = 200;  // 幅
        ns.app.currentScene.addChild(this.drawedNum); // シーンに追加
    },

    // 何問前の回答を答えるか
    back: 0,

    // 問題のスタック
    quest: QuestNumber(),

    // 正解数
    sum_result: 0,

    // クリックした場所の取得
    getClickPosition: function () {
        var mouse_x = ns.app.pointing.x; // マウスのx位置を取得
        var mouse_y = ns.app.pointing.y; // マウスのy位置を取得

        // ボタンの配置開始位置を引く
        mouse_y -= BUTTON_Y;

        return { x: mouse_x, y: mouse_y };
    },

    // クリックした場所が正解かどうかを判定する
    checkAnswer: function () {

        // クリック位置取得
        var mouse_position = getClickPosition();

        // クリックした場所がボタンの場所でなかったら終了する
        if (mouse_position.y < BUTTON_Y) {
            return false;
        }

        // クリック位置でユーザの回答を探す
        /*
         * ボタンの配置
         * １２３
         * ４５６
         * ７８９
         * 　０
         */

        // ボタンのサイズ
        var button_size = {
            x: ns.SCREEN_WIDTH / 3,
            y: ns.SCREEN_HEIGHT / 3
        };


        var click_number_x = mouse_position.x / button_size.x | 0; // 横3列
        var click_number_y = mouse_position.y / button_size.y | 0; // 縦4列

        // 0の左右の位置であった場合は無視する
        if (click_number_x === 0 && click_number_y === 3) {
            return false;
        }
        else if (click_number_x === 2 && click_number_y === 3) {
            return false;
        }

        // 回答が正解か調べる
        var user_answer = null;
        if (click_number_x === 0 && click_number_y === 0) { user_answer = 1; }
        if (click_number_x === 0 && click_number_y === 1) { user_answer = 2; }
        if (click_number_x === 0 && click_number_y === 2) { user_answer = 3; }
        if (click_number_x === 1 && click_number_y === 0) { user_answer = 4; }
        if (click_number_x === 1 && click_number_y === 1) { user_answer = 5; }
        if (click_number_x === 1 && click_number_y === 2) { user_answer = 6; }
        if (click_number_x === 2 && click_number_y === 0) { user_answer = 7; }
        if (click_number_x === 2 && click_number_y === 1) { user_answer = 8; }
        if (click_number_x === 2 && click_number_y === 2) { user_answer = 9; }
        if (click_number_x === 3 && click_number_y === 1) { user_answer = 0; }

        var answer = quest[quest.length - this.back - 1]; // -1は配列が0開始なので

        if (user_answer === answer) {
            return true;
        }

        return false; // 何にも引っかかってない、エラー

    },

    // 問題を表示
    drawQuest: function () {
        this.drawedNum.draw();
    },




});

ns.SceneMain = tm.createClass({
    superClass: tm.app.Scene,

    init: function(){
        this.superInit();


        // 画像の読み込み
//        this.sprite = tm.app.Sprite(128, 128, tm.graphics.TextureManager.get("sprite"));
//        this.sprite.setPosition(240, 360);  // 位置(x, y)を格納
//        this.sprite.speed = 5;  // 移動量を設定
//        this.addChild(this.sprite); // 親要素(この場合はTitleSceneクラス)に追加

        for (var i = 0; i < 11; ++i) {
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
//            this.sprite["number_black"][i] = tm.app.Sprite(
//                    BUTTON_SIZE_X,
//                    BUTTON_SIZE_Y,
//                    tm.graphics.TextureManager.get("num_black" + (i + 1)));
//            this.sprite["number_black"][i].setPosition(
//                    (i % 3)         * BUTTON_SIZE_X + (BUTTON_SIZE_X / 2),
//                    parseInt(i / 3) * BUTTON_SIZE_Y + (BUTTON_SIZE_Y / 2) + BUTTON_START_DRAW_X);
        }


        // 問題を作成するクラスを作成
        this.memory = Memory(1);

        // テキスト
        this.drawedNum = tm.app.Label(1, 50); // 生成
        this.drawedNum.x = 25; // X軸
        this.drawedNum.y = 100; // Y軸
        this.drawedNum.width = 200;  // 幅
        this.addChild(this.drawedNum); // シーンに追加
    },

    sprite: {
        number: {},
        number_black: {}
    },


    update: function(){
//        this.sprite.x += this.sprite.speed;    // 画像を移動

        // 画面外に出ようとしたら進む方向を反対にする
//        if(this.sprite.x < 0 || this.sprite.x > ns.app.width) {
//            this.sprite.speed *= -1;
//        }

        if( ns.app.keyboard.getKeyDown("Z")
        ||  ns.app.pointing.getPointingEnd() ){
            ns.app.replaceScene(ns.SceneTitle());
        }

//        this.memory.drawQuest();
        this.drawedNum.text = ns.app.frame;

        console.log('Main');
    }
});


})(GAME);