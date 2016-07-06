export default {
    apiData: {
        data: {
            children: [
                {
                    data: {
                        id: '1',
                        'display_name': 'sr1',
                        'icon_img': 'img1',
                        public_description: 'Subreddit 1',
                        url: '/r/sr1'
                    }
                },
                {
                    data: {
                        id: '2',
                        'display_name': 'sr2',
                        'icon_img': 'img2',
                        public_description: 'Subreddit 2',
                        url: '/r/sr2'
                    }
                }
            ]
        }
    },
    expected: [
        {
            id: '1',
            name: 'sr1',
            thumbnail: 'img1',
            description: 'Subreddit 1',
            url: '/r/sr1'
        },
        {
            id: '2',
            name: 'sr2',
            thumbnail: 'img2',
            description: 'Subreddit 2',
            url: '/r/sr2'
        }
    ]
};
