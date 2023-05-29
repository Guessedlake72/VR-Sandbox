AFRAME.registerComponent('strech', {
  
    init: function() {
      // Allows the use of "self" as "this" within the listener without binding.
      var self = this;
      var thumbstickReset = false;
      var el = this.el
      /*
      this.el.addEventListener('thumbstickmoved', function(evt) {
        if(!thumbstickReset){
          currentScale = grabbedObject.getAttribute('scale')
          if(evt.detail.x < -0.95  && currentScale['x']>0.2){
            grabbedObject.setAttribute("scale", { x: currentScale['x']-.1, y:currentScale['y'], z: currentScale['z'] } );

          }else if(evt.detail.x > 0.95){
            grabbedObject.setAttribute("scale", { x: currentScale['x']+.1, y:currentScale['y'], z: currentScale['z'] } );

          }else if(evt.detail.y > 0.95 && currentScale['z']>0.2){
            grabbedObject.setAttribute("scale", { x: currentScale['x'], y:currentScale['y'], z: currentScale['z']-.1 } );
          }else if(evt.detail.y < -0.95){
            grabbedObject.setAttribute("scale", { x: currentScale['x'], y:currentScale['y'], z: currentScale['z']+.1 } );
          }
          thumbstickReset = true;
          
        }
        if(thumbstickReset && evt.detail.x > -0.95 && evt.detail.x < 0.95 && evt.detail.y > -0.95 && evt.detail.y < 0.95){
          thumbstickReset = false;
          console.log("Reset")
        }
      });
      */


    } 
    

    
    
  });
  