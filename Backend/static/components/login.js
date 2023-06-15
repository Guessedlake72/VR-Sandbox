AFRAME.registerComponent('login', {
    init: function() {
        var page = 0;
        var user = "None"
        displayPage(page)
        const grid = [[1,1], [1,2],[1,3], [1,4],[2,1], [2,2],[2,3], [2,4],[3,1], [3,2],[3,3], [3,4],[4,1],[4,2],[4,3],[4,4]]
        var state = scene.getAttribute('gamestate');
        var player = document.querySelector('#player');
        var laserhand = document.createElement("a-entity");
        laserhand.id = "hand"
        laserhand.setAttribute("laser-controls","hand: left");
        laserhand.setAttribute('oculus-touch-controls', "hand: left handModelStyle: lowPoly; color: #ffcccc");
        laserhand.setAttribute("raycaster", "objects: .collidable; lineColor: green")
        player.appendChild(laserhand);
        var hoverObject = "";
        var grabHand = document.createElement("a-entity");
        grabHand.id = "lhand";
        grabHand.setAttribute("mixin", "touch");
        grabHand.setAttribute("hand-controls","hand:left; handModelStyle: lowPoly; color: #ffcccc")
        grabHand.setAttribute("strech","")
        grabHand.setAttribute("blink-controls","button: trigger;")
  
        laserhand.addEventListener('raycaster-intersection', function (evt) {
            console.log(evt.detail.els[0].id);
            hoverObject = evt.detail.els[0].id;
        });
        laserhand.addEventListener('raycaster-intersection-cleared', function (evt) {
            hoverObject="";
        });
        laserhand.addEventListener('triggerdown', function (evt) {
            if(hoverObject == "newWorld"){
                displayPage(2);
                hoverObject="";
            }else if(hoverObject == "preset1"){
                roomModel = document.createElement('a-entity');
                roomModel.setAttribute("gltf-model","#galleryRoom")
                roomModel.setAttribute("scale","1 1 1")
                roomModel.setAttribute("position","-3 0.01 0")
                roomModel.setAttribute("class", "preset")
                scene.appendChild(roomModel)
                player.lastChild.remove();
                player.appendChild(grabHand);
                document.getElementById("loginMenuContainer").remove();
            }else if(hoverObject == "preset2"){
                roomModel = document.createElement('a-entity');
                roomModel.setAttribute("gltf-model","#retail")
                roomModel.setAttribute("scale","1 1 1")
                roomModel.setAttribute("position","-3 0.2 0")
                roomModel.setAttribute("class", "preset")
                scene.appendChild(roomModel)
                player.lastChild.remove();
                player.appendChild(grabHand);
                document.getElementById("loginMenuContainer").remove();
            }else if(hoverObject == "preset3"){
                player.lastChild.remove();
                player.appendChild(grabHand);
                document.getElementById("loginMenuContainer").remove();
            }else if(hoverObject == "newWorld"){
                displayPage(2);
                hoverObject="";
            }
            else if(hoverObject != ""){
                state.activeWorld = hoverObject;
                buildWorld()
                player.lastChild.remove();
                player.appendChild(grabHand);
                document.getElementById("loginMenuContainer").remove();
            }
        });

        this.el.addEventListener('superkeyboardinput', function(evt) {
            console.log(evt.detail)
            console.log(page)
            if(page == 0){
               // var state = scene.getAttribute('gamestate');
                state.activeUser = evt.detail.value;
                console.log("sstarting")
                var scene = document.querySelector('#scene');
                axios.get('/images/'+state.activeUser, {
                  headers: {
                    "ngrok-skip-browser-warning":"any" 
                           }
                })
                .then(function (response) {
                    console.log(response)
                    var images = response.data;
        
                    if(images.length >=16){
                      state.customImages1=images.slice(0,15);
                      state.customImages2=images.slice(16,images.length);
                    } else {
                      state.customImages1 = images;
                    }
        
                })
                axios.get('/models/'+state.activeUser, {
                  headers: {
                    "ngrok-skip-browser-warning":"any" 
                    }
                })
                .then(function (response) {
                    console.log(response)
                    var models = response.data;
        
                    if(models.length >=16){
                      state.customModels1=models.slice(0,15);
                      state.customModels2=models.slice(16,models.length);
                    } else {
                      state.customModels1 = models;
                    }
        
                })
                displayPage(1)
            } else if(page == 3){
                console.log("PAGE2")
                state.activeWorld = evt.detail.value;
                displayPage(page);
            }
        });

        function buildWorld(){
            var state = scene.getAttribute('gamestate');
            axios.get('/loadworld/'+ state.activeUser +"/" + state.activeWorld,{
                headers: {
                    "ngrok-skip-browser-warning":"any" 
                    }
            })
            .then(function (response) {
            console.log(response);
            objects = response.data;

            for(var i = 0; i < objects.length; i++){
                obj = objects[i];
                console.log(obj)
                if(obj[0] == "preset"){
                    var object = document.createElement('a-entity')
                    object.setAttribute("gltf-model", obj[1]);
                    object.setAttribute("scale", obj[4]);
                    object.setAttribute("position", obj[3]);
                    object.classList.add("preset")
                    scene.appendChild(object);
                    console.log(object)
                } else {
                var piece = document.createElement('a-entity');

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
                }   else if (obj[0] == 'text'){
                    var bounding = document.createElement('a-box')
                    bounding.setAttribute("material", "transparent: true; opacity:0.0")
                    var background = document.createElement("a-entity");
                    background.setAttribute("geometry",{primitive: "plane",
                        height: 3,
                        width: 4});
                    background.setAttribute("material",{shader: "flat"});
                    bounding.appendChild(background);
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
                piece.classList.add("physicsBody")
                piece.setAttribute("mixin","physicsBody")
                scene.appendChild(piece);
            }
            }
        })
        }

        function displayPage(pagenumber){

            var scene = document.querySelector('#scene');
            var camera = document.querySelector('#camera');
            var state = scene.getAttribute('gamestate');

            if(document.getElementById("loginMenuContainer")){
                document.getElementById("loginMenuContainer").remove();
              }

            var menuContainer = document.createElement("a-entity");
            var menu = document.createElement("a-entity");
            menu.setAttribute("geometry",{primitive: "plane",
                height: 16,
                width: 16});
            menu.setAttribute("material",{shader: "flat"});
            menu.setAttribute("position",{ x: 8, y: 8, z: -.2 });
            menuContainer.appendChild(menu)

            switch(pagenumber){
                case 0:

                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    if(urlParams.has('emulateUser')){
                        var emulateUser = urlParams.get('emulateUser');
                        var world = urlParams.get('world');
                        var readOnly = urlParams.get('readOnly');
                        var state = scene.getAttribute('gamestate');
                        state.activeUser = emulateUser;
                        state.activeWorld = world;
                        buildWorld();
                        if(readOnly == true){
                            var teleportHand = document.createElement("a-entity");
                            teleportHand.setAttribute("hand-controls","hand:left; handModelStyle: lowPoly; color: #ffcccc")
                            teleportHand.setAttribute("blink-controls","button: trigger;")
                            var user = document.getElementById("player");
                            user.lastChild.remove();
                            user.appendChild(teleportHand);
                        } else {
                            var grabHand = document.createElement("a-entity");
                            grabHand.id = "lhand";
                            grabHand.setAttribute("mixin", "touch");
                            grabHand.setAttribute("hand-controls","hand:left; handModelStyle: lowPoly; color: #ffcccc")
                            grabHand.setAttribute("strech","")
                            grabHand.setAttribute("blink-controls","button: trigger;")
  
                            var user = document.getElementById("player");
                            user.lastChild.remove();
                            user.appendChild(grabHand);
                        }

                    }else {
                    var title = document.createElement("a-entity");
                    title.setAttribute("text", "value: Welcome To VR Sandbox!; color: red");
                    title.setAttribute("scale", {x:20, y:20, z:20});
                    title.setAttribute("position", {x:13, y:13, z:2});
                    menuContainer.appendChild(title);
                    var text = document.createElement("a-entity");
                    textValue = "Please type you username \n to login!"
                    text.setAttribute("text", "value: "+textValue + "; color: red");
                    text.setAttribute("scale", {x:18, y:18, z:18});
                    text.setAttribute("position", {x:12, y:11.5, z:2});
                    menuContainer.appendChild(text);
                    var keyboard = document.createElement("a-entity");
                    keyboard.id = "keyboard"
                    keyboard.setAttribute("super-keyboard",'hand: #hand; imagePath: /static/assets/keyboard/')
                    keyboard.setAttribute("position",'0 -.3 -1')
                    keyboard.setAttribute("rotation",'-30 0 0')
                    camera.appendChild(keyboard);
                    }
                    break;

                case 1:
                    document.getElementById("keyboard").remove();
                    var worlds = [];
                    axios.get('/worlds/'+ state.activeUser,{
                        headers: {
                            "ngrok-skip-browser-warning":"any" 
                            }
                    })
                    .then(function (response) {
                    console.log(response);
                    worlds = response.data;
                    for (let i = 0; i < worlds.length; i++) {
                        
                        var item = document.createElement("a-box");
                        var gridlocation = grid[i]
                        item.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
                        item.setAttribute("material", "color:red");
                        item.id = worlds[i];
                        item.setAttribute("class", "collidable")
                        menuContainer.appendChild(item);
                        var name = document.createElement("a-entity");
                        name.setAttribute("text","value:"+worlds[i]+"; color:red")
                        name.setAttribute("scale", {x:5, y:5, z:5});
                        name.setAttribute("position",{ x: gridlocation[0]*3, y:  gridlocation[1]*3, z: 0 })
                        menuContainer.appendChild(name);
                        }
                    })
                    var name = document.createElement("a-entity");
                    name.setAttribute("text","value: New World; color:red")
                    name.setAttribute("scale", {x:10, y:10, z:10});
                    name.setAttribute("position","10 1 0")
                    menuContainer.appendChild(name);
                    var item = document.createElement("a-box");
                    item.setAttribute("position","10 1 0")
                    item.setAttribute("material", "color:green");
                    item.id = "newWorld";
                    item.setAttribute("class", "collidable")
                    menuContainer.appendChild(item);
                    break;
                case 2:
                    var title = document.createElement("a-entity");
                    title.setAttribute("text", "value: Enter A Name for World; color: red");
                    title.setAttribute("scale", {x:20, y:20, z:20});
                    title.setAttribute("position", {x:13, y:13, z:2});
                    menuContainer.appendChild(title);
                    var keyboard = document.createElement("a-entity");
                    keyboard.id = "keyboard"
                    keyboard.setAttribute("super-keyboard",'hand: #hand; imagePath: /static/assets/keyboard/')
                    keyboard.setAttribute("position",'0 -.3 -1')
                    keyboard.setAttribute("rotation",'-30 0 0')
                    camera.appendChild(keyboard);
                    page=3
                    break;
                case 3:
                    document.getElementById("keyboard").remove();
                    var title = document.createElement("a-entity");
                    title.setAttribute("text", "value: World Preset; color: red");
                    title.setAttribute("scale", {x:20, y:20, z:20});
                    title.setAttribute("position", {x:13, y:13, z:2});
                    menuContainer.appendChild(title);
                    var image = document.createElement("a-image");
                    image.setAttribute("src", '/static/assets/thumbnails/gallery.png')
                    image.setAttribute("width", 3);
                    image.setAttribute("height",3);
                    image.setAttribute("position","4 8 .3")
                    image.setAttribute("class","collidable")
                    image.id = "preset1"
                    menuContainer.appendChild(image)
                    image2 = document.createElement("a-image");
                    image2.setAttribute("src", '/static/assets/thumbnails/shop.png')
                    image2.setAttribute("position","8.5 8 .3")
                    image2.setAttribute("width", 3);
                    image2.setAttribute("height",3);
                    image2.setAttribute("class","collidable")
                    image2.id = "preset2"
                    menuContainer.appendChild(image2)
                    image3 = document.createElement("a-image");
                    image3.setAttribute("src", '/static/assets/thumbnails/open.png')
                    image3.setAttribute("position","13 8 .3")
                    image3.setAttribute("width", 3);
                    image3.setAttribute("height",3);
                    image3.setAttribute("class","collidable")
                    image3.id = "preset3"
                    menuContainer.appendChild(image3)
                    break;

            }
            menuContainer.setAttribute("position",{ x: -.8, y: -.8, z: -1.5});
            menuContainer.setAttribute("scale", { x: 0.1, y: 0.1, z: 0.1 } );
            menuContainer.id = "loginMenuContainer";
            camera.appendChild(menuContainer);
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if(urlParams.has('emulateUser')){
                menuContainer.remove();
            }
        }
      }

    
    
});
