import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';

import renderIf from '../../lib/renderIf'

function renderThumbnail(thumbnail) {
    return (
        <Media.Left align="middle">
            <img width={80} src={thumbnail} alt='' />
        </Media.Left>
    );
}

export default function Listing(props) {
    return (
        <Link key={props.id} to={props.link} className='listing'>
            <Media>
                {renderIf(props.thumbnail, () => renderThumbnail(props.thumbnail))}
                <Media.Body>
                    {props.children}
                </Media.Body>
            </Media>
        </Link>
    );
}

Listing.propTypes = {
    id: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string
};