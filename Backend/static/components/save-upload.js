AFRAME.registerComponent('save-upload', {
    init: function() {
        var state = scene.getAttribute('gamestate');

        this.el.addEventListener('thumbstickdown', function(evt) {
            const list = [];
            const primitives = document.getElementsByClassName("primitive");
            for(var i =0; i<primitives.length;i++){
                obj = primitives[i];
                color = obj.lastChild.lastChild.getAttribute("material")['color']
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["primitive",obj.lastChild.lastChild.tagName,"color:"+color,pos,scale,rotation]);
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
                modelscale = obj.lastChild.lastChild.getAttribute("scale")
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["model",gltf,modelscale,pos,scale,rotation]);
            }
            const text = document.getElementsByClassName("customText");
            for(var i =0; i<text.length;i++){
                obj = text[i]
                nodes = obj.lastChild.childNodes;
                title = nodes[1].getAttribute("text").value
                console.log(title)
                desc = nodes[2].getAttribute("text").value
                console.log(desc)
                pos = obj.getAttribute("position")
                scale = obj.getAttribute("scale")
                rotation = obj.getAttribute("rotation")
                list.push(["text",title,desc,pos,scale,rotation]);
            }
            console.log(list)
            var data = JSON.stringify(list);
            axios.post("https://192.168.20.162:5000/saveworld/"+state.activeUser+"/"+state.activeWorld, data, { 
                headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              }});
        });
  
        
    }
});
