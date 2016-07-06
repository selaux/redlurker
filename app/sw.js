import toolbox from 'sw-toolbox';

toolbox.options.cache.name = 'redlurker';

toolbox.precache([
    '/',
    '/bundle.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/latest/fonts/glyphicons-halflings-regular.woff2'
]);

// App Shell
toolbox.router.get('/', toolbox.fastest);
toolbox.router.get('/bundle.js', toolbox.fastest);
toolbox.router.get('/bundle.css', toolbox.fastest);
toolbox.router.get(/^https:\/\/maxcdn.bootstrapcdn.com\//, toolbox.fastest);

// APIs
toolbox.router.get(/^https:\/\/api.reddit.com\//, toolbox.networkFirst);

// Assets
toolbox.router.get(/^https:\/\/[a-zA-Z]+.thumbs.redditmedia.com\//, toolbox.cacheFirst);
toolbox.router.get(/^https:\/\/i.imgur.com\//, toolbox.cacheFirst);
toolbox.router.get(/^https:\/\/i.redd.it\//, toolbox.cacheFirst);

