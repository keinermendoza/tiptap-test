const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
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
        ]
    },
    
}
