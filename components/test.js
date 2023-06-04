AFRAME.registerComponent('test', {
    //    <a-entity gltf-model="#room" scale=".4 .4 .4" position="0 .7y 0"></a-entity>

    // Init lifecycle method fires upon initialization of component.
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      this.el.addEventListener('click', function (evt) {
        console.log(evt)
      });

      this.el.addEventListener('raycaster-intersection', function () {
        console.log();
      });

    } 
    

    
    
  });
  