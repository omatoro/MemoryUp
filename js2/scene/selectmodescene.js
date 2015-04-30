/**
 * 
 */
tm.define('SelectModeScene', {
    superClass : 'tm.app.Scene',
    init : function() {
        var self = this;
        self.superInit();

        self.fromJSON({
            children: {
                'selectModeGroup': {
                    type: 'tm.display.CanvasElement',
                    children: {
                        'modeLabel': {
                            type: 'tm.display.Label',
                            init: ['select mode'],
                            x: SCREEN_CENTER_X,
                            y: 200,
                            fillStyle: 'black',
                            fontSize: 40,
                            fontFamily: FONT_FAMILY,
                            toX: SCREEN_CENTER_X-400,
                            initX: SCREEN_CENTER_X,
                            toAlpha: 0.3,
                            initAlpha: 1.0,
                        },
                        'selectButton': {
                            type: 'tm.ui.FlatButton',
                            init: [{
                                text: 'easy mode',
                                width: 300,
                                fontSize: 40,
                                fontFamily: FONT_FAMILY,
                            }],
                            x: SCREEN_CENTER_X,
                            y: 280,
                            toX: SCREEN_CENTER_X-300,
                            initX: SCREEN_CENTER_X,
                            toAlpha: 0.3,
                            initAlpha: 1.0,
                            mode: 'easy', // これをゲーム開始時に使用
                        },
                        'startButton': {
                            type: 'tm.display.CircleShape',
                            init: [
                                145,
                                145,
                                {
                                    fillStyle: 'hsl(180, 60%, 50%)',
                                    strokeStyle: 'transparent',
                                },
                            ],
                            children: {
                                'triangle': {
                                    type: 'tm.display.TriangleShape',
                                    init: [{
                                        fillStyle: 'white',
                                    }],
                                },
                            },
                            x: SCREEN_CENTER_X,
                            y: 570,
                            toX: SCREEN_CENTER_X-300,
                            initX: SCREEN_CENTER_X,
                            toAlpha: 0.3,
                            initAlpha: 1.0,
                            rotation: 90,
                            interactive: true,
                            mode: 'easy',
                        },
                        'easyModeButton': {
                            type: 'tm.ui.FlatButton',
                            init: [{
                                text: 'easy mode',
                                width: 300,
                                fontSize: 40,
                                fontFamily: FONT_FAMILY,
                                fillStyle: 'hsl(180, 60%, 50%)',
                            }],
                            x: 800,
                            y: 280,
                            toX: SCREEN_CENTER_X,
                            initX: 800,
                            toAlpha: 1.0,
                            initAlpha: 0.3,
                            mode: 'easy',
                        },
                        'normalModeButton': {
                            type: 'tm.ui.FlatButton',
                            init: [{
                                text: 'normal mode',
                                width: 300,
                                fontSize: 40,
                                fontFamily: FONT_FAMILY,
                                fillStyle: 'hsl(260, 60%, 50%)',
                            }],
                            x: 800,
                            y: 385,
                            toX: SCREEN_CENTER_X,
                            initX: 800,
                            toAlpha: 1.0,
                            initAlpha: 0.3,
                            mode: 'normal',
                        },
                        'hardModeButton': {
                            type: 'tm.ui.FlatButton',
                            init: [{
                                text: 'hard mode',
                                width: 300,
                                fontSize: 40,
                                fontFamily: FONT_FAMILY,
                                fillStyle: 'hsl(310, 60%, 50%)',
                            }],
                            x: 800,
                            y: 490,
                            toX: SCREEN_CENTER_X,
                            initX: 800,
                            toAlpha: 1.0,
                            initAlpha: 0.3,
                            mode: 'hard',
                        },
                    },
                },
            },
        });

        self.selectModeGroup.selectButton.on('pointingend', function () {
            self.flare('pushSelectButton');
        });

        self.selectModeGroup.easyModeButton.on('pointingend', function () {
            self.flare('pushEasyButton');
        });
        self.selectModeGroup.normalModeButton.on('pointingend', function () {
            self.flare('pushNormalButton');
        });
        self.selectModeGroup.hardModeButton.on('pointingend', function () {
            self.flare('pushHardButton');
        });
        self.selectModeGroup.startButton.on('pointingend', function (e) {
            self.nextLabel = 'game';
            // ゲームの難易度を渡す
            self.nextArguments = {
                mode: e.target.mode,
            };
            e.app.popScene();
        });

        // モード選択ボタン押下
        self.on('pushSelectButton', function () {
            self.selectModeGroup.children.each(function (l) {
                l.tweener
                    .clear()
                    .to({
                        x: l.toX,
                        alpha: l.toAlpha,
                    }, 200, 'easeOutQuart');
            });
        });

        // モードを選択
        self.on('pushEasyButton', function () {
            var selectButton = self.selectModeGroup.selectButton;
            var targetButton = self.selectModeGroup.easyModeButton;
            selectButton.label.text = targetButton.label.text;
            selectButton.shape.fillStyle = targetButton.shape.fillStyle;
            var startButton = self.selectModeGroup.startButton;
            self.selectModeGroup.startButton.fillStyle = self.selectModeGroup.easyModeButton.shape.fillStyle;
            startButton.mode = targetButton.mode;
            self.selectModeGroup.children.each(function (l) {
                l.tweener
                    .clear()
                    .to({
                        x: l.initX,
                        alpha: l.initAlpha,
                    }, 200, 'easeOutQuart');
            });
        });
        self.on('pushNormalButton', function () {
            var selectButton = self.selectModeGroup.selectButton;
            var targetButton = self.selectModeGroup.normalModeButton;
            selectButton.label.text = targetButton.label.text;
            selectButton.shape.fillStyle = targetButton.shape.fillStyle;
            var startButton = self.selectModeGroup.startButton;
            self.selectModeGroup.startButton.fillStyle = self.selectModeGroup.normalModeButton.shape.fillStyle;
            startButton.mode = targetButton.mode;
            self.selectModeGroup.children.each(function (l) {
                l.tweener
                    .clear()
                    .to({
                        x: l.initX,
                        alpha: l.initAlpha,
                    }, 200, 'easeOutQuart');
            });
        });
        self.on('pushHardButton', function () {
            var selectButton = self.selectModeGroup.selectButton;
            var targetButton = self.selectModeGroup.hardModeButton;
            selectButton.label.text = targetButton.label.text;
            selectButton.shape.fillStyle = targetButton.shape.fillStyle;
            var startButton = self.selectModeGroup.startButton;
            self.selectModeGroup.startButton.fillStyle = self.selectModeGroup.hardModeButton.shape.fillStyle;
            startButton.mode = targetButton.mode;
            self.selectModeGroup.children.each(function (l) {
                l.tweener
                    .clear()
                    .to({
                        x: l.initX,
                        alpha: l.initAlpha,
                    }, 200, 'easeOutQuart');
            });
        });
    },
});

