import React from 'react';
import {Link} from 'react-router';

import TitleBar from './TitleBar';

export default function SubredditTitleBar(props) {
    return (
        <TitleBar loading={props.loading}>
            {props.title}
            <Link to='/select'>Change</Link>
        </TitleBar>
    );
}