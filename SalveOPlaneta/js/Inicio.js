var Inicio = cc.Layer.extend({   
    ctor:function(){

	    this.setTouchEnabled(true);
		
	    var size = cc.Director.getInstance().getWinSize();
		var sprite = cc.Sprite.create("./images/telainicial.jpg");
		sprite.setPosition(cc.p(size.width / 2, size.height / 2)); // posiciona o centro da imagem no centro da tela.
		this.addChild(sprite);

		// Botao Jogar
        var itemJogar = cc.MenuItemImage.create("./images/botao_jogar.jpg", "./images/botao_jogar.jpg", this, this.iniciarJogo);
        var menuJogar = cc.Menu.create(itemJogar);
        menuJogar.setPosition( cc.p( 535, 185 ) ); 
        this.addChild(menuJogar);

		// Botao Instrucoes
        var instrucoes = cc.MenuItemImage.create("./images/botao_instrucoes.jpg", "./images/botao_instrucoes.jpg", this, this.visualizarInstrucoes);
        var menuInstrucoes = cc.Menu.create(instrucoes);
        menuInstrucoes.setPosition( cc.p( 504, 140 ) );  
        this.addChild(menuInstrucoes);
    },

    iniciarJogo:function() {
         cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new SalveOPlanetaScene()));  
    },

    visualizarInstrucoes:function() {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new InstrucoesScene()));  
    }

});

InicioScene = cc.Scene.extend({
   onEnter:function(){
		this._super();
		var layer = new Inicio();
		layer.init();
		this.addChild(layer);
	}
});

