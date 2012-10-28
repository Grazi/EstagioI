var Meteorito = cc.Sprite.extend({
    _conteiner : null,
	_posicao: cc.p(0,0),
	
    ctor:function(conteiner) {
		this._conteiner = conteiner;
        this.initWithFile("./images/meteorito.png");
		
        this.schedule(function() {
                this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - 5));
            });
			
        return true;
    },
});

var MeteoritoScene = (function(){
	var conteiner = null;
	var limiteInferior = 600;
	var limiteSuperior = 600;
	
	this.setConteiner = function(conteiner) {
		this.conteiner = conteiner;
	};

	this.init = function() {
		var layer = this.conteiner;
		setInterval(function() {
			var meteorito = criarMeteorito(layer);
			layer.addChild(meteorito);
			}, gerarNumero(limiteInferior,limiteSuperior));
	};

	var getConteiner = function() {
		return this.conteiner;
	};
	
	var criarMeteorito = function(conteiner) {
		meteorito = new Meteorito(conteiner);
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