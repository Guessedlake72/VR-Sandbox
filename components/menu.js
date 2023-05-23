AFRAME.registerComponent('menu', {
    //    <a-entity gltf-model="#room" scale=".4 .4 .4" position="0 .7y 0"></a-entity>

    // Init lifecycle method fires upon initialization of component.
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      const grid = [[1,1], [1,2],[1,3], [1,4],[2,1], [2,2],[2,3], [2,4],[3,1], [3,2],[3,3], [3,4],[4,1],[4,2],[4,3],[4,4]]
      var active = false;
      var selected = [1,1];
      var thumbstickReset = false;
      this.el.addEventListener('thumbstickmoved', function(evt) {
        if(active && !thumbstickReset){
          if(evt.detail.x < -0.95 && selected[0]!=1){
            selected[0] = selected[0]-1;
          }else if(evt.detail.x > 0.95 && selected[0]!=4){
            selected[0] = selected[0]+1;
          }else if(evt.detail.y < -0.95 && selected[1]!=4){
            selected[1] = selected[1]+1;
          }else if(evt.detail.y > 0.95 && selected[1]!=1){
            selected[1] = selected[1]-1;
          }
          
          
          if(document.getElementById("selectionbox")){
            document.getElementById("selectionbox").remove();
          }
          var state = scene.getAttribute('gamestate');
          let prevSelectedItem = document.getElementById("menuitem_"+state.active);
          prevSelectedItem.setAttribute("material", "color:red");
          var count = -1;
          for(let i =0; i<grid.length; i++){
            if(grid[i][0] == selected[0] && grid[i][1] == selected[1]){
              count = i;
            }
          }
          console.log(count)
          state.active = count;
          let selectedItem = document.getElementById("menuitem_"+count);
          selectedItem.setAttribute("material", "color:green");


          thumbstickReset = true;
        }
        if(thumbstickReset && evt.detail.x > -0.95 && evt.detail.x < 0.95 && evt.detail.y > -0.95 && evt.detail.y < 0.95){
          thumbstickReset = false;
          console.log("Reset")
        }
      })

      window.addEventListener('keydown', function(e) {
        if(active){
        if(e.code == "ArrowLeft" && selected[0]!=1){
          selected[0] = selected[0]-1;
        }else if(e.code == "ArrowRight" && selected[0]!=4){
          selected[0] = selected[0]+1;
        }else if(e.code == "ArrowUp" && selected[1]!=4){
          selected[1] = selected[1]+1;
        }else if(e.code == "ArrowDown" && selected[1]!=1){
          selected[1] = selected[1]-1;
        }
        
        
        if(document.getElementById("selectionbox")){
          document.getElementById("selectionbox").remove();
        }
        var selectionbox = document.createElement("a-box");
        selectionbox.id = "selectionbox"
        selectionbox.setAttribute("material","color:green; transparent: true; opacity: 0.3");
        let menuContainer = document.getElementById("menucontainer");
        var pos = menuContainer.getAttribute('position');
        selectionbox.setAttribute("position",{ x: pos['x']+selected[0]*3, y: (pos['y']+selected[1]*3)-3.5, z: pos['z']*3 });
        menuContainer.appendChild(selectionbox);
        var count = -1;
        for(let i =0; i<grid.length; i++){
          if(grid[i][0] == selected[0] && grid[i][1] == selected[1]){
            count = i;
          }
        }
        console.log(count)
        state.active = count;
      }
      })

      this.el.addEventListener('buttondown', function(evt) {
        if(evt.detail.hasOwnProperty("id") && evt.detail.id == 5){
          if(!active){
          active = true;
            var scene = document.querySelector('#scene');
            var state = scene.getAttribute('gamestate');
            var camera = document.querySelector('#camera');
            var menuContainer = document.createElement("a-entity");
            var menu = document.createElement("a-entity");
            menu.setAttribute("geometry",{primitive: "plane",
                height: 16,
                width: 16});
            menu.setAttribute("material",{shader: "flat"});
            menu.setAttribute("position",{ x: 8, y: 8, z: -.2 });
            console.log("PRESED")
            menuContainer.appendChild(menu)
            var primitives = state.primitives;
            for (let i = 0; i < primitives.length; i++) {
              var item = document.createElement(primitives[i]);
              var gridlocation = grid[i]
              item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
              item.setAttribute("material", "color:red");
              if(state.active == i){
                item.setAttribute("material", "color:green");
              }
              item.id = "menuitem_"+i;
              menuContainer.appendChild(item);
            }
            
            menuContainer.setAttribute("position",{ x: camera.getAttribute('position')['x'], y: camera.getAttribute('position')['y'], z: camera.getAttribute('position')['z']-2 });
            menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
            menuContainer.id = "menucontainer";
            scene.appendChild(menuContainer);
          }
            else{
              active = false
              let menuContainer = document.getElementById("menucontainer");
              menuContainer.remove();
            }
        }
      });
      window.addEventListener('keydown', function(e) {
        if(e.code == "KeyE"){
            if(!active){
            active = true;
            var scene = document.querySelector('#scene');
            var state = scene.getAttribute('gamestate');
            var camera = document.querySelector('#camera');
            var menuContainer = document.createElement("a-entity");
            var menu = document.createElement("a-entity");
            menu.setAttribute("geometry",{primitive: "plane",
                height: 16,
                width: 16});
            menu.setAttribute("material",{shader: "flat"});
            menu.setAttribute("position",{ x: 8, y: 8, z: 0 });
            console.log("PRESED")
            menuContainer.appendChild(menu)
            var primitives = state.primitives;
            for (let i = 0; i < primitives.length; i++) {
              var item = document.createElement(primitives[i]);
              var gridlocation = grid[i]
              item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
              item.setAttribute("material", "color:red");
              if(state.active == i){
                item.setAttribute("material", "color:green");
              }
              menuContainer.appendChild(item);
            }
            
            menuContainer.setAttribute("position",{ x: camera.getAttribute('position')['x'], y: camera.getAttribute('position')['y'], z: camera.getAttribute('position')['z']-2 });
            menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
            menuContainer.id = "menucontainer";
            scene.appendChild(menuContainer);
          }
            else{
              active = false
              let menuContainer = document.getElementById("menucontainer");
              menuContainer.remove();
            }
      }
    });
    
    } 
    
  });
  