/**
 * Created by ParisTao on 14-3-20.
 */

var PlaneBulletSprite = cc.Sprite.extend({
    damage:50,
    ctor:function(){
        this._super();
        this.initWithFile(res_planebullet);
    }
});