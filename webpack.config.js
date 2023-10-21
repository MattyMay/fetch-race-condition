const path = require("path");

let entry = "./demo/js/main.jsx";

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.join(__dirname, "demo/static/js/"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/transform-runtime"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
