module.exports = {
  extends: ['plugin:@docusaurus/recommended', 'plugin:react/recommended', 'react-app'],
  plugins: ['@docusaurus', '@typescript-eslint'],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    parser: '@typescript-eslint/parser',
  }
};
