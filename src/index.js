import configureStore   from 'store';
import { render }       from 'react-dom';
import Navigator        from 'components/Navigator';
import React            from 'react';

const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);

console.log("Loaded JS");


setTimeout( ()=> {
    store.dispatch({type:'NAV_PUSH_BASE', payload: {
        current: {
            backdrop:{x: 0, y: 0, z: 1, opacity: 100},
            card:{x: 0, y: 0, z: 2, opacity: 100},
        }
    }});
},5000);

setTimeout( ()=> {
    store.dispatch({type:'NAV_DEBUG_BASE'});
},10000);

setTimeout( ()=> {
    store.dispatch({type:'NAV_DEBUG_BASE'});
},20000);

render(<Navigator store={store} listener={ (nav)=> {
    store.subscribe(function() { nav(store.getState().navigator); });
} } initialState={store.getState().navigator}  sceneConfigurations={require("constants/sceneConfig")} />, document.getElementById('root'));
/*
Should be able to nest Navigators just need to pass store.getState().differentReducer same pattern.
*/
