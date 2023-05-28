AFRAME.registerComponent('test', {
    //    <a-entity gltf-model="#room" scale=".4 .4 .4" position="0 .7y 0"></a-entity>

    // Init lifecycle method fires upon initialization of component.
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      const grid = [[1,1], [1,2],[1,3], [1,4],[2,1], [2,2],[2,3], [2,4],[3,1], [3,2],[3,3], [3,4],[4,1],[4,2],[4,3],[4,4]]
      var active = false;
      var selected = [1,1];
      var thumbstickReset = false;

      this.el.addEventListener('grab-start', function(evt) {
        console.log(evt)
      });
      
      this.el.addEventListener('buttondown', function(evt) {
        console.log(evt)
    });



    function hoverActive(obj,material){
      var hovering = document.querySelector('#hovering');
      hovering.removeChild(hovering.lastChild);
      console.log(hovering.children)
      var activeObj = document.createElement(obj);
      //activeObj.setAttribute("position",{ x: 0.75, y: 0, z: -1 });
      activeObj.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
      activeObj.setAttribute("material",material);
      hovering.appendChild(activeObj);
    }

    function spawnHandles(obj,material){
      var hovering = document.querySelector('#hovering');
      var activeObj = hovering.lastChild;
      var xHandle = document.createElement("a-box");
      xHandle.setAttribute("scale", { x: .5, y: 0.1, z: 0.1 } );
      xHandle.setAttribute("material","color:blue");
      xHandle.setAttribute("position",{ x: .5, y: 0, z: 0});
      xHandle.id = "xHandle"
      activeObj.appendChild(xHandle);
    }

    } 
    

    
    
  });
  