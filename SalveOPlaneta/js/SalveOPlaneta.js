var SalveOPlaneta = cc.Layer.extend({
	 _sprite: null,
	 _aeronave: null, 

	 init:function(){
        this._super();
		this.playSong();
		var size = cc.Director.getInstance().getWinSize();
		
		// adicionando plano de fundo.
		this._sprite = cc.Sprite.create("./images/espaco.jpg");
		this._sprite.setPosition(cc.p(size.width / 2, size.height / 2)); // posiciona o centro da imagem no centro da tela.
		this.addChild(this._sprite);
		
		// adicionando �udio.
		cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.1);
		cc.AudioEngine.getInstance().setEffectsVolume(0.3);
		var menuSom= new cc.MenuItemFont.create("SOM");
		menuSom.setPosition(new cc.Point(730,570));
        var menuPlay = new cc.MenuItemFont.create("Tocar",this,this.playSong);
		menuPlay.setPosition(new cc.Point(730,535));
        var menuStop = new cc.MenuItemFont.create("Pausar",this,this.stopPlayingSound);
        menuStop.setPosition(new cc.Point(730,510));
        var menuGeralSom = cc.Menu.create(menuSom,menuPlay,menuStop);
        menuGeralSom.setPosition(new cc.Point(0,0)); // para que o menu possa ser exibido.
        this.addChild(menuGeralSom);
		
		// adicionando situacao do jogo.
		var menuGame= new cc.MenuItemFont.create("JOGO");
		menuGame.setPosition(new cc.Point(70,570));
        var menuWin = new cc.MenuItemFont.create("Ganhos: ");
		menuWin.setPosition(new cc.Point(70,535));
		var menuOver = new cc.MenuItemFont.create("Perdas: ");
		menuOver.setPosition(new cc.Point(70,510));
        var menuGeral = cc.Menu.create(menuGame, menuWin, menuOver);
        menuGeral.setPosition(new cc.Point(0,0)); // para que o menu possa ser exibido.
        this.addChild(menuGeral);
		
		// criando a aeronave.
        this._aeronave = new Aeronave();
        this.setKeyboardEnabled(true); //mover com o teclado.
        this.addChild(this._aeronave);
        this._aeronave.scheduleUpdate(); // a fun��o update da aeronave ser� chamada a cada frame.
		
		// criando os meteoritos.
		_meteoritoScene = new MeteoritoScene();
		_meteoritoScene.setConteiner(this);
		_meteoritoScene.setAeronave(this._aeronave);
		_meteoritoScene.init();

    },
	
	//toca a m�sica.
	playSong:function(){
         cc.AudioEngine.getInstance().playBackgroundMusic("./Resources/background",true); // true para ficar repetindo a musica.
    },
	
	//pausa a m�sica.
    stopPlayingSound:function(){
                if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
        {
	        cc.AudioEngine.getInstance().stopBackgroundMusic();
        }
    },
	
	// evento que ocorre quando o usu�rio pressiona uma tecla.
    onKeyDown:function(e){
		// space.
        this.criarPoder(e);
		// setas.
        this._aeronave.movimentarAeronave(e);
    },
	
	// cria o poder apos clicar na tecla Space.
	criarPoder:function(e){
          if(e === cc.KEY.space) {
            var poder = new Poder();
			poder.setPosition(new cc.Point(this._aeronave.getPosition().x, this._aeronave.getPosition().y + 70));
            this.addChild(poder);
            } 
     }
	
});

SalveOPlanetaScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SalveOPlaneta();
        layer.init();
        this.addChild(layer);
    }
});
