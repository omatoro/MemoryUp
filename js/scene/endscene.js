/**
 * エンド画面(スコア表示)
 */
(function(ns) {

    var UI_DATA = {
        LABELS : {
            children : [
                {
                    type : "Label" , name : "scoreLabel",
                    x : 450, y : 215, width : 400, fillStyle : "white",
                    text : "dammy", fontSize : 48, align : "end"
                }
            ]
        }
    };

    var RESULT_PARAM = {
            score: 256,
            msg:      "【記憶力向上げえむ】",
            hashtags: "omatoro",
            url:      "http://testcording.com/",
            width:    ns.SCREEN_WIDTH,
            height:   ns.SCREEN_HEIGHT,
            related:  "tmlib.js javascript testcording",
    };

    ns.EndScene = tm.createClass({

        superClass : tm.app.ResultScene,

        // 表示するスコア
        score : 0,

        // タイトル移動へのボタン
        title_button : {},

        init : function(score, backNum, speed, questNumber) {
            // スコア初期化
            RESULT_PARAM.score = speed + " " + backNum + "バック" + " " + score + " / " + questNumber + " 問正解！";
            this.superInit(RESULT_PARAM);

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

            var date = new Date();
            var alldate = date.format("Y/m/d");
            var year    = date.format("Y");
            var month   = date.format("m");
            var day     = date.format("d");

            var memorizeData = {
                date: {
                    all: alldate,
                    year: year,
                    month: month,
                    day: day,
                },
                score: score,
                questNumber: questNumber,
                back: backNum,
                speed: speed
            };

            loadLocalStorage.data.push(memorizeData);
            localStorage["WEBack"] = JSON.stringify(loadLocalStorage);

            console.dir(loadLocalStorage);
        },

        update : function() {
        },

        // Backボタンを押したら、onpointingstart->インスタンス.dispatchEventにより
        // 以下onnextsceneイベントが実行される
        onnextscene : function () {
            ns.app.replaceScene(ns.OpeningScene());
        },
    });

})(game);