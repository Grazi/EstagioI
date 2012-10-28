var Aeronave = cc.Sprite.extend({
    _currentPosition:370,
	
    ctor:function() {
        this.initWithFile("./images/aeronave.png");
    },
    
    update:function(dt) {
		//atualiza a posi��o(x,y).
		this.setPosition(new cc.Point(this._currentPosition, 50));
    },
    
    handleKey:function(e) {
	    //a cada clique de seta para direita, posi��o incrementa 10 (largura).
        if(e === cc.KEY.right) {
            this._currentPosition = this._currentPosition + 10;
        }
		//a cada clique de seta para esquerda, posi��o decrementa 10 (largura).
        else if(e === cc.KEY.left) {
            this._currentPosition = this._currentPosition - 10;
		}
		this.validatePosition();
    },
    
	validatePosition:function() {
	    //at� que posi��o a nave pode se mover (largura, o x).
		if(this._currentPosition < 100) this._currentPosition = 100;
        if(this._currentPosition > 700) this._currentPosition = 700;
	},
});
