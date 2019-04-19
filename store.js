const store = createStore();
store.next();

const identity = dispatch => sideEffect => Promise.resolve(dispatch(sideEffect));

addEventListener('message',  async function ({data: action}) {
  let enhancer = (self.middleware || identity);
  const results = await enhancer(dispatch)(action);
  postMessage(results.value);
});

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
