AFRAME.registerComponent('save-upload', {
    init: function() {
        axios.defaults.headers.common = {
            "X-API-Key": "636af092e9a77f5984220834",  
          };
        window.addEventListener('keydown', function(e) {
            if(e.code == "KeyL"){
                var scene = document.querySelector('#scene');
                var state = scene.getAttribute('gamestate');
                console.log("sent state");
                var statestr = "";
                for (let i = 0; i < state.objs.length; i++) {
                    statestr = statestr + ":"  + state.objs[i].toString()
                }
                axios.post("https://vrsandbox-62fc.restdb.io/rest/states", {
                    state: statestr,
                    userID: 1,
                    timestamp: Date.now()
            })
            .then((response) => console.log(response.data))
            .then((error) => console.log(error));
            }
            if(e.code == "KeyK"){
                axios.get('https://vrsandbox-62fc.restdb.io/rest/states', {
                    params: {
                        "X-API-Key": "636af092e9a77f5984220834",  
                    }
                })
                .then(function (response) {
                    console.log(response);
                    var index = -1;
                    for (let i = 0; i < response.data.length; i++) {
                        if(index == -1 || Date.parse(response.data[i]['timestamp'])>Date.parse(response.data[index]['timestamp'])){
                            index = i;
                        }
                        obj = (response.data[index]['state'].split(':')).slice(1)
                        console.log(response.data[index]['state'].split(':'));
                        var scene = document.querySelector('#scene');
                        scene.emit('changeState', {objs:obj});
                        }
                })
            }
        });

        
    }
});
