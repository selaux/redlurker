import React from 'react'
import R from 'ramda';
import {connect} from 'react-redux'
import debounce from 'just-debounce';
import {Navbar, FormControl, Grid} from 'react-bootstrap'

import renderWhen from '../../lib/renderIf'
import fetchPopularSubreddits from '../../actions/reddit/fetchPopularSubreddits'
import fetchMatchingSubreddits from '../../actions/reddit/fetchMatchingSubreddits'
import TitleBar from '../common/TitleBar';
import SubredditListing from '../common/SubredditListing';

export class SelectSubreddit extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);

        this.debouncedFetch = debounce(props.fetchMatchingSubreddits, 1000);
        this.state = {
            searchString: ''
        };
    }

    componentDidMount() {
        this.props.fetchPopularSubreddits(this.context);
    }

    updateSearchString(event) {
        this.setState({
            searchString: event.target.value
        });

        this.debouncedFetch(this.context, event.target.value)
    }

    render() {
        const { loading, popularSubreddits, matchingSubreddits } = this.props;
        const searchStringIsEmpty = R.partial(R.isEmpty, [ this.state.searchString ]);
        const renderSubredditListing = (s) => <SubredditListing subreddit={s} />;
        const renderPopularSubreddits = () => popularSubreddits.map(renderSubredditListing);
        const renderMatchingSubreddits = () => matchingSubreddits.map(renderSubredditListing);

        return (
            <div style={{marginTop: '70px'}}>
                <TitleBar loading={loading}>Choose Subreddit</TitleBar>
                <Grid fluid={true}>
                    <FormControl
                        type='text'
                        placeholder='Search for subreddit'
                        value={this.state.searchString}
                        onChange={this.updateSearchString.bind(this)} />
                    <div>
                        { renderWhen(searchStringIsEmpty, renderPopularSubreddits, renderMatchingSubreddits) }
                    </div>
                </Grid>
            </div>
        )
    }
}

SelectSubreddit.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    popularSubreddits: React.PropTypes.array,
    matchingSubreddits: React.PropTypes.array,
    fetchPopularSubreddits: React.PropTypes.func.isRequired,
    fetchMatchingSubreddits: React.PropTypes.func.isRequired
};

SelectSubreddit.contextTypes = {
    fetch: React.PropTypes.func
};

export default connect(
    state => ({
        loading: R.path([ 'request', 'inProgress' ], state),
        popularSubreddits: R.path([ 'subreddits', 'popular' ], state),
        matchingSubreddits: R.path([ 'subreddits', 'matching' ], state)
    }),
    { fetchPopularSubreddits, fetchMatchingSubreddits }
)(SelectSubreddit)
