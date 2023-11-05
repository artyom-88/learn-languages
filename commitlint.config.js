const {
  utils: { getPackages },
} = require('@commitlint/config-lerna-scopes');

module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
  rules: {
    'scope-enum': async (ctx) => [2, 'always', [...(await getPackages(ctx)), 'release']],
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test', 'revert']],
  },
};
