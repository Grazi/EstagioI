var Meteorito = cc.Sprite.extend({
    _conteiner : null,
	_posicao: cc.p(0,0),
	_aeronave:null,
	
    ctor:function(conteiner) {
		this._conteiner = conteiner;
        this.initWithFile("./images/meteorito.png");
		
        this.schedule(function() {
                this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - 5));
				this.process();
            });
			
        return true;
    },
	
	setAeronave : function(aeronave){
		this._aeronave = aeronave;
	},
	
	process:function() {
			if(!this.isAlive()) {
				this._conteiner.removeChild(this); // remove o meteorito.
				this.cleanup();
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
				//TODO incremento de colisoes, Var cpm, regra para vencer o jogo: atingir 15 meteoritos.
				this._conteiner.removeChild(child); // remove o poder.
			  return false; 
			}
		  }
		  
		  //Verifica se a aeronave foi atingida pelo meteorito.
		  if(this.testarColisaoEntreAeronaveEMeteorito_X(aeronave.getPosition(), this.getPosition()) && this.testarColisaoEntreAeronaveEMeteorito_Y(aeronave.getPosition(), this.getPosition())) {
			  //TODO incremento de colisoes, Var cam, regra para perder o jogo: ser atingido por 5 meteoritos.
			  this._conteiner.removeChild(aeronave) // remove a aeronave.
			  return false; 
			}
			
		}
		return true;
    },
	
	//Testa colisao entre Poder e Meteorito no eixo X.
	testarColisaoEntrePoderEMeteorito_X:function(poderPosition, meteoritoPosition) {
		if(meteoritoPosition.x-30 <= poderPosition.x-15 && poderPosition.x+15 <= meteoritoPosition.x+30) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Poder e Meteorito no eixo Y.
	testarColisaoEntrePoderEMeteorito_Y:function(poderPosition, meteoritoPosition) {
		if(meteoritoPosition.y-30 <= poderPosition.y-15 && poderPosition.y+15 <= meteoritoPosition.y+30) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Aeronave e Meteorito no eixo X.
	testarColisaoEntreAeronaveEMeteorito_X : function( aeronavePosition, meteoritoPosition)  {
		if(aeronavePosition.x-40 <= meteoritoPosition.x-30 && meteoritoPosition.x+30 <= aeronavePosition.x+40  ) {
			return true;
		}
		return false;
	},
	
	//Testa colisao entre Aeronave e Meteorito no eixo Y.
	testarColisaoEntreAeronaveEMeteorito_Y:function(aeronavePosition, meteoritoPosition) {
		if( aeronavePosition.y-40 <=meteoritoPosition.y-30 &&  meteoritoPosition.y+30 <= aeronavePosition.y+40) {
			return true;
		}
		return false;
	}
	
});

var MeteoritoScene = (function(){
	var conteiner = null;
	var limiteInferior = 600;
	var limiteSuperior = 600;
	var _aeronave = null;
	
	this.setConteiner = function(conteiner) {
		this.conteiner = conteiner;
	};
	
	var getConteiner = function() {
		return this.conteiner;
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