/**
 * 記憶ゲームクラス ユーザの回答もクラス化する？　入力探知系も別クラスにする？
 */
(function(ns) {

    ns.Memory = tm.createClass({

        init : function(_back) {

            // 何問前の回答を答えるか
            this.back = _back || 1;

            // テキスト
            this.drawedNum = tm.app.Label("dammy"); // 生成
            this.drawedNum.x = 25; // X軸
            this.drawedNum.y = 50; // Y軸
            this.drawedNum.width = 200; // 幅
            ns.app.currentScene.addChild(this.drawedNum); // シーンに追加

            // 問題を管理するクラスの生成
            this.quest = ns.QuestNumber(ns.BACK_NUMBER);

            // カウンターの初期化
            this.counter = ns.Counter();

            // 一度だけ行える処理を作るクラスの作成
            this.once = ns.Once();

            // ボタン処理作成
            this.button = ns.ButtonNumber();

            // ユーザの回答履歴
            this.user_answer = [];

            // 一つ前のユーザ回答番号
            this.past_user_answer = 0;

            // 現在のユーザの回答番号
            this.current_user_answer = 0;

            // 現在の問題数目
            this.current_quest_number = 0;
        },

        // 何問目を出題するかの計算(フレームから算出する)
        howManyQuest : function () {
            return parseInt(this.counter.get() / ns.NEXT_GAME_FRAME);
        },

        // 次の問題に以降してよいか判断する
        isNextQuest : function () {
            if (this.counter.get() % ns.NEXT_GAME_FRAME === 0) {
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
            if (this.counter.get() > (this.back * ns.NEXT_GAME_FRAME)) {
                return true;
            }
            return false;
        },

        // ユーザの回答をセット
        setUserAnswer : function (number) {
            this.user_answer[this.user_answer.length] = number;
        },

        // ユーザの現在の回答をゲット
        setCurrentUserAnswer : function (sprite) {
            // クリックされていなかったら以下処理を行わない
            if (this.button.isClick() === false) {
                return false;
            }

            this.past_user_answer    = this.current_user_answer;
            this.current_user_answer = this.button.getUserAnswer(sprite) + 1 || this.current_user_answer;

            return true;
        },

        // ユーザの過去の回答をゲット
        getPastUserAnswer : function () {
            return this.past_user_answer;
        },

        // 次の問題へ移行する
        nextQuest : function () {
            ++this.current_quest_number;
        },

        // 全ての問題が終了したか
        finishQuest : function () {
            if (this.current_quest_number >= ns.QUESTNUM) {
                return true;
            }
            return false;
        },

        // スコア取得
        getScore : function () {
            return this.quest.getScore(this.user_answer);
        },

        // ゲームメイン処理
        update : function (scene) {

            // 問題が全て終了したら
            if (this.finishQuest()) {
                return true;
            }

            // ユーザが覚える問題数目までゲームはスタートしない
            if (this.isStartGame()) {
                // ユーザの入力箇所をセット
                this.setCurrentUserAnswer(scene.sprite);

                // タイマーをカウントダウンする
                scene.timer.countDown();

                // 一度だけボタンを全て明転する(以降この処理は行われない)
                this.once.run(true, this.button.changeBright, scene, scene.sprite);

                // 次の問題に以降する
                if (this.isNextQuest()) {
                    // 入力した場所を保持する
                    this.setUserAnswer(this.current_user_answer);

                    // 次の問題へ以降する
                    this.nextQuest();

                    // 前問で入力していた箇所をリセットする
                    this.current_user_answer = 0;
                    this.past_user_answer = 0;

                    // ボタンを全て明転する
                    this.button.changeBright(scene, scene.sprite);

                    // タイマーをリセット
                    scene.timer.reset();
                }
            }

            // カウントアップ
            this.counter.up();

            return false;
        }

    });

})(game);