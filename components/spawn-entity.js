AFRAME.registerComponent('spawn-entity', {
  
  // Accept value for color or default to blue.
  schema: {
    type: {default: 'image'},
    src: {default: '/assets/readme/intro.png'}
  },
  
  // Init lifecycle method fires upon initialization of component.
  init: function() {
    
    // Allows the use of "self" as "this" within the listener without binding.
    var self = this;
    
    // Add the click listener.
    this.el.addEventListener('click', function(e) {
      
      // Log intersection points for our reference.
      var camera = document.querySelector('#camera');
      // Create the box element (not yet added).
      var piece = document.createElement('a-entity');
      var frame = document.createElement('a-gltf-model');
        frame.setAttribute("src","../assets/scene.gltf");
        frame.setAttribute("position",{ x: 1, y: 0, z: -.06 });
        frame.setAttribute("scale", { x: 0.01, y: 0.01, z: 0.01 } );
        frame.setAttribute("rotation", { x: 0, y: 270, z: 0 } );


      var image = document.createElement('a-image');
      image.setAttribute("src","https://browserstack.wpenginepowered.com/wp-content/uploads/2021/03/resp-design-mode-700x550.png")

      
      piece.appendChild(frame);
      piece.appendChild(image);

      piece.setAttribute('position', e.detail.intersection.point);
      
      var x = e.detail.intersection.point['x']-camera.getAttribute('position')['x'];
      var z = ( e.detail.intersection.point['z']-camera.getAttribute('position')['z']);
      var angle = (180*Math.atan(z/x)/3.14)
      if(angle<0){
        angle = -angle-90;
      } else {
        angle = -angle+90;
      }
      if(z>0){
        angle= 180+angle;
      }
      
      console.log(e.detail.intersection.point);
      console.log(camera.getAttribute('position'));

      piece.setAttribute("rotation", { x: 0, y: angle, z: 0 } );
     // piece.setAttribute("look-at","[camera]");
      //piece.setAttribute("rotation", { x: 0, z: 0 } );

      // Append the box element to the scene.
      self.el.sceneEl.appendChild(piece);
      
    });
    
  }
});
