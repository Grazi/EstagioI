var GameOver = cc.Layer.extend({       ctor:function(){	this.setTouchEnabled(true)				var label1 = cc.LabelTTF.create( "GAME OVER" , "Comic Sans", 50 ); 		var menuItem1 = cc.MenuItemLabel.create(label1);		menuItem1.setPosition(new cc.Point(5,40));				var label2 = cc.LabelTTF.create( "Jogar Novamente", "Comic Sans", 30 );        var menuItem2 = cc.MenuItemLabel.create(label2, this, function(){                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new SalveOPlanetaScene())); 		});		menuItem2.setPosition(new cc.Point(10, - 30));	        var menu = cc.Menu.create(menuItem1, menuItem2);        this.addChild(menu);    }});GameOverScene = cc.Scene.extend({	onEnter:function(){		this._super();		var layer = new GameOver();		layer.init();		this.addChild(layer);	}})