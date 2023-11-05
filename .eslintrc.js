module.exports = {
  root: true,
  extends: './packages/eslint-common/index.js',
  parserOptions: {
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    tsconfigRootDir: __dirname,
  },
};
