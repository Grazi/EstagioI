var VencerGame = cc.Layer.extend({       ctor:function(){	this.setTouchEnabled(true)				var label1 = cc.LabelTTF.create( "PARABENS!" , "Comic Sans", 40 ); 		var menuItem1 = cc.MenuItemLabel.create(label1);		menuItem1.setPosition(new cc.Point(5,80));				var label2 = cc.LabelTTF.create( "Você Salvou O Planeta e venceu o jogo!!!" , "Comic Sans", 40 ); 		var menuItem2 = cc.MenuItemLabel.create(label2);		menuItem2.setPosition(new cc.Point(3,40));		var label3 = cc.LabelTTF.create( "Jogar Novamente", "Comic Sans", 30 );        var menuItem3 = cc.MenuItemLabel.create(label3, this, function(){                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new SalveOPlanetaScene())); 		});		menuItem3.setPosition(new cc.Point(10, - 30));				var label4 = cc.LabelTTF.create( "Sair", "Comic Sans", 30 );        var menuItem4 = cc.MenuItemLabel.create(label4, this, function(){                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new InicioScene())); 		});		menuItem4.setPosition(new cc.Point(350, - 250));	        var menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4);        this.addChild(menu);    }});VencerGameScene = cc.Scene.extend({	onEnter:function(){		this._super();		var layer = new VencerGame();		layer.init();		this.addChild(layer);	}})