AFRAME.registerComponent('set-active', {
  
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      var active = false;
      var thumbstickReset = false;
      var el = this.el

      /*
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
          
        }
        if(thumbstickReset && evt.detail.x > -0.95 && evt.detail.x < 0.95 && evt.detail.y > -0.95 && evt.detail.y < 0.95){
          thumbstickReset = false;
          console.log("Reset")
        }
      });
      */
     el.addEventListener('grab-start', function (evt) {
      console.log("grabbed obj")
      console.log(evt)
      grabbedObject = el;
      console.log(grabbedObject)
    });
    el.addEventListener('grab-end', function (evt) {
      console.log("remove obj")
      if(document.getElementById("materialMenuContainer")){6
        lhand = document.getElementById("lhand")
        lhand.setAttribute("blink-controls","button: trigger;")
        var state = this.sceneEl.getAttribute('gamestate');
        document.getElementById("materialMenuContainer").remove();
        state.materialMenuActive=false
      }

      el.removeAttribute("dynamic-body")
      el.setAttribute("dynamic-body","")
      grabbedObject=null;

    });

    } 
    

    
    
  });
  