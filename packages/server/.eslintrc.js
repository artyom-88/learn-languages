module.exports = {
  extends: '../eslint-common/index.js',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
