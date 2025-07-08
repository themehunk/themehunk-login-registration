const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    admin: path.resolve(__dirname, './src/admin/index.js'),
    public: path.resolve(__dirname, './src/public/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  mode: 'development',
  externals: {
    '@wordpress/element': 'wp.element',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/components': 'wp.components',
    '@wordpress/api-fetch': 'wp.apiFetch',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // Outputs: admin.css, public.css
    }),
  ],
};
