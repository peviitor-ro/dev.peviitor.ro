const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require("dotenv").config({ path: "./.env" });

module.exports = (env, argv) => {
  const config = {
    entry: {
      index: "./src/index.jsx"
    },
    devServer: {
      static: "./dist",
      historyApiFallback: {
        rewrites: [
          // shows favicon
          { from: /favicon.ico/, to: "[path/to/favicon]" }
        ]
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        favicon: "public/favicon.ico",
        publicPath: env.target === "php" ? "dist/" : "./"
      }),
      // Add the CopyWebpackPlugin configuration
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public", // Source folder with your static files
            to: "./", // Destination folder in the 'dist' directory
            globOptions: {
              ignore: ["**/index.html", "**/favicon.ico"] // Excludes index.html & favicon.ico from the copying process
            }
          }
        ]
      }),
      new DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css" // Adjust the filename pattern as needed
      })
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "../dist"),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Extracts CSS into separate file
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.css$/i,
          use: [
            // Extracts CSS into separate file
            MiniCssExtractPlugin.loader,
            // Mainly needed for react-notifications
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        },
        {
          test: /\.(?:js|jsx|mjs|cjs)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource"
        }
      ]
    },
    resolve: {
      alias: {
        CommonComponents: path.resolve(__dirname, "src/pages/common_components"),
        Data: path.resolve(__dirname, "src/assets/data"),
        Fonts: path.resolve(__dirname, "src/assets/fonts"),
        Images: path.resolve(__dirname, "src/assets/images"),
        Styles: path.resolve(__dirname, "src/assets/styles")
      },
      extensions: [".js", ".jsx"]
    }
  };
  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
    config.mode = "development";
  } else {
    config.devtool = false;
    config.mode = "production";
  }
  return config;
};
