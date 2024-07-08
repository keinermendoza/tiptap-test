const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        editor_app:'./src/react/editor_app.jsx',
    },
    output: {
        'path': path.resolve(path.dirname(__dirname), 'backend', 'staticfiles', 'js'),
        'filename': '[name].js'
    },

    module: {
        rules: [
            // for procces css
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // for procces images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000
    // }
    
}
