import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('https://api.spotify.com/v1/search?q=test&type=track&limit=10', (req, res, ctx) => {
        return res(ctx.json({
            data : {
                tracks : {
                    items : [
                        {
                            id: 'test',
                            name: 'test',
                            artists: [
                                {
                                    name: 'test',
                                }
                            ],
                            album: {
                                images: [
                                    {
                                        url: 'test',
                                    }
                                ],
                                name: 'test',
                            },
                            uri: 'test',
                            duration_ms: 0,
                        }
                    ]
                }
            }
        }))
    }),
)

export { server, rest };