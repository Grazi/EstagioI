var Aeronave = cc.Sprite.extend({
    _posicaoAtual:370,
	
    ctor:function() {
        this.initWithFile("./images/aeronave.png");
    },
    
    update:function(dt) {
		//atualiza a posi��o(x,y).
		this.setPosition(new cc.Point(this._posicaoAtual, 50));
    },
    
	// movimenta a aeronave apos clicar nas teclas Seta direita e Seta esquerda.
    movimentarAeronave:function(e) {
	    //a cada clique de seta para direita, posi��o incrementa 10 (largura).
        if(e === cc.KEY.right) {
            this._posicaoAtual = this._posicaoAtual + 20;
        }
		//a cada clique de seta para esquerda, posi��o decrementa 10 (largura).
        else if(e === cc.KEY.left) {
            this._posicaoAtual = this._posicaoAtual - 20;
		}
		this.validarPosicao();
    },
    
	validarPosicao:function() {
	    //at� que posi��o a nave pode se mover (largura, o x).
		if(this._posicaoAtual < 50) this._posicaoAtual = 50;
        if(this._posicaoAtual > 750) this._posicaoAtual = 750;
	},
});
