/** ✰✰✰ Konstantin Aleksandrov ✰✰✰ https://github.com/koalex ✰✰✰ **/

import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware }                      from 'react-router-redux'
import reducer, { initialState }                 from '../reducers';
import api                                       from '../middlewares/api';
import history                                   from '../middlewares/history';
import auth                                      from '../middlewares/auth';
import phones                                    from '../middlewares/phones';

let DevTools;

const middlewares = [];

export default function (preloadedState) {
        middlewares.push(auth);
        middlewares.push(phones);

        middlewares.push(routerMiddleware(history));

        middlewares.push(api);

        let enhancer = applyMiddleware(...middlewares);

        if (__DEVTOOLS__) {
            DevTools = require('../DevTools').default;
            enhancer = compose(enhancer, DevTools.instrument()); // этот MW всегда надо подключать последним !!!
        }

        const store = createStore(
            reducer,
            initialState,
            enhancer
        );

        store.asyncReducers = {};

        if (__DEV__) {
            if (module && module.hot) {
                // Enable Webpack hot module replacement for reducers
                module.hot.accept('../reducers', () => {
                    const nextRootReducer = require('../reducers/index').default;
                    store.replaceReducer(nextRootReducer);
                });
            }

            window.store = store;
        }

        return store;
}
