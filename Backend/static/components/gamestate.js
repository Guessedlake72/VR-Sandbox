var grabbedObject;
var globalActiveObject;

AFRAME.registerSystem('gamestate', {
    // Initial state.
    schema: {
       objs: {type: 'array'},
       active : {type: 'int', default: 0},
       activeMaterial : {type: 'int', default: 0},
       activeScale : {type: 'vec3', default: {x:1.0, y:1.0, z:1.0}},
       primitives: {type: 'array',default: ["a-box","a-sphere","a-cylinder","a-triangle","a-torus","a-cone", "a-icosahedron","a-octahedron","a-tetrahedron"]},
       builtIn: {type: 'array',default: [["#sofa",100],["#modern_bench",100],["#display_case",100],["#picture_frame",1],["#plant",1],["#stand",100],["#shelf",100]]},
       materials: {type: 'array',default: ["color:red","color:green","color:blue","color: #ed7632","color: #4facbb","color: #492d29","colorWrite: false"]},
       customImages1: {type: 'array', default: []},
       customImages2: {type: 'array', default: []},
       customModels1: {type: 'array', default: []},
       customModels2: {type: 'array', default: []},
       activePage : {type: 'int', default: 1},
       menuActive: {type: 'bool', default: false},
       materialMenuActive: {type: 'bool', default: false},
       activeUser: {type: 'string',default: "None"},
       activeWorld: {type: 'string',default: "None"},
       readOnly: {type: 'bool', default: false}
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