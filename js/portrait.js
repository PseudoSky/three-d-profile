// portrait.js
//
// contains the code to set up and animate your 3d portrait

// keep some globals around for convenience
// (e.g., so you can open the web console and tweak stuff)
var thePortrait = null;
var rotatorNode = null;
var x_deg = -400;
var y_deg = 0;
var z_deg = 0;
var toggle=false;
// this function sets up the portrait: edit it to load your portrait and
// position it so it is visible to the camera
function initPortrait(scene, renderer) {

  // first, set up some lights
  var ambient = new THREE.AmbientLight( 0x303030 );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0x606040 );
  directionalLight.position.set( 0, 0.2, 1 );
  scene.add( directionalLight );

  var directionalLight2 = new THREE.DirectionalLight( 0x404060 );
  directionalLight2.position.set( 0, -0.2, 1 );
  scene.add( directionalLight2 );

  // create an empty node that we can rotate according to the mouse position
  rotatorNode = new THREE.Object3D();
  scene.add( rotatorNode );

  // create a loading manager and have it print out whenever it loads an item
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var onProgress = function ( xhr ) {
    // don't do anything with progress reports
  };

  var onError = function ( xhr ) {
    console.log("Loading error: " + xhr);
  };

  // load a texture
  var texture = new THREE.Texture();

  // var texloader = new THREE.ImageLoader( manager );
  // texloader.load( 'meshes/me/mesh/tex_2.jpg' , function ( image ) {
  //   // 'textures/cloud.png'
  // } );
  texture.image = image_tex;
  texture.needsUpdate = true;

  // create a basic lambertian material with our texture
  var material = new THREE.MeshLambertMaterial({map: texture});

  // load obj model
  var objloader = new THREE.OBJLoader( manager );
  objloader.loadString( wrapped_obj, material, function ( object ) {

    // this is a good spot to apply what transforms you need to the model
    object.rotation.set(0.0, 0.0, 0.0, 'YXZ');
    object.scale.set(.3, .3, .3);
    object.position.set(0.0, -0.5, 0.0);

    // make sure to actually add it to the scene or it won't show up!
    rotatorNode.add( object );

    // set the global se we can easily access the portrait from the console
    thePortrait = object;

  }, onProgress, onError );

}


// this function will get called every frame, with dt being how much
// time (in s) has passed since the last frame
// cursorX and cursorY indicate the relative position of the mouse cursor
// to the viewing window (so you can make the portrait look at the mouse)
function animatePortrait(dt, cursorX, cursorY) {

  // make the portrait tilt towards the mouse cursor
  // (feel free to replace this with something else!)
  x_deg -= .027;//+Math.round(Math.random()*3)*.4;
  // y_deg += .1;
  // console.log(toggle,z_deg%50,.5/(50-z_deg%50));
  if(z_deg%5==0) {
    y_deg+=.01;
  }
  if(toggle){
    x_deg=x_deg-.005/(50-z_deg%50);
  }else{
    x_deg=x_deg+.005/(z_deg%50+1);
  }
  if(z_deg%50==49) toggle=!toggle;
  z_deg += 1;
  // if(z_deg%8==1)y_deg=y_deg*1.2;
  // if(z_deg%8==2)x_deg=x_deg/1.2;
  // if(z_deg%8==3)y_deg=y_deg/1.2;

  // console.log('Z ',z_deg%8);
  var x =  x_deg;
  var y =  y_deg;

  rotatorNode.rotation.set(y, x, 0, 'YXZ');
}

// helper function to non-linearly map an offset in pixels into radians
function pixelToRadians(pixval) {
  var scalefactor = 0.005;
  return Math.tanh(pixval * scalefactor);
}