var SalveOPlaneta = cc.Layer.extend({
	
	 _sprite:null,
	 _aeronave:null, 

	 init:function(){
        this._super();
		var size = cc.Director.getInstance().getWinSize();
		
		// adicionando plano de fundo.
		this._sprite = cc.Sprite.create("./images/espaco.jpg");
		this._sprite.setAnchorPoint(cc.p(0.5, 0.5));
		this._sprite.setPosition(cc.p(size.width / 2, size.height / 2));

		this.addChild(this._sprite, 0);
		
		//adicionando áudio.
		cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.5);

        var menuItem2 = new cc.MenuItemFont.create("PLAY",this,this.playSong);
        var menuItem3 = new cc.MenuItemFont.create("STOP",this,this.stopPlayingSound);

        menuItem2.setPosition(new cc.Point(750,570));
        menuItem3.setPosition(new cc.Point(750,545));

        var menu = cc.Menu.create(menuItem2,menuItem3);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

		// criando a aeronave.
        this._aeronave = new Aeronave();
        this.setKeyboardEnabled(true); //mover com o teclado.
		
        this.setPosition(new cc.Point(0,0));

        this.addChild(this._aeronave);
        this._aeronave.scheduleUpdate(); // a função update da aeronave será chamada a cada frame.
        this.schedule(this.update);
		
		// criando os meteoritos.
		var meteorito = new Meteorito();
		meteorito._posicao = cc.p(size.width/2,size.height/2);
		this.addChild(meteorito);
		
		_meteoritoScene = new MeteoritoScene();
		_meteoritoScene.setConteiner(this);
		_meteoritoScene.init();

        return true;
    },
	
	//toca a música.
	playSong:function(){
         cc.AudioEngine.getInstance().playBackgroundMusic("./Resources/background",false);
    },
	
	//pausa a música.
    stopPlayingSound:function(){
                if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
        {
	        cc.AudioEngine.getInstance().stopBackgroundMusic();
        }
    },
	
	// capta os eventos de teclado.	
    onEnter:function(){
        this._super();
    },
	
    onKeyDown:function(e){
		// chama a função de atirar.
        this.handleKey(e);
		// chama a função de movimentar a aeronave para os lados.
        this._aeronave.handleKey(e);
    },
	
    handleKey:function(e){
       if(e === cc.KEY.space) {
            var p = this._aeronave.getPosition();
			// criando o poder.
            var poder = new Poder();
				poder.setPosition(p);
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
