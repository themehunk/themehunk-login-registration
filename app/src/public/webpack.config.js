const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaults,
    entry: {
        frontend: path.resolve(process.cwd(), 'src', 'frontend.js'),
        'customizer-preview': path.resolve(process.cwd(), 'src', 'customizer-preview.js'), // Add this line
    },
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
        clean: true,
    },
};
