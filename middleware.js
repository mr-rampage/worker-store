console.info('Middleware loaded');

function middleware(dispatch) {
  return sideEffect => {
    const command = {
      '[wikipedia] search': search =>
        fetch(`http://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${search}`)
          .then(response => response.json())
          .then(results => ({
            type: '[wikipedia] results',
            payload: results
          }))
          .then(dispatch)
    };

    if (command[sideEffect.type]) {
      return command[sideEffect.type](sideEffect.payload)
    } else {
      return Promise.resolve(dispatch(sideEffect));
    }
  };
}
