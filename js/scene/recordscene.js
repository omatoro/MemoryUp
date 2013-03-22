/**
 * オープニング画面
 */
(function(ns) {

    ns.RecordScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // ボタンの生成
            // this.settingBackNumbers = ns.FactorySettingBackNumbers(this);
            // this.settingSpeed       = ns.FactorySettingSpeed(this);
            // this.settingQuestNumber = ns.FactorySettingQuestNumber(this);

            // セッティングデータ
            // this.currentSettingBackNumber = 0;
            // this.currentSettingSpeed = 0;
            // this.currentSettingSpeedName = "遅い";
            // this.currentSettingQuestNumber = 10;

    var chartdata9 = {
    
      "config": {
        "title": "Option bgGradient",
        "subTitle": "bgGradient の from と to で背景グラデーションの色を替えられます",
        "type": "stacked",
        "barWidth": 48,
        "colorSet": 
              ["#666","#aaa","#5b7e91","#4c6cb3","#eee"],
        "bgGradient": {
                "direction":"vertical",
                "from":"#222",
                "to":"#4c6cb3"
              }
      },
    
      "data": [
        ["年度",2007,2008,2009,2010,2011,2012,2013],
        ["紅茶",335,352,527,448,775,835,979],
        ["コーヒー",400,385,436,373,357,688,800],
        ["ジュース",160,252,588,252,567,502,660],
        ["ウーロン",100,183,352,120,302,400,1112]
      ]
    };
var chartdata69 = {

  "config": {
    "title": "記録",
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
    ["未達成",[2,"yellow"],1.5,3,8,5,20,3,4,4,4],
    ["達成"]
  ]
};


            var chart = tm.graphics.Canvas();

            chart.canvas.id = "world";

            var test = ccchart.init(chart.canvas, chartdata69);
            var sprite = tm.app.Sprite(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT-100, chart);
            sprite.position.set(ns.SCREEN_WIDTH/2+15, ns.SCREEN_HEIGHT/2-50)
            this.addChild(sprite);


            // 戻るボタン
            var openingSceneButton = tm.app.iPhoneButton(280, 60, "green", "戻る");
            openingSceneButton.setPosition(480, ns.SCREEN_HEIGHT-70);
            this.addChild(openingSceneButton);
            this.openingSceneButton = openingSceneButton;

            // 記録削除ボタン
            var recordDeleteButton = tm.app.iPhoneButton(120, 60, "red", "記録削除");
            recordDeleteButton.setPosition(80, ns.SCREEN_HEIGHT-70);
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
                if (this.openingSceneButton.isHitPoint(mouse_position.x, mouse_position.y)) {
                    localStorage.removeItem("WEBack");
                }
            }
        }
    });

})(game);