const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "ReactChatInterface",
    libraryTarget: "umd",
    globalObject: "this",
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
}

