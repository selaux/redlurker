import React from 'react';
import { Navbar, Nav, Glyphicon } from 'react-bootstrap';

import renderIf from '../../lib/renderIf';

export default function TitleBar(props) {
    return (
        <Navbar fluid={true} fixedTop={true}>
            <Nav>
                <Navbar.Text>{props.children}</Navbar.Text>
            </Nav>
            {renderIf(props.loading, () => (
                <Nav pullRight={true}>
                    <Navbar.Text><Glyphicon glyph='refresh' /></Navbar.Text>
                </Nav>)
            )}
        </Navbar>
    );
}

TitleBar.propTypes = {
    loading: React.PropTypes.bool.isRequired
};
