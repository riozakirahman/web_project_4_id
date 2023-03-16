const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // menyambungkan plugin ke PostCSS
  plugins: [
    // menyambungkan autoprefixer
    autoprefixer,
    // meneruskan objek dengan opsi saat menghubungkan cssnano:
    cssnano({ preset: "default" }), // menyetel pengaturan minification default
  ],
};
