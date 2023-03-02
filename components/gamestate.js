AFRAME.registerSystem('gamestate', {
    // Initial state.
    schema: {
       objs: {type: 'array', default: ["box,0,0,0"]},
       active : {type: 'string', default:'box'}
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

      registerHandler('addBox', function (newState, params) {
        var x = params.detail.posx;
        var z = params.detail.posz;
        console.log('added ' + z.toString() + x.toString());
        newState.objs.push("box," +z.toString() +","+ x.toString());
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