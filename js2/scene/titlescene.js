/**
 * タイトル画面
 */
tm.define('TitleScene', {
    superClass : 'tm.game.TitleScene',
    init : function(param) {
        console.dir(param);
        var self = this;
        self.superInit({
            title :  'WEBack',
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT,
            strokeStyle: 'red',
        });
        this.titleLabel.fontFamily   = FONT_FAMILY;
        this.messageLabel.fontFamily = FONT_FAMILY;
        this.touchLabel.fontFamily   = FONT_FAMILY;


        self.on('pointingend', function (e) {
            self.nextLabel = "menu";
            e.app.popScene();
        });
    },
});
