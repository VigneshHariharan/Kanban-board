const path = require("path");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { entries, htmlFileNames, htmlPlugins, htmlPluginArgsSettings } = require('./codeSplitting')

// const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// const  { FirstWebpackPlugin } = require('./webPackPlugins');
// add if it js is not minified
// const TerserWebpackPlugin = require("terser-webpack-plugin")



const MiniCss = new MiniCssWebpackPlugin({
  filename:'[contentHash].css'
})


const pages = [{
  path: 'src/pages',
  filename: 'index.html',
  chunks: ['source']
},
{
  path: 'src/pages',
  filename: 'auth.html',
  chunks: ['auth']

},
]

const htmWebPackPlugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname,page.path,page.filename),
    filename: page.filename,
    inject:'body',
    chunks: [...page.chunks]
  })
})


const plugins = [ 
  ...htmWebPackPlugins,
  // ...htmlPlugins,
  // new FirstWebpackPlugin(),
 
  // new HtmlWebpackPlugin({
  //   template: path.resolve(__dirname,'src','index.html'),
  //   filename:'index.html',
  //   inject:'body',
  //   chunks:["source"]
  // })
];

const rules = [
   
        // go inside html and convert links to js require
        {
          test: /\.html$/,
          use:["html-loader"]
        },
        // copy requires to build directory
        {
          test: /\.(svg|jpg|jpeg|png|gif)$/,
          use: {
            "loader": "file-loader",
            options: {
              name:"[path][name].[ext]",
              outputPath: "assets"
            }
          }
        },
        //    {
        //   test: /\.html$/,
        //   use: {
        //     "loader": "file-loader",
        //     options: {
        //       name:"[name].[contenthash].[ext]"
        //     }
        //   },
        //   exclude:path.resolve(__dirname,'./src/pages/index.html')
        // }
       
]

if(process.env.NODE_ENV === 'production') {
  // console.log('production')
  plugins.push(new CleanWebpackPlugin())
  plugins.push(MiniCss)
  rules.push({
    test: /\.css/,
    use: [
      // extract css into files
      MiniCssWebpackPlugin.loader,
      'css-loader'
    ]
  })
}
// console.log('path.join(__dirname, "src")',path.join(__dirname, "src/**/*"))

module.exports = {
  mode: "development",
  entry: { source: "./src/pages/index.js", auth: "./src/pages/auth.js" },
  // entry: entries,
  module:{
      rules,
  },
  // optimization:{
  //   // minimizer: [new OptimizeCssPlugin()]
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename:"main.[contenthash].js",
    // clean: true,
  },
  devServer: {
    static: {
      // it will watch for file changes like in html,css
      directory: path.join(__dirname, "src/pages"),
    },
    compress: false,
    port: 4000,
  },
  plugins
};
