
var _acertos = 0;
var	_erros = 3;

function getPontos(){
	return _acertos;
};

function getChances(){
	return _erros;
};

var Meteorito = cc.Sprite.extend({
    _conteiner: null,
	_posicao: cc.p(0,0),
	_aeronave: null,
	
	
    ctor:function(conteiner) {
		this._conteiner = conteiner;
        this.initWithFile("./images/meteorito.png");
		
        this.schedule(function() {
		        // velocidade do meteorito.
                this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - 3));
				this.process();
            });
    },

	setAeronave : function(aeronave){
		this._aeronave = aeronave;
	},

	getAcertos : function(){
		return _acertos;
	},

	getErros : function(){
		return _erros;
	},

	//Incrementa acertos.
	acertar : function(){
		_acertos++;
		this.verificaSeVenceuGame();
	},

	//Decrementa erros.
	errar : function(){
		if(_erros > 0){
			_erros -= 1;
			this.verificaSePerdeuGame();
		}
		
	},
	
	process:function() {
		if(!this.isAlive()) {
			this._conteiner.removeChild(this); // remove o meteorito.		
		}
	},

	//Quando 10 meteoritos forem atingidos o jogo exibe a pagina de VencerGame.
	verificaSeVenceuGame : function(){
		if (_acertos == 10){
			this.playSoundWin();
			cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new VencerGameScene()));
			this.stopPlayingSound();
		}

	},

	//Quando a aeronave for atingida 3 vezes o jogo exibe a pagina de GameOver.
	verificaSePerdeuGame : function(){
		if (_erros == 0){
			this._conteiner.removeChild(this._aeronave);
			this.playSoundAeronave();
			cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new GameOverScene())); 
			this.stopPlayingSound();
		}

	},


	 // Verifica todas as possiveis colisoes!!!
	 isAlive:function() {
		var child = null;
		var aeronave = this._aeronave;
		for(var i = 0; i < this._conteiner.getChildren().length; i++) {
		  child = this._conteiner.getChildren()[i];
		  
		  //Verifica se o meteorito encostou no chao.
		  if(this.getPosition().y <= 20) { 
				return false;
			}
		
		  //Verifica se o poder atingiu o meteorito.
		  if(child instanceof Poder) {
			if(this.testarColisaoEntrePoderEMeteorito_X(child.getPosition(), this.getPosition()) && this.testarColisaoEntrePoderEMeteorito_Y(child.getPosition(), this.getPosition())) {
				this.playSoundPoder();
				this._conteiner.removeChild(child); // remove o poder.
				this.acertar();
			    return false; 
			}
		  }
		  
		  //Verifica se a aeronave foi atingida pelo meteorito.
		  if(this.testarColisaoEntreAeronaveEMeteorito_X(aeronave.getPosition(), this.getPosition()) && this.testarColisaoEntreAeronaveEMeteorito_Y(aeronave.getPosition(), this.getPosition())) {
			  this.errar();
			  return false; 
			}
		}
		return true;
    },
	
	//Testa colisao entre Poder e Meteorito no eixo X.
	testarColisaoEntrePoderEMeteorito_X:function(poderPosition, meteoritoPosition) {
		if(meteoritoPosition.x-50 <= poderPosition.x-10 && poderPosition.x+10 <= meteoritoPosition.x+50) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Poder e Meteorito no eixo Y.
	testarColisaoEntrePoderEMeteorito_Y:function(poderPosition, meteoritoPosition) {
		if(meteoritoPosition.y-50 <= poderPosition.y-10 && poderPosition.y+10 <= meteoritoPosition.y+50) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Aeronave e Meteorito no eixo X.
	testarColisaoEntreAeronaveEMeteorito_X : function( aeronavePosition, meteoritoPosition)  {
		if(aeronavePosition.x-100 <= meteoritoPosition.x-50 && meteoritoPosition.x+50 <= aeronavePosition.x+100  ) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Aeronave e Meteorito no eixo Y.
	testarColisaoEntreAeronaveEMeteorito_Y:function(aeronavePosition, meteoritoPosition) {
		if( aeronavePosition.y-100 <=meteoritoPosition.y-50 &&  meteoritoPosition.y+50 <= aeronavePosition.y+100) {
			return true;
		}
		return false;
	},
	
	//Toca o som do Poder ao colidir.
	playSoundPoder:function(){
	    cc.AudioEngine.getInstance().playEffect("./Resources/effect");
     },

    //Toca o som da Vitoria.
	playSoundWin:function(){
	    cc.AudioEngine.getInstance().playEffect("./Resources/win");
     },
	 
	//Toca o som da Explosao da Aeronave.
	playSoundAeronave:function(){
	    cc.AudioEngine.getInstance().playEffect("./Resources/explosion");
	},
	
	//Pausa a música.
    stopPlayingSound:function(){
                if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
        {
	        cc.AudioEngine.getInstance().stopBackgroundMusic();
        }
    }

    // // Pausa o jogo.
	 // onPause : function(){
		// cc.Director.getInstance().pause();
		// this.exibirGameOver();
	 // },
	
});

var MeteoritoScene = (function(){
	var conteiner = null;
	var limiteInferior = 600;
	var limiteSuperior = 600;
	var _aeronave = null;
	
	this.setConteiner = function(conteiner) {
		this.conteiner = conteiner;
	};
	
	this.setAeronave = function(aeronave){
		this._aeronave = aeronave;
	};

	this.init = function() {
		var layer = this.conteiner;
		var aeronave = this._aeronave;
		setInterval(function() {
			var meteorito = criarMeteorito(layer, aeronave);
			layer.addChild(meteorito);
			}, gerarNumero(limiteInferior,limiteSuperior));
	};
	
	var criarMeteorito = function(conteiner, aeronave) {
		meteorito = new Meteorito(conteiner);
		meteorito.setAeronave(aeronave)
		meteorito.setPosition(new cc.Point(gerarNumero(20, 500),600 ));
		return meteorito;
	};
	
	var gerarNumero = function (limiteInferior,limiteSuperior){
		numPossibilidades = limiteSuperior - limiteInferior;
		aleat = Math.random() * numPossibilidades;
		aleat = Math.floor(aleat);
		return parseInt(limiteInferior) + aleat;
	};

});