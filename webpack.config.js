const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [new MiniCssExtractPlugin(),
              new HtmlWebpackPlugin({
                template: './src/index.pug',
                filename: 'index.html'
              }),
              new ESLintPlugin({
                fix: true
              }),
    ],

    entry: path.resolve(__dirname, 'src/TS', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'main.js',
        clean: true
      },

    module: {
        rules: [
            { test: /\.s[ac]ss$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
            
            { test: /\.pug$/,
              loader: 'pug-loader',
              options: {
                pretty: true
              }  
            },

            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
        ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    }
}