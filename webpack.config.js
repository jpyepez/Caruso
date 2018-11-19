const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SocialTags = require('social-tags-webpack-plugin');

module.exports = {
    entry: [ './src/js/index.js' ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new SocialTags({
            appUrl: 'https://projects.jpyepez.com/BecomeHoratio/',
            facebook: {
                'og:url': "https://projects.jpyepez.com/BecomeHoratio/",
                'og:type': "website",
                'og:title': "Become Horatio",
                'og:image': './src/assets/thumb.jpg',
                'og:description': "Experience your own Horatio Caine moments.",
                'og:site_name': "JP Yepez - Projects",
                'og:locale': "en_US",
            },
            twitter: {
                "twitter:card": "summary",
                "twitter:creator": "@jpyepezartist",
                "twitter:url": "https://projects.jpyepez.com/BecomeHoratio/",
                "twitter:title": "Become Horatio",
                "twitter:description": "Experience your own Horatio Caine moments.",
                "twitter:image": './src/assets/thumb.jpg'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }
        ]
    },
    externals: {
        "isomorphic-fetch": "fetch"
    }
};