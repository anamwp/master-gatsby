// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv  from 'dotenv';

dotenv.config({path: '.env'});

export default {
    siteMetadata: {
        title: `Slicks Slices`, 
        siteUrl: 'https://anam.rocks',
        description: 'The best place for pizza in Bangladesh',
        twitter: '@theanamhossain'
    }, 
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options : {
                projectId: 'my12b75q', 
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN
            }
        }
    ]

}