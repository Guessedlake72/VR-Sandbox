AFRAME.registerComponent('save-upload', {
    init: function() {

        this.el.addEventListener('thumbstickdown', function(evt) {
            const list = [];
            const primitives = document.getElementsByClassName("primitive");
            for(var i =0; i<primitives.length;i++){
                obj = primitives[i];
                color = obj.lastChild.getAttribute("material")['color']
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["primitive",obj.lastChild.tagName,"color:"+color,pos,scale,rotation]);
            } 
            const images = document.getElementsByClassName("customImage");
            for(var i =0; i<images.length;i++){
                obj = images[i];
                src = obj.lastChild.getAttribute("src")
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["image",src,"None",pos,scale,rotation]);
            }
            const models = document.getElementsByClassName("customModel");
            for(var i =0; i<models.length;i++){
                obj = models[i];
                gltf = obj.lastChild.lastChild.getAttribute("gltf-model")
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["model",gltf,"None",pos,scale,rotation]);
            }
            console.log(list)
            var data = JSON.stringify(list);
            axios.post("https://192.168.20.162:5000/saveworld/0", data, { 
                headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              }});
        });
  
        
    }
});
