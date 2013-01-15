/**
 * 問題となる数字を扱うクラス
 */
(function(ns) {

    ns.QuestNumber = tm.createClass({
        init : function(_back) {

            for ( var i = 0; i < _back + ns.QUESTNUM; ++i) {
                this.number[i] = tm.util.Random.randint(0, 9);
            }
        },

        number : [],

        // 引数の問題数目の答えを返す
        getAunwer : function(quest_number) {

            if (0 <= quest_number && quest_number <= 10) {
                return number[quest_number];
            }

            // error
            return null;
        }
    });

})(game);