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
//         new SocialTags({
//             appUrl: 'https://projects.jpyepez.com/WikiClassifier/',
//       facebook: {
//         'og:url': "https://projects.jpyepez.com/WikiClassifier/",
//         'og:type': "website",
//         'og:title': "Wiki Classifier",
//         'og:image': './src/assets/thumb.png',
//         'og:description': "Web App that gets images from Wikipedia and classifies them using the MobileNet model.",
//         'og:site_name': "JP Yepez - Projects",
//         'og:locale': "en_US",
//       },
//       twitter: {
//         "twitter:card": "summary",
//         "twitter:creator": "@jpyepezartist",
//         "twitter:url": "https://projects.jpyepez.com/WikiClassifier/",
//         "twitter:title": "Wikipedia Image Classifier",
//         "twitter:description": "Web App that gets images from Wikipedia and classifies them using the MobileNet model.",
//         "twitter:image": './src/assets/thumb.png'
//       }
//         })
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
                test: /\.(png|jpg|gif)$/,
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