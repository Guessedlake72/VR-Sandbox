AFRAME.registerComponent('menu', {
    //    <a-entity gltf-model="#room" scale=".4 .4 .4" position="0 .7y 0"></a-entity>

    // Init lifecycle method fires upon initialization of component.
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      const primitives = ["a-box","a-sphere","a-cylinder","a-triangle","a-torus","a-cone"]
      const grid = [[1,1], [1,2],[1,3], [1,4],[2,1], [2,2],[2,3], [2,4],[3,1], [3,2],[3,3], [3,4]]
      window.addEventListener('keydown', function(e) {
        if(e.code == "KeyE"){
            var scene = document.querySelector('#scene');
            var state = scene.getAttribute('gamestate');
            var menuContainer = document.createElement("a-entity");
            var menu = document.createElement("a-entity");
            menu.setAttribute("geometry",{primitive: "plane",
                height: 16,
                width: 16});
            menu.setAttribute("material",{shader: "flat"});
            menu.setAttribute("position",{ x: 3, y: 3, z: 0 });

            console.log("PRESED")
            menuContainer.appendChild(menu)
            for (let i = 0; i < primitives.length; i++) {
              var item = document.createElement(primitives[i]);
              var gridlocation = grid[i]
              item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
              item.setAttribute("material", "color:red");
              menuContainer.appendChild(item)
            }
            menuContainer.setAttribute("position",{ x: -3, y: 1, z: 0 });
            menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );

            scene.appendChild(menuContainer);
        }
      });
   
    } 
    
  });
  