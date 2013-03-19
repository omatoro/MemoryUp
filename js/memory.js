/**
 * 記憶ゲームクラス ユーザの回答もクラス化する？　入力探知系も別クラスにする？
 */
(function(ns) {

    ns.Memory = tm.createClass({

        init : function(backNumber, gameSpeed) {
            // 何問前の回答を答えるか
            this.back = backNumber || 1;

            // ゲームが進むフレーム数
            this.gameSpeed = gameSpeed;

            // テキスト
            this.drawedNum = tm.app.Label("dammy"); // 生成
            this.drawedNum.x = 25; // X軸
            this.drawedNum.y = 50; // Y軸
            this.drawedNum.width = 200; // 幅
            ns.app.currentScene.addChild(this.drawedNum); // シーンに追加

            // 問題を管理するクラスの生成
            this.quest = ns.QuestNumber(this.back);

            // カウンター(ゲーム全体)の初期化
            this.overGameCounter = ns.Counter();

            // 描画時用の、一つの問題を表示している間のカウンター
            this.oneQuestCounter = ns.Counter();

            // 一度だけ行える処理を作るクラスの作成
            this.once = ns.Once();

            // ユーザの回答履歴
            this.user_answer = [];

            // 一つ前のユーザ回答番号
            this.past_user_answer = 0;

            // 現在のユーザの回答番号
            this.current_user_answer = 0;

            // 現在の問題数目
            this.current_quest_number = 0;

            // 実際の問題数目
            this.quest_number = 0;
        },

        // 何問目を出題するかの計算(フレームから算出する)
        // _howManyQuest : function () {
        //     return parseInt(this.overGameCounter.get() / this.gameSpeed);
        // },

        // バック時の表示も含めた問題数目(_isNextQuest関数でも処理を行ってる)
        _countQuestNumber : function () {
            // ユーザの回答が開始する前
            if (!this.isStartGame()) {
                if (this.oneQuestCounter.get() % this.gameSpeed === 0) {
                    ++this.quest_number;
                    // カウンターを初期化
                    this.oneQuestCounter.init();
                }
            }
        },

        // 次の問題へ移行する
        _nextQuest : function () {
            ++this.current_quest_number;
            ++this.quest_number;
            // カウンターを初期化
            this.oneQuestCounter.init();
        },

        // 次の問題に以降してよいか判断する(入力を受け付けたらすぐに次に進む)
        _isNextQuest : function () {
            if (this.past_user_answer !== this.current_user_answer
            ||  this.oneQuestCounter.get() % this.gameSpeed === 0) {
                return true;
            }
            // console.log(this.quest_number);
            return false;
        },

        // ユーザの回答をセット
        _setUserAnswer : function (number) {
            this.user_answer[this.user_answer.length] = number;
        },

        // ユーザの現在の回答をゲット
        _setCurrentUserAnswer : function (buttons) {
            // クリックされていなかったら以下処理を行わない
            if (ns.app.pointing.getPointingEnd() === false) {
                return false;
            }

            this.past_user_answer    = this.current_user_answer;
            this.current_user_answer = buttons.getUserAnswer() + 1 || this.current_user_answer;

            return true;
        },

        // 全ての問題が終了したか
        _finishQuest : function () {
            if (this.current_quest_number >= ns.QUESTNUM) {
                return true;
            }
            return false;
        },

        // 問題を表示
        drawQuest : function(label) {
            // 問題表示中のカウントアップ処理
            this.oneQuestCounter.up();
            console.log(this.oneQuestCounter.get());

            // 表示する文字を取得する
            label.text = this.quest.getQuest(this.quest_number-1) || " ";

            // 数字を切り替える際にフェードアウトする
            var alpha = 1.0 - (this.oneQuestCounter.get() / (this.gameSpeed*2));
            if (this.oneQuestCounter.get() === 1) {
            	alpha = 1.0;
            }
            label.fillStyle = "rgba(255, 255, 255," + alpha + ")";

            // 数字を切り替える際にスケールを変更する
            var scale = 2 * alpha;
            label.scaleX = label.scaleY = scale;

            // スケールを変更すると文字描画位置がずれるので調整
            label.x = ns.SCREEN_WIDTH / 2 - alpha * 25;
            label.y = 130 - alpha * 0;
        },

        // ゲームがスタートできるフレーム数に達したかを判断する
        isStartGame : function () {
            if (this.overGameCounter.get() > (this.back * this.gameSpeed)) {
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
            if (this._finishQuest()) {
                return true;
            }

            // 現在の問題数目(back時の問題も含め)をカウントする
            this._countQuestNumber();

            // ユーザが覚える問題数目までゲームはスタートしない
            if (this.isStartGame()) {
                // ユーザの入力箇所をセット
                this._setCurrentUserAnswer(scene.buttons);

                // タイマーをカウントダウンする
                scene.timer.countDown();

                // 一度だけボタンを全て明転する(以降この処理は行われない)
                this.once.call(true, scene.buttons, scene.buttons.changeBright);

                // 次の問題に以降する
                if (this._isNextQuest()) {
                    // 入力した場所を保持する
                    this._setUserAnswer(this.current_user_answer);

                    // 次の問題へ以降する
                    this._nextQuest();

                    // 前問で入力していた箇所をリセットする
                    this.current_user_answer = 0;
                    this.past_user_answer = 0;

                    // ボタンを全て明転する
                    scene.buttons.changeBright();

                    // タイマーをリセット
                    scene.timer.reset(this.gameSpeed);
                }
            }

            // カウントアップ
            this.overGameCounter.up();


            return false;
        }

    });

})(game);