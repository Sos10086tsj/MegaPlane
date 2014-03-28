/**
 * Created by ParisTao on 14-3-20.
 */
var PlaneSprite = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res_plane);
        this.setPosition(new cc.p(150,0));
        this.setAnchorPoint(new cc.p(0,0));
        //cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
        //cc.registerTargetedDelegate(0,true,this);
    },

    registerTouchAble:function(plane){
        cc.registerTargetedDelegate(0,true,plane);
    },

    registerTouchDisable:function(plane){
        cc.unregisterTouchDelegate(plane);
    },

    containsTouchLocation:function(touch){
        var touchPoint = touch.getLocation();
        var validRect = cc.rect(0,0,this.getContentSize().width,this.getContentSize().height);
        validRect.x += this.getPosition().x;
        validRect.y += this.getPosition().y;
        return cc.rectContainsPoint(validRect,touchPoint);
    },

    onTouchBegan:function(touch,event){
        if(!this.containsTouchLocation(touch)){
            return false;
        }
        //cc.log(' on touch began');
        return true;
    },

    onTouchMoved:function(touch,event){
        //cc.log(' on touch move');
        var touchPoint = touch.getLocation();
        if(touchPoint.x > cc.Director.getInstance()._winSizeInPoints.width - 60){
            touchPoint.x = cc.Director.getInstance()._winSizeInPoints.width - 60;
        }

        this.setPositionX(touchPoint.x)
    }
});