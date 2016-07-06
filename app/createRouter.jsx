import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import App from './components/App';
import Home from './components/containers/HomeContainer';
import Subreddit from './components/containers/SubredditContainer';
import PostContainer from './components/containers/PostContainer';
import SelectSubreddit from './components/containers/SelectSubredditContainer';

export default function createRouter(history) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="select" component={SelectSubreddit} />
                <Route path="r/:subreddit" component={Subreddit}>
                    <Route path="post/:postId" component={PostContainer} />
                </Route>
            </Route>
        </Router>
    );
}