/**
 * オープニング画面
 */
(function(ns) {

    ns.RecordScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ccchart.jsによるチャート描画用のデータ作成
            var chartData = {
                "config": {
                    "title": "",
                    "subTitle": "",
                    "type": "line",
                    "axisXLen": 27,
                    "axisXWidth": 1,
                    "maxY": 27,
                    "minY": 0,
                    "colorSet": ["#aaaaaa","yellow","","#4c6cb3","#eee"],
                    // "useMarker": "css-ring",
                    // "unit": "バック",
                    "useMarker": "maru",
                    "bgGradient": {
                        "direction":"vertical",
                        "from":"rgba(0,0,0,0)",
                        "to":"rgba(0,0,0,0)"
                    },
                    "lineWidth": 1,
                    "borderWidth": 4,
                    "markerWidth": 8,
                    "width" : ns.SCREEN_WIDTH,
                    "paddingLeft": 80,
                    "height" : ns.SCREEN_HEIGHT-100
                },

                "data": [
                    ["日付"],
                    ["未達成"],
                    ["達成"]
                ]
            };

            // ローカルストレージからデータを取得
            var loadLocalStorage = localStorage["WEBack"];
            if (loadLocalStorage) {
                loadLocalStorage = JSON.parse(loadLocalStorage);
            }
            else {
                loadLocalStorage = {
                    data: []
                };
            }

            // ローカルストレージから取得したデータをチャート用に変換する
            for (var i = 0; i < loadLocalStorage.data.length; ++i) {
                // 表示上必要なスコア(3back,高速,の場合は9となる)
                var chartScore = 0;

                // スピードによってスコアが変化するので計算する
                var speed = loadLocalStorage.data[i].speed;
                if      (speed === "遅い") { speed = -2; }
                else if (speed === "早い") { speed = -1; }
                else if (speed === "最速") { speed = 0; }

                // バック数がチャート上どの位置になるか計算する
                chartScore = loadLocalStorage.data[i].back　* 3 + speed;

                // 正解数が全問正解の場合はマーカーの色を変える
                if (loadLocalStorage.data[i].score === loadLocalStorage.data[i].questNumber) {
                    chartData.data[1].push([chartScore, "yellow"]);
                }
                // 全問正解でない場合はそのままの色で出力する
                else {
                    chartData.data[1].push(chartScore);
                }
            }
            

            var chart = tm.graphics.Canvas();
            chart.canvas.id = "world";
            var test = ccchart.init(chart.canvas, chartData);
            var sprite = tm.app.Sprite(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT-100, chart);
            sprite.position.set(ns.SCREEN_WIDTH/2+15, ns.SCREEN_HEIGHT/2-50)
            this.addChild(sprite);


            // 戻るボタン
            var openingSceneButton = tm.app.iPhoneButton(280, 60, "green", "戻る");
            openingSceneButton.setPosition(160, ns.SCREEN_HEIGHT-70);
            this.addChild(openingSceneButton);
            this.openingSceneButton = openingSceneButton;

            // 記録削除ボタン
            var recordDeleteButton = tm.app.iPhoneButton(120, 60, "red", "記録削除");
            recordDeleteButton.setPosition(560, ns.SCREEN_HEIGHT-70);
            this.addChild(recordDeleteButton);
            this.recordDeleteButton = recordDeleteButton;
        },

        update : function() {
            // // セッティング処理を実行
            // this.settingBackNumbers.update();
            // this.settingSpeed.update();
            // this.settingQuestNumber.update();

            // // 選択しているバック数を取得
            // var backNumber = this.settingBackNumbers.getUserAnswer();
            // if (backNumber !== null) { this.currentSettingBackNumber = backNumber; }

            // // 選択しているゲーム速度を取得
            // var speed = this.settingSpeed.getUserAnswer();
            // var speedName = this.settingSpeed.getUserAnswerName();
            // if (speed !== null) { this.currentSettingSpeed = speed; this.currentSettingSpeedName = speedName; }

            // // 選択している問題数を取得
            // var questNumber = this.settingQuestNumber.getUserAnswerName();
            // if (questNumber !== null) { this.currentSettingQuestNumber = questNumber; }

            // ゲーム開始ボタンが押されたらゲーム開始
            if (ns.app.pointing.getPointingEnd()) {
                ns.app.pointing.getPointingEnd();
                var mouse_position = ns.app.pointing;

                // 戻るボタンが押されたらOpeningに戻る
                if (this.openingSceneButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    ns.app.replaceScene(ns.OpeningScene());
                }

                // 記録削除ボタンが押されたらlocalStorageの内容を削除する
                if (this.recordDeleteButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    localStorage.removeItem("WEBack");
                }
            }
        }
    });

})(game);