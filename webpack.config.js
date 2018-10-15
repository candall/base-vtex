const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    entry: { main: './src/index.ts', 'checkout5-custom': './src/checkout5-custom.ts', 'checkout-confirmation-custom': './src/checkout-confirmation-custom.ts'},
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: ["node_modules"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
},
{
    entry: {main:'./src/scss/main.scss', 'checkout5-custom':'./src/scss/checkout5-custom.scss'},
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: './[name].css',
            allChunks: false,
        })
    ],
    resolve: {
        modules: ["node_modules"]
    },
    output: {
        filename: '[name].css',
        path: path.resolve(__dirname, 'dist')
    }
}];