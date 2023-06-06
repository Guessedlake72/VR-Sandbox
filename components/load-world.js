AFRAME.registerComponent('load-world', {
    init: function() {

        this.el.addEventListener('thumbstickdown', function(evt) {
            axios.get(' https://192.168.20.162:5000/loadworld/0')
            .then(function (response) {
            console.log(response);
            objects = response.data;
            var scene = document.querySelector('#scene');
            var state = scene.getAttribute('gamestate');
            
            for(var i = 0; i < objects.length; i++){
                var piece = document.createElement('a-entity');
                obj = objects[i];
                console.log(obj)

                if(obj[0] == "primitive"){
                    piece.classList.add("primitive");
                    var bounding = document.createElement('a-box')
                    bounding.setAttribute("material", "transparent: true; opacity:0.0")
                    var object = document.createElement(obj[1]);
                    object.setAttribute("material",obj[2]);
                    bounding.appendChild(object);
                    piece.appendChild(bounding)
                } else if (obj[0] == 'image'){
                    var object = document.createElement('a-image');
                    piece.classList.add("customImage")
                    object.setAttribute("width", 3);
                    object.setAttribute("height",3);
                    object.setAttribute("src", obj[1])
                    piece.appendChild(object)
                } else if (obj[0] == 'model'){
                    var bounding = document.createElement('a-box')
                    bounding.setAttribute("material", "transparent: true; opacity:0.0")
                    var object = document.createElement('a-entity')
                    object.setAttribute("gltf-model", obj[1]);
                    object.setAttribute("scale", obj[2]);
                    object.setAttribute("position", {x:0, y:-.4, z:0});
                    bounding.appendChild(object);
                    piece.appendChild(bounding)
                    piece.classList.add("customModel")
                } else if (obj[0] == 'text'){
                    var bounding = document.createElement('a-box')
                    bounding.setAttribute("material", "transparent: true; opacity:0.0")
                    var title = document.createElement("a-entity");
                    title.setAttribute("text", "value: "+ obj[1]+"; color: black");
                    title.setAttribute("scale", {x:5, y:5, z:5});
                    title.setAttribute("position", {x:.5, y:1, z:.1});
                    bounding.appendChild(title);
                    var text = document.createElement("a-entity");
                    text.setAttribute("text", "value: "+obj[2] + "; color: black");
                    text.setAttribute("scale", {x:3, y:3, z:3});
                    text.setAttribute("position", {x:0, y:0, z:.1});
                    bounding.appendChild(text);
                    piece.appendChild(bounding)
                    piece.classList.add("customText")
                }
                piece.setAttribute('position',  obj[3]);
                piece.setAttribute('scale', obj[4]);
                piece.setAttribute('rotation',obj[5]);
                //piece.classList.add("physicsBody")
                //piece.setAttribute("mixin","physicsBody")
                scene.appendChild(piece);
            }
        })

        });

        window.addEventListener('keydown', function(e) {
            if(e.code == "KeyL"){
                axios.get(' https://192.168.20.162:5000/loadworld/0')
                .then(function (response) {
                console.log(response);
                objects = response.data;
                var scene = document.querySelector('#scene');
                var state = scene.getAttribute('gamestate');
                
                for(var i = 0; i < objects.length; i++){
                    var piece = document.createElement('a-entity');
                    obj = objects[i];
                    console.log(obj)

                    if(obj[0] == "primitive"){
                        piece.classList.add("primitive");
                        var object = document.createElement(obj[1]);
                        object.setAttribute("material",obj[2]);
                        piece.appendChild(object)
                    } else if (obj[0] == 'image'){
                        var object = document.createElement('a-image');
                        piece.classList.add("customImage")
                        object.setAttribute("width", 3);
                        object.setAttribute("height",3);
                        object.setAttribute("src", obj[1])
                        piece.appendChild(object)
                    }
                    piece.setAttribute('position',  obj[3]);
                    piece.setAttribute('scale', obj[4]);
                    piece.setAttribute('rotation',obj[5]);
                    piece.classList.add("physicsBody")
                    piece.setAttribute("mixin","physicsBody")
                    scene.appendChild(piece);
                }
            })
 
            }
        });
  
        
    }
});
