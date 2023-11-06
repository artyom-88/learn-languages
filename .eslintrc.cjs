module.exports = {
  root: true,
  extends: './packages/eslint-common/index.cjs',
  parserOptions: {
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    tsconfigRootDir: __dirname,
  },
};
