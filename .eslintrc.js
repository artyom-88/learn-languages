module.exports = {
  root: true,
  extends: './eslint-common/index.js',
  parserOptions: {
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    tsconfigRootDir: __dirname,
  },
};
