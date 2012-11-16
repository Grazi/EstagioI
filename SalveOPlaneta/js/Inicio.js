var Inicio = cc.Layer.extend({   
    ctor:function(){

	this.setTouchEnabled(true)
		
		var label1 = cc.LabelTTF.create( "Terriveis chuvas de meteoritos podem atingir a Terra e so voce pode impedir esse desastre." , "Comic Sans", 20 ); 
		var menuItem1 = cc.MenuItemLabel.create(label1);
		menuItem1.setPosition(new cc.Point(5,100));
		
		var label2 = cc.LabelTTF.create( "Destrua os meteoritos e" , "Comic Sans", 20 ); 
		var menuItem2 = cc.MenuItemLabel.create(label2);
		menuItem2.setPosition(new cc.Point(30,70));
		
	    var label3 = cc.LabelTTF.create( "Salve o Planeta!", "Comic Sans", 60 );
		var menuItem3 = cc.MenuItemLabel.create(label3);
		menuItem3.setPosition(new cc.Point(30,30));
	
    	var label4 = cc.LabelTTF.create( "Iniciar Jogo", "Comic Sans", 30 );
        var menuItem4 = cc.MenuItemLabel.create(label4, this, function(){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new SalveOPlanetaScene())); 
		});
		menuItem4.setPosition(new cc.Point(10, - 30));
	
        var menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4);

        this.addChild(menu);
    }
});

InicioScene = cc.Scene.extend({
   onEnter:function(){
		this._super();
		var layer = new Inicio();
		layer.init();
		this.addChild(layer);
	}
})

