/**
 * Created by ParisTao on 14-3-28.
 */
var ScoreSprite = cc.LabelTTF.extend({
    ctor:function(){
        this._super();
        this.create("0","Arial",44);
        this.setPosition(cc.p(170, 450));
        this.setColor(cc.c3b(117, 76, 36));
    },

    score:function(){

    }
})