AFRAME.registerComponent('save-upload', {
    init: function() {
        var scene = document.querySelector('#scene');
        var active = false;
        this.el.addEventListener('thumbstickdown', function(evt) {
            console.log("Pressed")
            if(active  == false){
                const list = [];
                const primitives = document.getElementsByClassName("primitive");
                for(var i =0; i<primitives.length;i++){
                    let obj = primitives[i];
                    let color = obj.lastChild.lastChild.getAttribute("material")['color']
                    let pos = obj.getAttribute("position")
                    let scale = obj.getAttribute("scale")
                    let rotation = obj.getAttribute("rotation")
                    list.push(["primitive",obj.lastChild.lastChild.tagName,"color:"+color,pos,scale,rotation]);
                } 
                const images = document.getElementsByClassName("customImage");
                for(var i =0; i<images.length;i++){
                    let obj = images[i];
                    let src = obj.lastChild.getAttribute("src")
                    let pos = obj.getAttribute("position")
                    let scale = obj.getAttribute("scale")
                    let rotation = obj.getAttribute("rotation")
                    list.push(["image",src,"None",pos,scale,rotation]);
                }
                const models = document.getElementsByClassName("customModel");
                for(var i =0; i<models.length;i++){
                    let obj = models[i];
                    let gltf = obj.lastChild.lastChild.getAttribute("gltf-model")
                    let modelscale = obj.lastChild.lastChild.getAttribute("scale")
                    let pos = obj.getAttribute("position")
                    let scale = obj.getAttribute("scale")
                    let rotation = obj.getAttribute("rotation")
                    list.push(["model",gltf,modelscale,pos,scale,rotation]);
                }
                const text = document.getElementsByClassName("customText");
                for(var i =0; i<text.length;i++){
                    let obj = text[i]
                    let nodes = obj.lastChild.childNodes;
                    let title = nodes[1].getAttribute("text").value
                    let desc = nodes[2].getAttribute("text").value
                    let pos = obj.getAttribute("position")
                    let scale = obj.getAttribute("scale")
                    let rotation = obj.getAttribute("rotation")
                    list.push(["text",title,desc,pos,scale,rotation]);
                }
                const preset = document.getElementsByClassName("preset");
                for(var i =0; i<preset.length;i++){
                    let obj = preset[i];
                    let gltf = obj.getAttribute("gltf-model")
                    let pos = obj.getAttribute("position")
                    let scale = obj.getAttribute("scale")
                    let rotation = obj.getAttribute("rotation")
                    list.push(["preset",gltf,0,pos,scale,rotation]);
                }
                var scene = document.querySelector('#scene');
                var state = scene.getAttribute('gamestate');
                active = true;
                console.log(list)
                var data = JSON.stringify(list);
                axios.post("/saveworld/"+state.activeUser+"/"+state.activeWorld, data, { 
                    headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }});
                var camera = document.querySelector('#camera');
                var menuContainer = document.createElement("a-entity");
                var menu = document.createElement("a-entity");
                menu.setAttribute("geometry",{primitive: "plane", height: 16, width: 16});
                menu.setAttribute("material",{shader: "flat"});
                menu.setAttribute("position",{ x: 8, y: 8, z: -.2 });
                menuContainer.appendChild(menu);
                var title = document.createElement("a-entity");
                title.setAttribute("text", "value:World Saved!; color: red");
                title.setAttribute("scale", {x:20, y:20, z:20});
                title.setAttribute("position", {x:13, y:13, z:1});
                menuContainer.appendChild(title);
                var desc = document.createElement("a-entity");
                textValue = "A shareable link has been created! \n \n Read Only: \n"+ window.location.host + "/?emulatedUser="+state.activeUser+"&world="+state.activeWorld+"&readOnly=true\n \n Write Allowed: \n"+ window.location.host + "?emulatedUser="+state.activeUser+"&world="+state.activeWorld + "&readOnly=false"
                desc.setAttribute("text", "value: "+textValue + "; color: red");
                desc.setAttribute("scale", {x:13, y:13, z:13});
                desc.setAttribute("position", {x:8, y:8, z:1});
                menuContainer.appendChild(desc);
                menuContainer.setAttribute("position",{ x: -.8, y: -.8, z: -1.5});
                menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
                menuContainer.id = "confirm";
                camera.appendChild(menuContainer);  
            } else {
                active = false;
                document.getElementById("confirm").remove();
            }
           });
  
        
    }
});
