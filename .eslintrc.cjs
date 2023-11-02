/**
 * 0 = off, 1 = warning, 2 = error
 */

module.exports = {
  env: { browser: true, es2020: true, node: true, },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    // 替代基础的 indent 规则
    '@typescript-eslint/no-explicit-any': 0,

    // 替代基础的 indent 规则
    '@typescript-eslint/indent': ['error', 2],
    // 需要一致的成员声明顺序
    '@typescript-eslint/member-ordering': 0,
    // 不需要this使用别名
    '@typescript-eslint/no-this-alias': [
      'off',
      {
        allowDestructuring: true,
        allowedNames: ['self'],
      },
    ],
    
    // eslint-plugin-react-refresh
    'react-refresh/only-export-components': 'off',
    // jsx缩进
    // 'react/jsx-indent': ['error', 2],
    // jsx props 缩进
    // 'react/jsx-indent-props': ['error', 2],
    // 当prop的值显式为true时，省略该值
    'react/jsx-boolean-value': 'off',
    // jsx props 不允许使用扩展运算符
    'react/jsx-props-no-spreading': 'off',

    // 使用2个空格缩进
    'indent': ['error', 2, { SwitchCase: 1 }],
    // TS 中，该规则会对 interface 中 property 的定义进行检查，和规则本身的初衷并不一致，所以缩减限制范围
    'no-restricted-globals': 'off',
    // 禁止javascript:url
    'no-script-url': 'off',
    // 不允许指定的语法
    'no-restricted-syntax': 'off',
    // 不允许使用未使用的表达式
    'no-unused-expressions': 'off',
    // 箭头函数参数周围是否需要括号
    'arrow-parens': 'off',
    // return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 'off',
    // import x from './m' 关闭m没有后缀的告警
    'import/extensions': 'off',
    // 
    'import/no-unresolved': 'off',
    // 
    'no-mixed-operators': 0,
    
    
    'import/no-named-as-default': 'off',
    // 不允许使用位运算符
    'no-bitwise': ['off', { allow: ['&', '|'] }],
    // 箭头函数是否换行
    'implicit-arrow-linebreak': 'off',
    // 除非/*global*/注释中提到，否则不允许使用未声明的变量
    'no-undef': 'error',
  },
}
