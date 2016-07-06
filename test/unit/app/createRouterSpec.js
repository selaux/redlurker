import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../../app/components/App';
import Home from '../../../app/components/containers/HomeContainer';
import SelectSubredditContainer from '../../../app/components/containers/SelectSubredditContainer';
import SubredditContainer from '../../../app/components/containers/SubredditContainer';
import PostContainer from '../../../app/components/containers/PostContainer';
import createRouter from '../../../app/createRouter';

describe('createRouter', function () {
    const historyStub = {};
    const Router = createRouter.bind(null, historyStub);

    it('should return a valid dev tools component', function () {
        const router = shallow(<Router />);

        expect(router.find('Router')).to.be.present();
        expect(router.find('Router')).to.have.prop('history', historyStub);
    });

    it('should have an index route', function () {
        const router = shallow(<Router />);
        const indexRoute = router.children().filter('Route');

        expect(indexRoute).to.have.prop('path', '/');
        expect(indexRoute).to.have.prop('component', App);
        expect(indexRoute.children().filter('IndexRoute')).to.have.prop('component', Home);
    });

    it('should have a select route', function () {
        const router = shallow(<Router />);
        const indexRoute = router.children().filter('Route');
        const selectRoute = indexRoute.children().filterWhere((r) => r.prop('path') === 'select');

        expect(selectRoute).to.have.prop('component', SelectSubredditContainer);
    });

    it('should have a subreddit route', function () {
        const router = shallow(<Router />);
        const indexRoute = router.children().filter('Route');
        const subredditRoute = indexRoute.children().filterWhere((r) => r.prop('path') === 'r/:subreddit');

        expect(subredditRoute).to.have.prop('component', SubredditContainer);
    });

    it('should have a post route', function () {
        const router = shallow(<Router />);
        const indexRoute = router.children().filter('Route');
        const subredditRoute = indexRoute.children().filter('Route').filterWhere((r) => r.prop('path') === 'r/:subreddit');
        const postRoute = subredditRoute.children().filter('Route');

        expect(postRoute).to.have.prop('path', 'post/:postId');
        expect(postRoute).to.have.prop('component', PostContainer);
    });
});
