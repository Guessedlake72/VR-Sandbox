AFRAME.registerComponent('spawn-entity', {
  
  schema: {
    object:{type: 'string', default: 'box'}
  },
  
  
  // Init lifecycle method fires upon initialization of component.
  init: function() {

    //const materials = ["color: red","color: green","color: blue","transparent: true"]
    // Allows the use of "self" as "this" within the listener without binding.
    var self = this;
    var dragging = false;
    var state = scene.getAttribute('gamestate');
    var hovering = document.createElement('a-entity');
    hovering.id = "hovering";
    var box =  document.createElement('a-box');
    box.setAttribute("position",{ x: 0.0, y: 0, z: -0.1 });
    box.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
    box.setAttribute("material","transparent: true; opacity: 0");
    hovering.appendChild(box)
    var rhand = document.querySelector('#rhand');
    rhand.appendChild(hovering);
    var primitives = state.primitives;

    window.addEventListener('keydown', function(e) {
      if(e.code == "Period"){
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        //scene.emit('incrementActive');
        state.active = state.active+1;
        currActive = state.active;
        currMaterial = state.activeMaterial;
        console.log(state.active);
        hoverActive(primitives[currActive],materials[currMaterial]);
      }

      if(e.code == "Comma"){
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        //scene.emit('decrementActive');
        state.active = state.active-1;
        currActive = state.active;
        currMaterial = state.activeMaterial;

        console.log(state.active);
        hoverActive(primitives[currActive],materials[currMaterial]);
      }

      if(e.code == "KeyM"){
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        //scene.emit('incrementActive');
        state.activeMaterial = state.activeMaterial+1;
        currActive = state.active;
        currMaterial = state.activeMaterial;
        console.log(state.activeMaterial);
        hoverActive(primitives[currActive],materials[currMaterial]);
      }

      if(e.code == "KeyN"){
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        //scene.emit('decrementActive');
        state.activeMaterial = state.activeMaterial-1;
        currActive = state.active;
        currMaterial = state.activeMaterial;
        console.log(state.activeMaterial);
        hoverActive(primitives[currActive],materials[currMaterial]);
      }

      /*
      if(e.code == "Slash"){
        var camera = document.querySelector('#camera');
        scene = document.querySelector('#scene');
        scene.emit('changeActive', 'frame');
        camera.removeChild(camera.lastChild);
        var frame = document.createElement('a-gltf-model');
        frame.setAttribute("src","https://guessedlake72.github.io/VR-Sandbox/assets/scene.gltf");
        frame.setAttribute("position",{ x: 4, y: 0, z: -2 });
        frame.setAttribute("scale", { x: 0.01, y: 0.01, z: 0.01 } );
        frame.setAttribute("rotation", { x: 0, y: 270, z: 0 } );
        camera.appendChild(frame);
      }

      if(e.code == "Space"){
        loadState();
      }
            */
    });
    /*
    this.el.addEventListener('raycaster-intersection', function(evt) {
      console.log(evt.detail)
      console.log(evt)

    })
    */
    this.el.addEventListener('buttondown', function(evt) {
      if(evt.detail.hasOwnProperty("id")  && evt.detail.id == 4){
        var state = this.sceneEl.getAttribute('gamestate');
        var rhand = document.querySelector('#rhand');
        var pos = globalActiveObject.object3D.getWorldPosition(new THREE.Vector3())
        var quaternion = globalActiveObject.object3D.getWorldQuaternion(new THREE.Quaternion())
        let rot = new THREE.Euler();
        rot.setFromQuaternion(quaternion);
        spawnFromActive(pos,rot);
      }

 
    })
    function spawnFromActive(pos,rot){
      var scene = document.querySelector('#scene');
      var state = scene.getAttribute('gamestate');
      var piece = document.createElement('a-entity');
      
      switch(state.activePage){
        case 1:
          var bounding = document.createElement('a-box')
          bounding.setAttribute("material", "transparent: true; opacity:0.0;")
          var object = document.createElement(primitives[state.active])
          object.setAttribute("material",state.materials[state.activeMaterial]);
          bounding.appendChild(object);
          piece.appendChild(bounding);
          piece.classList.add("primitive");
          break;
        case 2:
          var bounding = document.createElement('a-box')
          bounding.setAttribute("material", "transparent: true; opacity:0.0")
          var object = document.createElement('a-entity')
          object.setAttribute("gltf-model", state.builtIn[state.active][0]);
          console.log(object);
          var scale = state.builtIn[state.active][1]
          object.setAttribute("position", {x:0, y:-.4, z:0});
          object.setAttribute("scale", {x:scale/100, y:scale/100, z:scale/100});
          bounding.appendChild(object);
          piece.appendChild(bounding);
          piece.classList.add("builtIn")
          break;
        case 3:
          var object = document.createElement('a-image')
          console.log(state.customImages1)
          object.setAttribute("src",state.customImages1[state.active][0]);
          object.setAttribute("width", 3);
          object.setAttribute("height",3);
          object.setAttribute("title",state.customImages1[state.active][2]);
          object.setAttribute("desc",state.customImages1[state.active][3]);
          piece.appendChild(object);
          piece.classList.add("customImage")
          break;
        case 4:
          var object = document.createElement('a-image')
          object.setAttribute("src",state.customImages2[state.active][0]);
          object.setAttribute("width", 3);
          object.setAttribute("height",3);
          piece.appendChild(object);
          piece.classList.add("customImage")
          break;
        case 5:
          var bounding = document.createElement('a-box')
          bounding.setAttribute("material", "transparent: true; opacity:0.0")
          var object = document.createElement('a-entity')
          object.setAttribute("gltf-model", state.customModels1[state.active][0]);
          console.log(object);
          var scale = state.customModels1[state.active][1]
          object.setAttribute("position", {x:0, y:-.4, z:0});
          object.setAttribute("scale", {x:scale/100, y:scale/100, z:scale/100});
          bounding.setAttribute("title",state.customModels1[state.active][2]);
          bounding.setAttribute("desc",state.customModels1[state.active][3]);
          bounding.appendChild(object);
          piece.appendChild(bounding);
          piece.classList.add("customModel")
          break;
      }

      piece.setAttribute('position',  { x: pos['x'], y: pos['y'], z: pos['z'] });
      piece.object3D.rotation.set(rot['x'],rot['y'],rot['z']);
      piece.setAttribute('scale', { x: 0.1, y: 0.1, z: 0.1 });
      piece.classList.add("physicsBody")
      piece.setAttribute("mixin","physicsBody")
      scene.appendChild(piece);

    }

    function spawnEntity(obj,pos,scale,rot,material){
      var scene = document.querySelector('#scene');
      var state = scene.getAttribute('gamestate');
      var camera = document.querySelector('#camera');
      var piece = document.createElement('a-entity');
      
      var object = document.createElement(obj)
      object.setAttribute("material",material);
      piece.appendChild(object);

      piece.setAttribute('position',  { x: pos[0], y: pos[1], z: pos[2] });
      console.log(rot)
      piece.object3D.rotation.set(rot['x'],rot['y'],rot['z']);
      piece.setAttribute('scale', { x: scale, y: scale, z: scale });
      piece.setAttribute("class","physicsBody")
      piece.setAttribute("mixin","physicsBody")

      //var x = e.detail.intersection.point['x']-camera.getAttribute('position')['x'];
      //var z = ( e.detail.intersection.point['z']-camera.getAttribute('position')['z']);
      //this.sceneEl.emit('addBox', {posx: x, posz: z});
      //this.sceneEl.emit('increment');
      scene.appendChild(piece);

    }
    function loadState () {
      var scene = document.querySelector('#scene');
      var state = scene.getAttribute('gamestate');
      var camera = document.querySelector('#camera');
      var piece = document.createElement('a-entity');
      for (let i = 0; i < state.objs.length; i++) {
        console.log(state.objs[i].split(','));
        var objarr= state.objs[i].split(',');
        position = [objarr[1],objarr[2],objarr[3]];
        spawnEntity(objarr[0],position,0);
        }
      }


      /*
    // Add the click listener.
    this.el.addEventListener('click', function(e) {
      var state = this.sceneEl.getAttribute('gamestate');
      var camera = document.querySelector('#camera');
      var piece = document.createElement('a-entity');
    
      if(state.active == 'frame') {
        var frame = document.createElement('a-gltf-model');
          frame.setAttribute("src","https://guessedlake72.github.io/VR-Sandbox/assets/scene.gltf");
          frame.setAttribute("position",{ x: 1, y: 0, z: -.06 });
          frame.setAttribute("scale", { x: 0.01, y: 0.01, z: 0.01 } );
          frame.setAttribute("rotation", { x: 0, y: 270, z: 0 } );

        var image = document.createElement('a-image');
        image.setAttribute("src","https://browserstack.wpenginepowered.com/wp-content/uploads/2021/03/resp-design-mode-700x550.png")
        image.setAttribute("height","2.1")
        image.setAttribute("width","1.6")
        image.setAttribute("position","0 1.25 0")
        piece.appendChild(frame);
        piece.appendChild(image);

      } else if (state.active == 'box'){
        var box = document.createElement('a-box')
        box.setAttribute("position",{ x: 0, y: 0.5, z: 0 });
        piece.appendChild(box);
      }
      
      console.log(camera.getAttribute('position'));
      var x = e.detail.intersection.point['x']-camera.getAttribute('position')['x'];
      var z = ( e.detail.intersection.point['z']-camera.getAttribute('position')['z']);

      this.sceneEl.emit('addObj', {objname:primitives[state.active], posx: e.detail.intersection.point['x'], posz:e.detail.intersection.point['z'], posy:e.detail.intersection.point['y']});
      var angle = (180*Math.atan(z/x)/3.14)
      if(angle<0){
        angle = -angle-90;
      } else {
        angle = -angle+90;
      }
      if(z>0){
        angle= 180+angle;
      }
      piece.setAttribute("rotation", { x: 0, y: angle, z: 0 } );
      spawnEntity(primitives[state.active],[e.detail.intersection.point['x'],e.detail.intersection.point['y'],e.detail.intersection.point['z']],1,angle,materials[state.activeMaterial]);

     // piece.setAttribute("look-at","[camera]");
      //piece.setAttribute("rotation", { x: 0, z: 0 } );

      // Append the box element to the scene.      
    }
    
    );

   */
  
  } 
  
});
