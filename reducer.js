console.log('reducer loaded');
function reducer(state, action) {
  const command = {
    '[wikipedia] results': {...state, searchResults: action.payload}
  };

  return command[action.type] || state;
}
