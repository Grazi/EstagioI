var VencerGame = cc.Layer.extend({       ctor:function(){	this.setTouchEnabled(true)				var label1 = cc.LabelTTF.create( "PARABENS! Você venceu o Game" , "Comic Sans", 50 ); 		var menuItem1 = cc.MenuItemLabel.create(label1);		menuItem1.setPosition(new cc.Point(5,40));				var label2 = cc.LabelTTF.create( "Jogar Novamente", "Comic Sans", 30 );        var menuItem2 = cc.MenuItemLabel.create(label2, this, function(){                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new SalveOPlanetaScene())); 		});		menuItem2.setPosition(new cc.Point(10, - 30));				var label3 = cc.LabelTTF.create( "Sair", "Comic Sans", 30 );        var menuItem3 = cc.MenuItemLabel.create(label3, this, function(){                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new InicioScene())); 		});		menuItem3.setPosition(new cc.Point(350, - 250));	        var menu = cc.Menu.create(menuItem1, menuItem2, menuItem3);        this.addChild(menu);    }});VencerGameScene = cc.Scene.extend({	onEnter:function(){		this._super();		var layer = new VencerGame();		layer.init();		this.addChild(layer);	}})