var grabbedObject;

AFRAME.registerSystem('gamestate', {
    // Initial state.
    schema: {
       objs: {type: 'array'},
       active : {type: 'int', default: 0},
       activeMaterial : {type: 'string', default: "color:red"},
       activeScale : {type: 'vec3', default: {x:1.0, y:1.0, z:1.0}},
       primitives: {type: 'array',default: ["a-box","a-sphere","a-cylinder","a-triangle","a-torus","a-cone","a-box","a-sphere","a-cylinder","a-triangle","a-torus","a-cone","a-cylinder","a-triangle"]},
       srcs: {type: 'array'},

    },
  
    init: function () {
      var initialState = this.initialState;
      var sceneEl = this.el;
      var state = this.data;
      var el = this.el;

      if (!initialState) { initialState = state; }
  
      this.sceneEl.emit('gamestateinitialized', {state: initialState});
  
      /**
       * Application-specific code goes under here! Handlers to transition state.
       */

      registerHandler('addEl', function (newState) {
        console.log('recived emission')
        return newState;
      });

      
      registerHandler('incrementActive', function (newState) {
        console.log('recived incrementActive');
        newState.active =  newState.active + 1;
        return newState;
      });

      registerHandler('decrementActive', function (newState) {
        console.log('recived decrementActive');
        newState.active =  newState.active - 1;
        return newState;
      });

      registerHandler('changeState', function (newState, params) {
        console.log('changing state')
        newState.objs = params.detail.objs
        return newState;
      });

      registerHandler('addObj', function (newState, params) {
        var x = params.detail.posx;
        var z = params.detail.posz;
        var y = params.detail.posy;
        var objname = params.detail.objname;

        console.log('added ',x,y,z);
        newState.objs.push(objname + "," +x.toString() +","+ y.toString()+ ","+ z.toString());
        return newState;
      });

      registerHandler('changeActive', function (newState, params) {
        console.log('added changed to', params);
        newState.active = params.detail;
        return newState;
      });
  
      // Part of the game state library.
      function registerHandler (eventName, handler) {
        el.addEventListener(eventName, function (param) {
          var newState = handler(AFRAME.utils.extend({}, state), param);
          publishState(eventName, newState);
        });
      }
  
      // Part of the game state library.
      function publishState (event, newState) {
        var oldState = AFRAME.utils.extend({}, state);
        el.setAttribute('gamestate', newState);
        state = newState;
        el.emit('gamestatechanged', {
          event: event,
          diff: AFRAME.utils.diff(oldState, newState),
          state: newState
        });
      }

    }
  });