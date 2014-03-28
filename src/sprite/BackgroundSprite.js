/**
 * Created by ParisTao on 14-3-20.
 */
var BackgroudSprite = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res_background);
        this.setPosition(new cc.p(0,0));
        this.setAnchorPoint(new cc.p(0,0));
    }
});