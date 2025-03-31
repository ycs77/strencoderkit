import ycs77, { GLOB_SRC, GLOB_TESTS } from '@ycs77/eslint-config'

export default ycs77({
  typescript: true,
})
  .append({
    files: [GLOB_SRC],
    rules: {
      'style/operator-linebreak': 'off',
    },
  })
  .append({
    files: GLOB_TESTS,
    rules: {
      'antfu/consistent-list-newline': 'off',
      'test/prefer-lowercase-title': 'off',
    },
  })
