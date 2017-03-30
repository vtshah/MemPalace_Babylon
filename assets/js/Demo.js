var VERSION = 1.0, 
    AUTHOR = "Brian Servia";
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




document.addEventListener("DOMContentLoaded", function() {
    new Demo("demo");
},false);



var Demo = function(canvasId) {
    
    var canvas = document.getElementById(canvasId);
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
            

           // var mesh = scene.meshes[31];
            //mesh.pickable = true;


            scene.executeWhenReady(function() {
                _this.engine.runRenderLoop(function() {


                    _this.scene.render();
                });
            });
        });
};

Demo.prototype.initScene = function() {

    //camera attach to canvas
    var freeCamera = new BABYLON.DeviceOrientationCamera("fCamera", 
        new BABYLON.Vector3(30,50,1), this.scene);

    this.scene.activeCamera = freeCamera;

    this.scene.activeCamera.attachControl(this.engine.getRenderingCanvas());
    var cam = this.scene.activeCamera;
    
    var target = this.scene.meshes[108];
    cam.target = target.position;

    this.initCollision(this.scene);
    

    
  /*

    var localMeshDirection = new BABYLON.Vector3(0,0,-1);
    var localMeshOrigin = cam.position;
    var length;

    var ray = new BABYLON.Ray(localMeshOrigin, localMeshDirection, length);
    var rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(scene);
    

    var tv = scene.meshes[73];
    tv.isPickable = true;
    
    scene.registerBeforeRender(function(){

        //box.rotation.y += .01;

        var hitInfo = ray.intersectsMeshes([tv]);

        if(hitInfo.length){
            console.log(hitInfo);
            //sphere.setEnabled(true);
            //sphere.position.copyFrom(hitInfo[0].pickedPoint);
        }else{
            //sphere.setEnabled(false);
        }

    });*/
    
    this.fur(this.scene);


    
};

Demo.prototype.initCollision = function(scene) {
    const N_MESHES = 113;

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    //scene.collisionsEnabled = true;

    var cam = scene.activeCamera;
    cam.applyGravity = true;
    cam.ellipsoid = new BABYLON.Vector3(5, 25, 5);
    cam.checkCollisions = true;
    //cam.isPickable = false;

    //make everything have a collider
    for(var i = 0; i < N_MESHES; i++) {
        var mesh = scene.meshes[i];
        mesh.checkCollisions = true;
        mesh.isPickable = true;
    }

    

    scene.meshes.forEach(function(mesh) {
        if (mesh.name.indexOf("collider") != -1) {
            mesh.isVisible = false;
        }
    });
};


Demo.prototype.ray = function(camera, scene) {
    //pickable config
    camera.isPickable = false;
    //var tv = scene.meshes[73];
    //tv.isPickable = true;

   // var ray = new BABYLON.Ray();

   






}


Demo.prototype.fur = function(scene) {
    //7,62,87(somewhere inside), [38,57,82,104]llegs
    //[,,,]rleg
    var leftCouch =[3,12,6,7,43,62,64,77,87,101],
    rightCouch = [9,15,19,22,24,32,39,65,74,90,93,96,97,111];

    var furMaterial = new BABYLON.FurMaterial("fur", scene);
    furMaterial.furLength = 4;
    furMaterial.furAngle = 0;
    furMaterial.furColor = new BABYLON.Color3(255, 255, 255);
    furMaterial.diffuseTexture = new BABYLON.Texture("assets/js/fur.jpg", scene);
    furMaterial.furTexture = BABYLON.FurMaterial.GenerateTexture("furTexture", scene);
    furMaterial.furSpacing = 6;
    furMaterial.furDensity = 10;
    furMaterial.furSpeed = 200;
    furMaterial.furGravity = new BABYLON.Vector3(0, -1, 0);


    var bed = scene.meshes[108];
    bed.material = furMaterial;
/*

    for(var i = 0; i < leftCouch.length; i++) {
        var lcouch = scene.meshes[leftCouch[i]];
        lcouch.material = furMaterial;
    }
    */
}