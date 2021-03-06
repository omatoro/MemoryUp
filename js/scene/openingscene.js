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
                x: 40,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "バック数",
                fontSize: 30,
                align: "left"
            }, {
                type: "Label",
                name: "setting_speed",
                x: 40,
                y: 170,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "ゲーム速度",
                fontSize: 30,
                align: "left"
            }, {
                type: "Label",
                name: "setting_questnumber",
                x: 40,
                y: 260,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "問題数",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    ns.OpeningScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(backnum, speed, speedName, questnum) {
            this.superInit();

            // ボタンの生成
            this.settingBackNumbers = ns.FactorySettingBackNumbers(this);
            this.settingSpeed       = ns.FactorySettingSpeed(this);
            this.settingQuestNumber = ns.FactorySettingQuestNumber(this);

            // セッティングデータ
            this.currentSettingBackNumber  = backnum   || 0;
            this.currentSettingSpeed       = speed     || 60;
            this.currentSettingSpeedName   = speedName || "遅い";
            this.currentSettingQuestNumber = questnum  || 10;

            // ゲーム開始ボタン
            var startGameButton = tm.app.GlossyButton(280, 60, "blue", "ゲーム開始");
            startGameButton.setPosition(480, ns.SCREEN_HEIGHT-70);
            this.addChild(startGameButton);
            this.startGameButton = startGameButton;

            // 記録閲覧ボタン
            var recordButton = tm.app.GlossyButton(280, 60, "green", "記録閲覧");
            recordButton.setPosition(160, ns.SCREEN_HEIGHT-70);
            this.addChild(recordButton);
            this.recordButton = recordButton;

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);
        },

        update : function() {
            // 選択しているバック数を取得
            var backNumber = this.settingBackNumbers.getUserAnswer();
            if (backNumber !== null) { this.currentSettingBackNumber = backNumber; }

            // 選択しているゲーム速度を取得
            var speed = this.settingSpeed.getUserAnswer();
            var speedName = this.settingSpeed.getUserAnswerName();
            if (speed !== null) { this.currentSettingSpeed = speed; this.currentSettingSpeedName = speedName; }

            // 選択している問題数を取得
            var questNumber = this.settingQuestNumber.getUserAnswer();
            if (questNumber !== null) { this.currentSettingQuestNumber = questNumber; }

            // ボタン押下時の動作
            if (ns.app.pointing.getPointingEnd()) {
                ns.app.pointing.getPointingEnd();
                var mouse_position = ns.app.pointing;

                // ゲーム開始ボタンが押されたらゲーム開始
                if (this.startGameButton.isHitPoint(mouse_position.x, mouse_position.y)) {

                    ns.app.replaceScene(
                        ns.MainScene(
                            this.currentSettingBackNumber,
                            this.currentSettingSpeed,
                            this.currentSettingSpeedName,
                            this.currentSettingQuestNumber));
                }
                // 記録閲覧ボタンが押されたら画面を遷移する
                if (this.recordButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    ns.app.replaceScene(ns.RecordScene());
                }
            }
        }
    });

})(game);