/**
 * タイトル画面
 */
(function(ns) {

    ns.SCREEN_WIDTH = 465;
    ns.SCREEN_HEIGHT = 465;
    // var SCREEN_CENTER_X = SCREEN_WIDTH/2;
    // var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;

    ns.SceneTitle = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {

            this.superInit({
                title : "記憶力向上げえむ",
                width : ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

        },

        update : function() {

            if (ns.app.keyboard.getKeyDown("Z")
                    || ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.SceneMain());
            }
            console.log('Title');
        }
    });

})(GAME);