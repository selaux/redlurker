import React from 'react';
import {createDevTools as createReduxDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default function createDevTools() {
    return createReduxDevTools(
        <DockMonitor toggleVisibilityKey='ctrl-d' changePositionKey='ctrl-q' defaultIsVisible={false}>
            <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
        </DockMonitor>
    );
}