import ycs77 from '@ycs77/eslint-config'

export default ycs77({
  typescript: true,
})
  .append({
    rules: {
      'style/operator-linebreak': 'off',
    },
  })
