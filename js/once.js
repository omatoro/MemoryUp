/**
 * 一度だけ実行できる関数を作るクラス
 */
(function(ns) {

    ns.Once = tm.createClass({
        once_flag : true,

        run : function (flag, func) {
            if (flag      === true
            &&  this.once_flag === true) {
                var temp_arguments = [];
                for (var i = 2; i < arguments.length; ++i) {
                    temp_arguments[i - 2] = arguments[i];
                }
                func.apply(null, temp_arguments);
                this.once_flag = false;
            }
        }
    });

})(game);