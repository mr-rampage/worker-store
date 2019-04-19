const store = createStore();
store.next();

const identity = dispatch => sideEffect => Promise.resolve(dispatch(sideEffect));

onmessage = function ({data: action}) {
  let enhancer = (self.middleware || identity);
  enhancer(dispatch)(action)
    .then(result => result.value)
    .then(postMessage);
};

function dispatch(action) {
  return store.next(action);
}

function initialize([reducers, initialState, middleware]) {
  importScripts(reducers, middleware);
  return initialState;
}

function* createStore() {
  let state = initialize(yield);

  while (true) {
    let action = yield state;
    state = self.reducer(state, action);
  }

}
