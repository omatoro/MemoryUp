/**
 * タイトル画面
 */
(function(ns) {

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "WEBack",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });
        },

        update : function() {
            if (ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.OpeningScene());
            }
        }
    });

})(game);