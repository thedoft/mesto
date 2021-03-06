const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключили к проекту mini-css-extract-plugin

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        loader: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /.(png|svg|jpg|gif)$/,
        loader: 'file-loader?name=./images/[name].[ext]'
      },
      {
        test: /.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      },
      // аналогично добавьте правило для работы с html
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // применять это правило только к CSS-файлам
          test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
          loader:  [MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1}
            },
            'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к файлу index.html
      favicon: './src/images/logo.svg'
    }),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
}
