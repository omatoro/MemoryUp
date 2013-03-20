/**
 * オープニング画面
 */
(function(ns) {

        // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "setting_backnum",
                x: 20,
                y: 60,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "バック数",
                fontSize: 30,
                align: "left"
            }, {
                type: "Label",
                name: "setting_speed",
                x: 20,
                y: 450,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "ゲーム速度",
                fontSize: 30,
                align: "left"
            }, {
                type: "Label",
                name: "setting_questnumber",
                x: 20,
                y: 630,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "問題数(出題問題数は問題数+バック数)",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    ns.OpeningScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ボタンの生成
            this.settingBackNumbers = ns.FactorySettingBackNumbers(this);
            this.settingSpeed       = ns.FactorySettingSpeed(this);
            this.settingQuestNumber = ns.FactorySettingQuestNumber(this);

            // セッティングデータ
            this.currentSettingBackNumber = 0;
            this.currentSettingSpeed = 0;
            this.currentSettingSpeedName = "遅い";
            this.currentSettingQuestNumber = 10;

            // ゲーム開始ボタン
            var startGameButton = tm.app.iPhoneButton(300, 60, "blue", "ゲーム開始");
            startGameButton.setPosition(470, ns.SCREEN_HEIGHT-70);
            this.addChild(startGameButton);
            this.startGameButton = startGameButton;

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);
        },

        update : function() {
            // セッティング処理を実行
            this.settingBackNumbers.update();
            this.settingSpeed.update();
            this.settingQuestNumber.update();

            // 選択しているバック数を取得
            var backNumber = this.settingBackNumbers.getUserAnswer();
            if (backNumber !== null) { this.currentSettingBackNumber = backNumber; }

            // 選択しているゲーム速度を取得
            var speed = this.settingSpeed.getUserAnswer();
            var speedName = this.settingSpeed.getUserAnswerName();
            if (speed !== null) { this.currentSettingSpeed = speed; this.currentSettingSpeedName = speedName; }

            // 選択している問題数を取得
            var questNumber = this.settingQuestNumber.getUserAnswerName();
            if (questNumber !== null) { this.currentSettingQuestNumber = questNumber; }

            // ゲーム開始ボタンが押されたらゲーム開始
            if (ns.app.pointing.getPointingEnd()) {
                ns.app.pointing.getPointingEnd();
                var mouse_position = ns.app.pointing;

                if (this.startGameButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    ns.app.replaceScene(
                        ns.MainScene(
                            this.currentSettingBackNumber,
                            this.currentSettingSpeed,
                            this.currentSettingSpeedName,
                            this.currentSettingQuestNumber));
                }
            }
        }
    });

})(game);