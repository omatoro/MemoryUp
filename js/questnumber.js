/**
 * 問題となる数字を扱うクラス
 */
(function(ns) {

    ns.QuestNumber = tm.createClass({

        // 問題を格納した配列
        number : [],

        init : function (_back) {

            for ( var i = 0; i < _back + ns.QUESTNUM; ++i) {
                this.number[i] = tm.util.Random.randint(1, 9);
            }

            // 何個目の問題を表示するか
            quest_number = 0;
        },

        // 問題の数字を返す
        getQuest : function (quest_number) {

            if (quest_number === undefined
            ||  typeof(quest_number) !== "number") {
                return null;
            }

            return this.number[quest_number];
        },

        // 引数の問題数目の答えを返す
        getAunwer : function (quest_number) {

            if (0 <= quest_number && quest_number <= 10) {
                return number[quest_number];
            }

            // error
            return null;
        },

        // 正解数を返す
        getScore : function (user_answers) {
            var result = 0;
            for (var i = 0; i < user_answers.length; ++i) {
                if (this.number[i] === user_answers[i]) {
                    ++result;
                }
            }

            return result;
        }
    });

})(game);