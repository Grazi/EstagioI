var Poder = cc.Sprite.extend({

    ctor:function() {
        this.initWithFile("./images/poder.png");

        this.schedule(function() {
				// velocidade do poder.
                this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + 15));
                this.validatePosition();
            });
        
        return true;
    },
    
	validatePosition:function() {
        if(this.getPosition().y  > 600) this.getPosition().y  = 600;
    }
});  