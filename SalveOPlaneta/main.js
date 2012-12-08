var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);
        cc.Loader.shareLoader().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };
        cc.Loader.shareLoader().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
		cc.AudioEngine.getInstance().init("mp3");
        cc.Loader.shareLoader().preload([
		    {type:"effect",src:"./Resources/effect"},
			{type:"effect", src:"./Resources/explosion"},
			{type:"effect",src:"./Resources/fire"},
            {type:"effect",src:"./Resources/win"},
            {type:"bgm",src:"./Resources/background"},
            {type:"image", src:"./images/botao_jogar.jpg"},
            {type:"image", src:"./images/botao_instrucoes.jpg"}
        ]);
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
       /* director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);*/
        director.runWithScene(new this.startScene());

        return true;
    }
});
var myApp = new cocos2dApp(InicioScene);