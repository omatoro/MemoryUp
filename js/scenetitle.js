/**
 * タイトル画面
 */
(function(ns) {

    ns.SceneTitle = tm.createClass({

        superClass : tm.app.TitleScene,

        init : function() {

            this.superInit({
                title :  "記憶力向上げえむ",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

        },

        update : function() {

            if (ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.SceneMain());
            }
        }
    });

})(game);