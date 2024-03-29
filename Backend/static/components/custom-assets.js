AFRAME.registerComponent('custom-assets', {
  
    init: function () {
        console.log("sstarting")
        var scene = document.querySelector('#scene');
        var state = scene.getAttribute('gamestate');
        var host = window.location.host; 
        axios.get('/images/0', {
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
        axios.get('/models/0', {
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
    }
  });
  
