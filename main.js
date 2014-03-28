/**
 * Created by ParisTao on 14-3-19.
 */
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config["COCOS2D_DEBUG"];
        cc.initDebugSetting();
        cc.setup(this.config["tag"]);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support WebGL");
            return false;
        }

        cc.EGLView.getInstance().resizeWithBrowserSize(true);
        cc.EGLView.getInstance().setDesignResolutionSize(360, 480, cc.RESOLUTION_POLICY.SHOW_ALL);
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        cc.LoaderScene.preload(g_resources, function () {
            director.replaceScene(new this.startScene());
        }, this);

        return true;
    }
});
var megaPlaneApp = new cocos2dApp(GameScene);