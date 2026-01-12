import ycs77, { GLOB_TESTS } from '@ycs77/eslint-config'

export default ycs77({
  typescript: true,
  ignores: ['**/*.md/**'],
})
  .append({
    files: GLOB_TESTS,
    rules: {
      'antfu/consistent-list-newline': 'off',
      'test/prefer-lowercase-title': 'off',
    },
  })
