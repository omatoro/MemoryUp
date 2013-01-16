/**
 * 記憶ゲームクラス
 */
(function(ns) {

    ns.NEXT_GAME_FRAME = 90;

    ns.Memory = tm.createClass({

        // 何問前の回答を答えるか
        back : 0,

        // 問題のスタック
        quest : {},

        // 現在の問題数目
        current_quest_numebr : 0,

        // 現在のユーザの回答番号
        current_user_answer : 0,

        // ユーザの回答履歴
        user_answer : [],

        // 正解数
        sum_result : 0,

        // フレーム数のカウンタ
        count : 0,

        init : function(_back) {

            // 何問前の回答を答えるか
            this.back = _back || 1;

            // テキスト
            this.drawedNum = tm.app.Label("asdasdfasdfasdff"); // 生成
            this.drawedNum.x = 25; // X軸
            this.drawedNum.y = 50; // Y軸
            this.drawedNum.width = 200; // 幅
            ns.app.currentScene.addChild(this.drawedNum); // シーンに追加

            // 問題を管理するクラスの生成
            this.quest = ns.QuestNumber(ns.BACK_NUMBER);

            // カウンターの初期化
            this.initCount();
        },

        // カウンターの初期化
        initCount : function () {
            this.count = 0;
        },

        // クリックした場所の取得
        getClickPosition : function() {
            ns.app.pointing.getPointingEnd();
            return ns.app.pointing;
        },

        isClick : function () {
            return ns.app.pointing.getPointingEnd();
        },

        // クリックした場所が正解かどうかを判定する
        checkAnswer : function() {

            // クリック位置取得
            var mouse_position = getClickPosition();

            // クリックした場所がボタンの場所でなかったら終了する
            if (mouse_position.y < BUTTON_Y) {
                return false;
            }

            // クリック位置でユーザの回答を探す
            /*
             * ボタンの配置 １２３ ４５６ ７８９ ０
             */

            // ボタンのサイズ
            var button_size = {
                x : ns.SCREEN_WIDTH / 3,
                y : ns.SCREEN_HEIGHT / 3
            };

            var click_number_x = mouse_position.x / button_size.x | 0; // 横3列
            var click_number_y = mouse_position.y / button_size.y | 0; // 縦4列

            // 0の左右の位置であった場合は無視する
            if (click_number_x === 0 && click_number_y === 3) {
                return false;
            } else if (click_number_x === 2 && click_number_y === 3) {
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

        // カウントアップ
        countUp : function () {
            ++this.count;
        },

        getCount : function () {
            return this.count;
        },

        // 何問目を出題するかの計算(フレームから算出する)
        howManyQuest : function () {
            return parseInt(this.getCount() / ns.NEXT_GAME_FRAME);
        },

        // 次の問題に以降してよいか判断する
        isNextQuest : function () {
            if (this.getCount() % ns.NEXT_GAME_FRAME === 0) {
                return true;
            }
            return false;
        },

        // 問題を表示
        drawQuest : function(label) {
            label.text = this.quest.getQuest(this.howManyQuest());
        },

        // ゲームがスタートできるフレーム数に達したかを判断する
        isStartGame : function () {
            if (this.getCount() > (this.back * ns.NEXT_GAME_FRAME)) {
                return true;
            }
            return false;
        },

        // ユーザの回答をセット
        setUserAnswer : function (number) {
            this.user_answer[this.user_answer.length] = number;
        },

        // ユーザの回答をゲット
        getUserAnswer : function () {
            // クリックされていなかったら以下処理を行わない
            if (this.isClick() === false) {
                return 0;
            }
            return this.current_user_answer;
        },

        // 次の問題へ移行する
        nextQuest : function () {
            ++this.currentquestnumebr;
        },

        // 入力箇所を暗転する
//        drawBlack : function (number) {
//            // 表示数値以外の引数だったらエラーとして何もしない
//            if (0 < number && number < 10) {
//                return number;
//            }
//        },

        // 全ての問題が終了したか
        finishQuest : function () {
            if (this.currentquestnumebr >= ns.QUESTNUM - 1 + this.back) {
                return true;
            }
            return false;
        },

        // ユーザの入力を取得
        getUserAnswer : function () {
            // クリックされていなかったら以下処理を行わない
            if (this.isClick() === false) {
                return false;
            }


            // クリック位置取得
            var mouse_position = this.getClickPosition();

            // クリックした場所がボタンの場所でなかったら終了する
            if (mouse_position.y < ns.BUTTON_Y) {
                return false;
            }

            // ボタンのサイズ
            var button_size = {
                x : ns.SCREEN_WIDTH  / 3,
                y : ns.SCREEN_WIDTH  / 3
            };

            var click_number_x = mouse_position.x                 / button_size.x | 0; // 横3列
            var click_number_y = (mouse_position.y - ns.BUTTON_Y) / button_size.y | 0; // 縦3列

            // どのボタンを押したのか判断する
            var user_answer = 0;
            if (click_number_x === 0 && click_number_y === 0) { user_answer = 1; }
            if (click_number_x === 0 && click_number_y === 1) { user_answer = 2; }
            if (click_number_x === 0 && click_number_y === 2) { user_answer = 3; }
            if (click_number_x === 1 && click_number_y === 0) { user_answer = 4; }
            if (click_number_x === 1 && click_number_y === 1) { user_answer = 5; }
            if (click_number_x === 1 && click_number_y === 2) { user_answer = 6; }
            if (click_number_x === 2 && click_number_y === 0) { user_answer = 7; }
            if (click_number_x === 2 && click_number_y === 1) { user_answer = 8; }
            if (click_number_x === 2 && click_number_y === 2) { user_answer = 9; }

            return user_answer;
        },

        // ユーザの入力を取得２
        getUserAnswer2 : function (sprite) {
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

        // ゲームメイン処理
        update : function () {

            // 問題が全て終了したら
            if (this.finishQuest()) {
                return true;
            }

            // ユーザが覚える問題数目までゲームはスタートしない
            if (this.isStartGame()) {
                // ユーザの入力箇所を取得
                this.current_user_answer = this.getUserAnswer() || this.current_user_answer;

                // 次の問題に以降する
                if (this.isNextQuest()) {
                    // 入力した場所を保持する
                    this.setUserAnswer(this.current_user_answer);

                    // 次の問題へ以降する
                    this.nextQuest();

                    // 前問で入力していた箇所をリセットする
                    this.current_user_answer = 0;
                }
            }




            // カウントアップ
            this.countUp();

            return false;


        }

    });

})(game);