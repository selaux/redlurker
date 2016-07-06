import React from 'react';
import R from 'ramda';
import {AllHtmlEntities} from 'html-entities';

const entities = new AllHtmlEntities();

const imgurImageRegex = /^https:\/\/i.imgur.com\/(.*)$/;
const imgurRegex = /^https:\/\/imgur.com\/([a-zA-Z0-9.]+)$/;
const iRedditRegex = /^https:\/\/i.redd.it\/([a-zA-Z0-9.]+)$/;
const iRedditUploadsRegex = /^https:\/\/i.reddituploads.com\//;

function rewriteImgurUrl(imgurUrl) {
    const match = imgurUrl.match(imgurRegex);
    const path = match[1].includes('.') ? match[1] : `${match[1]}.png`;
    return `//i.imgur.com/${path}`;
}

function isImgurVideo(url) {
    return url.endsWith('.gifv');
}

function renderImgurVideo(url) {
    const path = url.match(imgurImageRegex)[1];
    const id = path.substring(0, path.length-5);

    return renderVideo(`https://i.imgur.com/${id}.jpg`, `https://i.imgur.com/${id}.mp4`);
}

function renderVideo(poster, source) {
    return (
        <video
            poster={poster}
            src={source}
            type="video/mp4"
            preload="auto"
            autoPlay={true}
            muted={true}
            loop={true}
            style={{ maxWidth: '100%', maxHeight: '100%' }} />
    );
}

function renderImage(imageUrl) {
    return <img src={entities.decode(imageUrl)} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
}

function renderIFrame(url) {
    return <iframe src={url} style={{ width: '100%', height: '100%' }} frameBorder='0' />;
}

const renderImgurImage = R.ifElse(isImgurVideo, renderImgurVideo, renderImage);

export default function Post(props) {
    const post = props.post;
    const postUrl = R.when(u => u.startsWith('http://'), u => `https${u.substring(4)}`)(post.url);

    return R.cond([
        [ url => imgurImageRegex.test(url), renderImgurImage ],
        [ url => imgurRegex.test(url), R.pipe(rewriteImgurUrl, renderImgurImage) ],
        [ url => iRedditRegex.test(url), renderImage ],
        [ url => iRedditUploadsRegex.test(url), renderImage ],
        [ R.T, renderIFrame ]
    ])(postUrl);
}