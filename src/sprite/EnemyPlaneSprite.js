/**
 * Created by ParisTao on 14-3-20.
 */
var EnemyPlaneSprite = cc.Sprite.extend({
    score : 10,
    hp:100,
    ctor:function(){
        this._super();
        this.initWithFile(res_enemyplane);
    },

    setHp:function(damage){
        this.hp -= damage;
    }
});