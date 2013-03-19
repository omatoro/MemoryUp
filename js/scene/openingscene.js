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
                y: 90,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "バック数",
                fontSize: 40,
                align: "left"
            }, {
                type: "Label",
                name: "setting_speed",
                x: 20,
                y: 490,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "ゲーム速度",
                fontSize: 40,
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

            // セッティングデータ
            this.currentSettingBackNumber = 0;
            this.currentSettingSpeed = 0;
            this.currentSettingSpeedName = " ";

            // ゲーム開始ボタン
            var startGameButton = tm.app.iPhoneButton(ns.SCREEN_WIDTH-40, 120, "blue", "ゲーム開始");
            startGameButton.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT-100);
            this.addChild(startGameButton);
            this.startGameButton = startGameButton;

            // ラベル表示
            this.fromJSON(UI_DATA.LABELS);
        },

        update : function() {
            // セッティング処理を実行
            this.settingBackNumbers.update();
            this.settingSpeed.update();

            var backNumber = this.settingBackNumbers.getUserAnswer();
            if (backNumber !== null) { this.currentSettingBackNumber = backNumber; }

            var speed = this.settingSpeed.getUserAnswer();
            var speedName = this.settingSpeed.getUserAnswerName();
            if (speed !== null) { this.currentSettingSpeed = speed; this.currentSettingSpeedName = speedName; }

            // ゲーム開始ボタンが押されたらゲーム開始
            if (ns.app.pointing.getPointingEnd()) {
                ns.app.pointing.getPointingEnd();
                var mouse_position = ns.app.pointing;

                if (this.startGameButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    ns.app.replaceScene(ns.MainScene(this.currentSettingBackNumber, this.currentSettingSpeed, this.currentSettingSpeedName));
                }
            }
        }
    });

})(game);