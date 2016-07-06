import React from 'react'

export default class App extends React.Component {
    render() {
        return this.props.children;
    }
}

App.prototype.getChildContext = () => ({
    fetch: fetch.bind(window)
});

App.childContextTypes = {
    fetch: React.PropTypes.func.isRequired
};