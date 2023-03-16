const presets = [
  [
    "@babel/preset-env",
    {
      // preset yang ingin Anda gunakan
      targets: {
        // versi browser yang ingin Anda dukung
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },

      // gunakan polyfill untuk browser yang disebutkan pada opsi "target" di atas
      // Babel menggunakan polyfill dari library core-js
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };
