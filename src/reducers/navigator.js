import { createReducer } from 'utils';

export default function createNavigationReducer(namespace, initState) {
    // need to export these from a file in constants
    const NAV_PUSH = 'NAV_PUSH'+namespace;
    const NAV_POP = 'NAV_POP'+namespace;
    const NAV_DEBUG = 'NAV_DEBUG'+namespace;
    const NAV_REPLACE = 'NAV_REPLACE'+namespace;

    const initialState = (initState) ? initState : {
        current: {backdrop:{x: 0, y: 0, z: 1, opacity: 100}},
        history: [],
        debug: false
    };
    
    return createReducer(initialState, {
        [NAV_PUSH] : (state, action) => {
            const newState = {...state};
            newState.history.push(action.current);
            newState.current = action.current;
            return newState;
        },
        [NAV_POP] : (state, action) => {
            if(state.history.length === 0) return state;
            const newState = {...state};
            newState.current = newState.history.pop();
            return newState;
        },
        [NAV_REPLACE] : (state, action) => {
            if(state.history.length === 0) {
                const newState = {...state};
                newState.history.push(action.current);
                newState.current = action.current;
                return newState;
            } else {
                const newState = {...state};
                newState.history.pop();
                newState.history.push(action.current);
                newState.current = action.current;
                return newState;
            }
        },
        [NAV_DEBUG] : state => {
            const newState = {...state};
            newState.debug = !state.debug;
            return newState;
        }
    });
}
