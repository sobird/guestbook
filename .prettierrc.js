module.exports = {
  // 每行代码长度 默认80
  printWidth: 120,
  // 每个tab相当于多少个空格 默认2
  tabWidth: 2,
  // 是否使用tab进行缩进 默认false
  useTabs: false,
  // 声明结尾使用分号 默认true
  semi: true,
  // 使用单引号 默认false
  singleQuote: true,
  /**
   * 对象属性的引号使用
   *
   * "as-needed" 仅在需要时在对象属性周围添加引号。
   * "consistent" 如果对象中至少有一个属性需要引号，请引用所有属性。
   * "preserve" 保留用户输入的情况
   */
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号，默认值为false
  jsxSingleQuote: true,
  // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  trailingComma: 'es5',
  // 字面量对象括号中的空格，默认值为true
  bracketSpacing: true,
  /**
   * 多行JSX中的 > 放置在最后一行的结尾，而不是另起一行 默认值为false
   *
   * false:
   * <button
   *   className="prettier-class”
   *   id="prettier-id”
   *   onClick={this.handleClick}
   * >
   *   Click Here
   * </button>
   *
   * true:
   * <button
   *   className="prettier-class”
   *   id="prettier-id”
   *   onClick={this.handleClick}>
   *   Click Here
   * </button>
   */
  jsxBracketSameLine: false,
  /**
   * 箭头函数参数括号 默认avoid 可选 avoid always
   * avoid 能省略括号的时候就省略 例如x => x
   * always 总是有括号
   */
  arrowParens: 'avoid',
  // 格式化文件中某一段代码，默认格式化整个文件
  rangeStart: 0,
  rangeEnd: Infinity,
  // 格式化的解析器，默认值为babylon(until v1.13.0)
  // parser: 'babylon',
  /**
   * 指定要使用的文件名，以推断要使用哪个解析器。
   * 该选项仅在CLI和API中有用。在配置文件中使用它没有意义。
   */
  filepath: '',
  /**
   * Prettier可以限制自己只格式化在文件顶部包含特殊注释(称为pragma)的文件。
   * 这在逐渐将大型、未格式化的代码库转换为更漂亮的代码库时非常有用。
   * 
   * @prettier
   */
  requirePragma: false,

  /**
   * Prettier可以在文件顶部插入一个特殊的@format标记，指定该文件已使用Prettier进行格式化。
   * 当与——require-pragma选项一起使用时，效果很好。
   * 如果在文件的顶部已经有一个文档块，那么这个选项将添加一个带有@format标记的换行符。
   * 
   * @prettier
   */
  insertPragma: false,
  /**
   * "always" - Wrap prose if it exceeds the print width.
   * "never" - Un-wrap each block of prose into one line.
   * "preserve" - Do nothing, leave prose as-is. First available in v1.9.0
   */
  proseWrap: 'preserve',

  /**
   * "css" - 遵守CSS display 属性的默认值
   * "strict"  - 空格被认为是敏感的
   * "ignore" - 空格被认为是不敏感的
   */
  htmlWhitespaceSensitivity: 'ignore',
  // 是否缩进Vue文件中的脚本和样式标签 默认值为false
  vueIndentScriptAndStyle: false,
  /**
   * 设置统一的行结尾样式（适用于v1.15.0+） 默认值为lf
   * 
   * "lf" – 仅换行（\ n），在Linux和macOS以及git repos内部通用
   * "crlf" - 回车符+换行符（\ r \ n），在Windows上很常见
   * "cr" - 仅回车符（\ r），很少使用
   * "auto" - 保持现有的行尾（通过查看第一行后的内容对一个文件中的混合值进行归一化）
   */
  endOfLine: 'lf',
  /**
   * 控制Prettier是否格式化文件中嵌入的引用代码。
   * 
   * "auto" - 如果pretty可以自动识别，则格式化嵌入的代码。
   * "off" - 永远不要自动格式化嵌入代码。
   */
  embeddedLanguageFormatting: 'auto',
  // 在HTML、Vue和JSX中是否强制每行使用单个属性。默认值为false
  singleAttributePerLine: false
};
