//1,37,50,75=frame, 

//30=bottomtv,31,73,81=tv,8,69=shelftoptv

//3,12,6,7,38,43,57,62,64,77,82,87,101,104=lcouch, 
//9,15,19,22,24,32,39,65,74,90,93,96,97,111=rcouch, 

//2,10,28,47,99,106=rtable, 
//16,36,68,78,84,95=ltable,

//4,112,11,14,49,52,71,103=bathroom, 


//27=backwallbed,46=door,26,41,100=bathroomwall,58=allwalls
//67=floor

//13,40=lamptop,53,70,85,88=lampstand,
//51=bowl,18=tableunderbowl

//89=mirrortopbed,94,108=bed,23,29=pillow, 


//25,35,42,44,45,59,60,79,80,86,102,105,110=chair2, 
//5,17,20,21,33,34,48,56,61,76,91,92,109=chair1,


//54=ldrawer,55=mdrawer,83=rdrawer
//0,63=mats,66=desk,72,98,107=backframes


//total of 113 meshes


var Demo = function(canvas) {
    this.engine = new BABYLON.Engine(canvas, true);
    var _this = this;
    
    //resize window
    window.addEventListener("resize", function() {
        _this.engine.resize();
    });

    //load scene
    BABYLON.SceneLoader.Load("", "assets/js/babylonjs/room.babylon", 
        this.engine, function (scene) {
            _this.scene = scene;
            _this.initScene();

            scene.executeWhenReady(function() {
                _this.engine.runRenderLoop(function() {


                    _this.scene.render();
                });
            });
        });
};

Demo.prototype.initScene = function() {

    //camera attach to canvas
    var freeCamera = new BABYLON.FreeCamera("fCamera", 
        new BABYLON.Vector3(20,50,1), this.scene);

    this.scene.activeCamera = freeCamera;

    this.scene.activeCamera.attachControl(this.engine.getRenderingCanvas());

    this.initCollision();
}

Demo.prototype.initCollision = function() {
    const numberOfMeshes = 113;

    this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    this.scene.collisionsEnabled = true;

    var cam = this.scene.activeCamera;
    cam.applyGravity = true;
    cam.ellipsoid = new BABYLON.Vector3(5, 30, 5);
    cam.checkCollisions = true;

    for(var i = 0; i < numberOfMeshes; i++) {
        var mesh = this.scene.meshes[i];
        mesh.checkCollisions = true;
    }

    //getting ground
    //var floor = this.scene.meshes[67];
    //floor.checkCollisions = true;

    

    this.scene.meshes.forEach(function(mesh) {
        if (mesh.name.indexOf("collider") != -1) {
            mesh.isVisible = false;
        }
    });
};