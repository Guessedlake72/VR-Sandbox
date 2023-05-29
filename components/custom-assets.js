AFRAME.registerComponent('custom-assets', {
  
    init: function () {
        console.log("sstarting")
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        axios.get('https://192.168.20.162:5000/images/0', {
        })
        .then(function (response) {
            console.log(response)
            state.customImages= response.data;
        })
        axios.get('https://192.168.20.162:5000/models/0', {
        })
        .then(function (response) {
            state.customModels= response.data;
        })
    }
  });
  
