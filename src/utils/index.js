export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

export function bindListener(listener,action) {
    let prevState = {};
    listener(newState => {
        if(prevState === newState) return;
        prevState = newState;
        action(newState);
    });
}
