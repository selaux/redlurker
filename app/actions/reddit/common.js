import R from 'ramda';

const normalizeThumbnail = R.pipe(
    R.when((s) => s.startsWith('http://'), (s) => `https://${s.substring(7)}`),
    R.when(R.equals('default'), R.always(null)),
    R.when(R.equals('self'), R.always(null))
);

const getChildren = R.path([ 'data', 'children' ]);

const getPostData = R.pipe(
    R.prop('data'),
    (post) => ({
        id: post.id,
        author: post.author,
        domain: post.domain,
        subreddit: post.subreddit,
        thumbnail: normalizeThumbnail(post.thumbnail),
        hint: post.post_hint,
        title: post.title,
        url: post.url
    })
);

const getSubredditData = R.pipe(
    R.prop('data'),
    (subreddit) => ({
        id: subreddit.id,
        name: subreddit.display_name,
        thumbnail: normalizeThumbnail(subreddit.icon_img),
        description: subreddit.public_description,
        url: subreddit.url
    })
);

export const getPosts = R.pipe(
    getChildren,
    R.map(getPostData)
);

export const getSubreddits = R.pipe(
    getChildren,
    R.map(getSubredditData)
);
