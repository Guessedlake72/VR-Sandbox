AFRAME.registerComponent('strech', {
  
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      var thumbstickReset = false;
      var el = this.el
      var state = scene.getAttribute('gamestate');
      var selected = [1,1];
      const grid = [[1,1], [1,2],[1,3], [1,4],[2,1], [2,2],[2,3], [2,4],[3,1], [3,2],[3,3], [3,4],[4,1],[4,2],[4,3],[4,4]]

      this.el.addEventListener('thumbstickdown', function(evt) {
          if(!!grabbedObject && (grabbedObject.classList.contains("customImage") || grabbedObject.classList.contains("customModel"))){
            console.log(grabbedObject);
            var bounding = document.createElement('a-box')
            bounding.setAttribute("material", "transparent: true; opacity:0.0")
            var background = document.createElement("a-entity");
            background.setAttribute("geometry",{primitive: "plane",
                height: 3,
                width: 4});
            background.setAttribute("material",{shader: "flat"});
            bounding.appendChild(background);

            var title = document.createElement("a-entity");
            title.setAttribute("text", "value: "+ grabbedObject.lastChild.getAttribute("title")+"; color: black");
            title.setAttribute("scale", {x:5, y:5, z:5});
            title.setAttribute("position", {x:.5, y:1, z:.1});
            bounding.appendChild(title);
            var text = document.createElement("a-entity");
            text.setAttribute("text", "value: "+grabbedObject.lastChild.getAttribute("desc") + "; color: black");
            text.setAttribute("scale", {x:3, y:3, z:3});
            text.setAttribute("position", {x:0, y:0, z:.1});
            bounding.appendChild(text);
            grabbedObject.lastChild.remove()
            grabbedObject.appendChild(bounding);
            grabbedObject.classList.remove("customImage")
            grabbedObject.classList.remove("customModel")   
            grabbedObject.classList.add("customText")
          }
      });

      this.el.addEventListener('thumbstickmoved', function(evt) {
        if(!state.materialMenuActive && !thumbstickReset && !!grabbedObject ){
          currentScale = grabbedObject.getAttribute('scale')
          if(evt.detail.x < -0.95  && currentScale['x']>0.1){
            grabbedObject.setAttribute("scale", { x: currentScale['x']-.1, y:currentScale['y'], z: currentScale['z'] } );
          }else if(evt.detail.x > 0.95){
            grabbedObject.setAttribute("scale", { x: currentScale['x']+.1, y:currentScale['y'], z: currentScale['z'] } );
          }else if(evt.detail.y > 0.95 && currentScale['z']>0.1){
            grabbedObject.setAttribute("scale", { x: currentScale['x'], y:currentScale['y'], z: currentScale['z']-.1 } );
          }else if(evt.detail.y < -0.95){
            grabbedObject.setAttribute("scale", { x: currentScale['x'], y:currentScale['y'], z: currentScale['z']+.1 } );
          }
          thumbstickReset = true;
          
        } else if (state.materialMenuActive && !thumbstickReset && !!grabbedObject){
          if(evt.detail.x < -0.95 && selected[0]!=1){
            selected[0] = selected[0]-1;
          }else if(evt.detail.x > 0.95 && selected[0]!=4){
            selected[0] = selected[0]+1;
          }else if(evt.detail.y < -0.95 && selected[1]!=4){
            selected[1] = selected[1]+1;
          }else if(evt.detail.y > 0.95 && selected[1]!=1){
            selected[1] = selected[1]-1;
          }
          
          if(document.getElementById("materialSelectionBox")){
            document.getElementById("materialSelectionBox").remove();
          }
          //let prevSelectedItem = document.getElementById("menuitem_"+state.active);
          //prevSelectedItem.setAttribute("material", "color:red");
          var count = -1;
          for(let i =0; i<grid.length; i++){
            if(grid[i][0] == selected[0] && grid[i][1] == selected[1]){
              count = i;
            }
          }
          console.log(count)
          state.activeMaterial = count;
          var selectionBox = document.createElement("a-box");
          selectionBox.setAttribute("material", "transparent: true; opacity:0.5; color:green")
          selectionBox.setAttribute("scale", {x:2, y:2, z:2})
          selectionBox.id="materialSelectionBox";
          selectionBox.setAttribute("position", {x:selected[0]*3, y:selected[1]*3, z:0})
          menuContainer = document.getElementById("materialMenuContainer")
          menuContainer.appendChild(selectionBox);
          thumbstickReset = true;
          grabbedObject.lastChild.lastChild.setAttribute("material", state.materials[state.activeMaterial])
          hoverMaterial()
          console.log(grabbedObject);
        }

        if(thumbstickReset && evt.detail.x > -0.95 && evt.detail.x < 0.95 && evt.detail.y > -0.95 && evt.detail.y < 0.95){
          thumbstickReset = false;
          console.log("Reset")
        }
      });

      this.el.addEventListener('ybuttondown', function(evt) {
        toggleMaterialMenu()
    });
      this.el.addEventListener('xbuttondown', function(evt) {
        grabbedObject.setAttribute("class", "test");
        grabbedObject.setAttribute("visible", false)
        grabbedObject.setAttribute("position",{x:999,y:-999,z:999})
    });

    function toggleMaterialMenu(){
      if((!state.materialMenuActive || (!document.getElementById("materialMenuContainer"))) && !!grabbedObject && (state.activePage == 1)){
          lhand = document.getElementById("lhand")
          lhand.setAttribute("blink-controls","button: trigger; snapTurn: false")          
          state.materialMenuActive = true;
          var scene = document.querySelector('#scene');
          var camera = document.querySelector('#camera');
          var menuContainer = document.createElement("a-entity");
          var menu = document.createElement("a-entity");
          menu.setAttribute("geometry",{primitive: "plane",
              height: 16,
              width: 16});
          menu.setAttribute("material",{shader: "flat"});
          menu.setAttribute("position",{ x: 8, y: 8, z: -.2 });
          console.log("PRESED Material Menu")
          menuContainer.appendChild(menu)
          var title = document.createElement("a-entity");
          title.setAttribute("material","color: red")
          title.setAttribute("text", "value: Materials; color: red");
          title.setAttribute("scale", {x:50, y:50, z:50});
          title.setAttribute("position", {x:28, y:14, z:2});
          menuContainer.appendChild(title);

          var selectionBox = document.createElement("a-box");
          selectionBox.setAttribute("material", "transparent: true; opacity:0.5; color:green")
          selectionBox.setAttribute("scale", {x:2, y:2, z:2})
          selectionBox.id="materialSelectionBox";
          selectionBox.setAttribute("position", {x:selected[0]*3, y:selected[1]*3, z:0})
          menuContainer.appendChild(selectionBox);
          var materials = state.materials;
          for (let i = 0; i < materials.length; i++) {
            var item = document.createElement("a-box");
            var gridlocation = grid[i]
            item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
            item.setAttribute("material", state.materials[i]);
            item.id = "materialItem_"+i;
            menuContainer.appendChild(item);
            }
          menuContainer.setAttribute("position",{ x: -1, y: -1, z: -2 });
          menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
          menuContainer.id = "materialMenuContainer";
          camera.appendChild(menuContainer);
          
        }
          else{
            lhand = document.getElementById("lhand")
            lhand.setAttribute("blink-controls","button: trigger;")     
            state.materialMenuActive = false
            let menuContainer = document.getElementById("materialMenuContainer");
            menuContainer.remove();
          }
      

    }   
     function hoverMaterial(){
      globalActiveObject.setAttribute("material", state.materials[state.activeMaterial]);
    }

      


    } 
    

    
    
  });
  