const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/page/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/"), // Anda dapat memasukkan nama apa saja, tetapi mari kita gunakan 'dist' di sini 'dist'
    filename: "main.js", // Anda juga dapat memasukkan nama sesuai keinginan, tetapi mari kita gunakan 'main.js'.
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // menentukan folder tempat aplikasi dan isinya akan disalurkan
    compress: true, // ini akan mempercepat pemuatan file dalam mode pengembang
    port: 8080, // situs akan terbuka di localhost:8080 (Anda dapat memilih port lain)
    open: true, // situs akan terbuka secara otomatis di browser setelah menjalankan npm run dev
  },
  module: {
    rules: [
      // ini adalah array berisi kaidah
      // tambahkan objek berisi kaidah untuk Babel ke dalamnya
      {
        // ekspresi regular yang mencari semua file js
        test: /\.js$/,
        // semua file harus diproses oleh babel-loader
        loader: "babel-loader",
        // kecualikan folder node_modules, kita tidak perlu memproses file di dalamnya
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
