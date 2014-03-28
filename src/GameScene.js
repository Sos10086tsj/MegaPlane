/**
 * Created by ParisTao on 14-3-19.
 */

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
var plane;
var gameLayer;
var gameOver = false;
var gameBegin = false;
var enemyPlaneList = new Array();
var score = 0;
var scoreCom;
var menu;
var gameOverLabel;
var GameLayer = cc.Layer.extend({

    init : function(){
        this._super();
        gameLayer = cc.Layer.create(new cc.Color4B(0,0,0,0.5));

        this.initSprite(gameLayer);
        this.initScoreLabel();

        this.initMenu();

        this.addChild(gameLayer);
        return true;
    },

    initSprite:function(layer){
        //添加背景
        var bg = new BackgroudSprite();
        layer.addChild(bg);

        //添加飞机
        plane = new PlaneSprite();
        layer.addChild(plane);

        this.schedule(this.fireBullet,0.5,100000,0);
        //添加敌机
        this.schedule(this.enemyPlane,1,100000,0);

    },

    fireBullet:function(){
        if(gameOver){
            return;
        }
        //游戏开始才发射子弹
        if(gameBegin){
            var bullet = new PlaneBulletSprite();
            var planeBulletSpeed = 2;
            bullet.setPosition(new cc.p(plane.getPosition().x + 30,60 + 15));
            bullet.schedule(function(){
                this.setPosition(new cc.Point(this.getPosition().x,this.getPosition().y+planeBulletSpeed));
                if(this.getPosition().x < 0 || this.getPosition().x > 360 - 5/2 || this.getPosition().y > 480){
                    gameLayer.removeChild(this);
                };
                for(var i = enemyPlaneList.length - 1; i >= 0 ; i--){
                    var checkedPlane = enemyPlaneList[i];
                    var distX = this.getPosition().x - checkedPlane.getPosition().x;
                    var distY = this.getPosition().y - checkedPlane.getPosition().y;
                    if(distX*distX + distY*distY < 144){
                        gameLayer.removeChild(this);
                        CustomerFunction.maintain(checkedPlane, this);
                    }
                }
            },0,null,0);
            gameLayer.addChild(bullet);
        }
    },

    enemyPlane:function(){
        //cc.log('before:' + enemyPlaneList.length);
        if(gameOver){
            return;
        }
        var enemyPlane = new EnemyPlaneSprite();
        var enemyPlaneSpeed = 2;
        var originX = Math.random();
        enemyPlane.setPosition(new cc.p(originX * 360 % 360 , 480));
        enemyPlaneList.push(enemyPlane);
        enemyPlane.schedule(function(){
            this.setPosition(new cc.Point(this.getPosition().x,this.getPosition().y - enemyPlaneSpeed));
            if(this.getPosition().x < 0 || this.getPosition().x > 360 - 5/2 || this.getPosition().y < 0){
                gameLayer.removeChild(this);
                enemyPlaneList.splice(this,1);
            }

            var dirX = this.getPosition().x - plane.getPosition().x;
            var dirY = this.getPosition().y - plane.getPosition().y;
            if(!gameOver && gameBegin && (dirX * dirX + dirY * dirY) < 1600){
                gameOver = true;
                gameBegin = false;
                CustomerFunction.showGameOver();
                //gameLayer.removeChild(plane);
                enemyPlaneList.length = 0;

            }
        },0,null,0);
        gameLayer.addChild(enemyPlane);
    },

    initScoreLabel:function(){
        scoreCom = cc.LabelTTF.create("0","Georgia-Bold");
        scoreCom.setFontName("Georgia-Bold");
        scoreCom.setFontSize(44);
        scoreCom.setPosition(cc.p(170, 450));
        scoreCom.setColor(cc.c3b(117, 76, 36));
        gameLayer.addChild(scoreCom);
    },

    initMenu:function(){
        var menuLabel = cc.LabelTTF.create("start");
        menuLabel.setFontSize(40);
        menuLabel.setColor(cc.c3b(117, 76, 36));
        var menuItem = cc.MenuItemLabel.create(menuLabel,this.menuSelected);
        menu = cc.Menu.create(menuItem);
        gameLayer.addChild(menu);
    },

    menuSelected:function(e){
        cc.log('menu: '+ e.getLabel().getString() +  ' selected');
        gameBegin = true;
        plane.registerTouchAble(plane);
        gameLayer.removeChild(menu);
    }

});

var CustomerFunction = {
    maintain:function( hitPlane, hitBullet){
        cc.log('before:' + score);
        if(hitPlane.hp - hitBullet.damage <= 0)
        {
            cc.log('prang');
            score += hitPlane.score;
            gameLayer.removeChild(hitPlane);
            enemyPlaneList.splice(hitPlane,1);
        }else{
            hitPlane.setHp(hitBullet.damage);
        }
        cc.log('after:' + score);
        scoreCom.setString(score.toString());
    },

    showGameOver:function(){
        cc.log('game over');

        gameOverLabel = cc.LabelTTF.create("Game over.\nYour score is : " + score.toString() ,"Georgia-Bold");
        gameOverLabel.setFontSize(30);
        gameOverLabel.setPosition(cc.p(150,240));
        gameOverLabel.setColor(cc.c3b(117, 76, 36));
        gameLayer.addChild(gameOverLabel);
        plane.registerTouchDisable(plane);
    }
};