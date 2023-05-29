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
      var activePage = 1;
      const pageTitles = ["Primitives","Images1","Images2","Models"]

      this.el.addEventListener('thumbstickmoved', function(evt) {
        if(active && !thumbstickReset){
          if(evt.detail.x < -0.95 && selected[0]!=1){
            selected[0] = selected[0]-1;
          }else if(evt.detail.x < -0.95 && selected[0]==1){
            activePage--;
            selected[0] = 4;
            toggleMenu()
            toggleMenu()
          }else if(evt.detail.x > 0.95 && selected[0]!=4){
            selected[0] = selected[0]+1;
          }else if(evt.detail.x > 0.95 && selected[0]==4){
            activePage++;
            selected[0] = 1;
            toggleMenu()
            toggleMenu()
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
          //prevSelectedItem.setAttribute("material", "color:red");
          var count = -1;
          for(let i =0; i<grid.length; i++){
            if(grid[i][0] == selected[0] && grid[i][1] == selected[1]){
              count = i;
            }
          }
          console.log(count)
          state.active = count;
          let selectedItem = document.getElementById("menuitem_"+count);
          //selectedItem.setAttribute("material", "color:green");
          var selectionBox = document.createElement("a-box");
          selectionBox.setAttribute("material", "transparent: true; opacity:0.5; color:green")
          selectionBox.setAttribute("scale", {x:2, y:2, z:2})
          selectionBox.id="selectionbox";
          selectionBox.setAttribute("position", {x:selected[0]*3, y:selected[1]*3, z:0})
          menuContainer = document.getElementById("menucontainer")
          menuContainer.appendChild(selectionBox);
          thumbstickReset = true;
          hoverActive(state.primitives[state.active], "color:green");
        }
        if(thumbstickReset && evt.detail.x > -0.95 && evt.detail.x < 0.95 && evt.detail.y > -0.95 && evt.detail.y < 0.95){
          thumbstickReset = false;
          console.log("Reset")
        }
      });

      window.addEventListener('keydown', function(e) {
        if(active){
        if(e.code == "ArrowLeft" && selected[0]!=1){
          selected[0] = selected[0]-1;
        }else if(e.code == "ArrowLeft" && selected[0]==1){
          activePage--;
          selected[0] = 4;
          toggleMenu()
          toggleMenu()
        }else if(e.code == "ArrowRight" && selected[0]!=4){
          selected[0] = selected[0]+1;
        }else if(e.code == "ArrowRight" && selected[0]==4){
          activePage++;
          selected[0] = 1;
          toggleMenu()
          toggleMenu()
        }else if(e.code == "ArrowUp" && selected[1]!=4){
          selected[1] = selected[1]+1;
        }else if(e.code == "ArrowDown" && selected[1]!=1){
          selected[1] = selected[1]-1;
        }
        console.log(activePage)

          if(document.getElementById("selectionbox")){
            document.getElementById("selectionbox").remove();
          }
          var state = scene.getAttribute('gamestate');
          let prevSelectedItem = document.getElementById("menuitem_"+state.active);
          //prevSelectedItem.setAttribute("material", "color:red");
          var count = -1;
          for(let i =0; i<grid.length; i++){
            if(grid[i][0] == selected[0] && grid[i][1] == selected[1]){
              count = i;
            }
          }
          console.log(count)
          state.active = count;
          let selectedItem = document.getElementById("menuitem_"+count);
          //selectedItem.setAttribute("material", "color:green");
          var selectionBox = document.createElement("a-box");
          selectionBox.setAttribute("material", "transparent: true; opacity:0.5; color:green")
          selectionBox.setAttribute("scale", {x:2, y:2, z:2})
          selectionBox.id="selectionbox";
          selectionBox.setAttribute("position", {x:selected[0]*3, y:selected[1]*3, z:0})
          menuContainer = document.getElementById("menucontainer")
          menuContainer.appendChild(selectionBox);
          thumbstickReset = true;
          hoverActive(state.primitives[state.active], "color:green");
      }
      }
      );


      this.el.addEventListener('bbuttondown', function(evt) {
          toggleMenu() 
          var camera = document.querySelector('#camera');
          camera.setAttribute("position",{x:50, y:50, z:50})
      });

      window.addEventListener('keydown', function(e) {
        if(e.code == "KeyE"){
          toggleMenu()
          camera.setAttribute("position",{x:50, y:50, z:50})

      }
    });

    function toggleMenu(){
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
          var title = document.createElement("a-entity");
          title.setAttribute("material","color: red")
          title.setAttribute("text", "value: "+ pageTitles[activePage-1]+"; color: red");
          title.setAttribute("scale", {x:50, y:50, z:50});
          title.setAttribute("position", {x:28, y:14, z:2});
          menuContainer.appendChild(title);
          if(activePage == 1){
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
          }else if (activePage == 2){
            var images = state.customImages;
            images1 = [];
            images2 = [];
            if(images.length >=16){
              images1=images.slice(0,15);
              images2=images.slice(16,images.length);
            } else {
              images1 = images;
            }
            for (let i = 0; i < images1.length; i++) {
              var item = document.createElement("a-image");
              var gridlocation = grid[i]
              item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
              item.setAttribute("src", images1[i][0]);
              item.setAttribute("width", 3);
              item.setAttribute("height",3);
              item.id = "menuitem_"+i;
              menuContainer.appendChild(item);
              } 
          }else if (activePage == 4){
            var models = state.customModels;
            models1 = [];
            models2 = [];
            if(models.length >=16){
              models1=models.slice(0,15);
              models2=models.slice(16,models.length);
            } else {
              models1 = models;
            }
            for (let i = 0; i < models1.length; i++) {
              var item = document.createElement("a-entity");
              var gridlocation = grid[i]
              item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
              item.setAttribute("gltf-model", models1[i][0]);
              item.setAttribute("scale", {x:models1[i][2]/100, y:models1[i][2]/100, z:models1[i][2]/100});

              item.id = "menuitem_"+i;
              menuContainer.appendChild(item);
              } 
          }
          menuContainer.setAttribute("position",{ x: -1, y: -1, z: -2 });
          //menuContainer.setAttribute("rotation",{ x: camera.object3D.rotation['_x']*57, y: camera.object3D.rotation['_y']*57, z: camera.object3D.rotation['_z']*57 });
          menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
          menuContainer.id = "menucontainer";
          camera.appendChild(menuContainer);
          
        }
          else{
            active = false
            let menuContainer = document.getElementById("menucontainer");
            menuContainer.remove();
          }
      

    }

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

    } 
    

    
    
  });
  