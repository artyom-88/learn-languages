module.exports = {
  extends: '../eslint-common/index.cjs',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
