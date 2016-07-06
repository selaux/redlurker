import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import createRootStore from './createRootStore';
import createRouter from './createRouter';
import createDevTools from './createDevTools';

export default function startApp() {
    const DevTools = createDevTools();
    const store = createRootStore(DevTools);
    const history = syncHistoryWithStore(hashHistory, store);
    const router = createRouter(history);

    if ('serviceWorker' in navigator) {
        runtime.register();
    }

    ReactDOM.render(
        <Provider store={store}>
            <div>
                {router}
                <DevTools />
            </div>
        </Provider>,
        document.getElementById('mount')
    );
}

if (typeof window !== 'undefined') {
    window.startApp = startApp;
}
