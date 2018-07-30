class ModelAttr {
  constructor (prop, label, type, extra) {
    this.prop = prop
    this.label = label

    this.type = type || 'text' // text|textarea|select|bool|int|natural|tel|date|time|file|image|parent|...
    if (this.type == 'parent') {
      var childAttrs = []
      for (var i in extra.children) {
        childAttrs.push(new ModelAttr(i, ...extra.children[i]))
      }
      extra.children = childAttrs
    }

    this.maxLength = 255

    if (extra) Object.assign(this, extra)
    this.extraRules = this.extraRules || []

    if (this.mapper && !this.removeFormatter) {
      this.formatter = function (row, column, cellValue) {
        return this.mapper[cellValue]
      }
    }
    /*
    extra = {
      children: Object, //只有parent类型才能设置，
      default: any, //新增时填入的默认值
      disableEdit: boolean, //是否禁止编辑
      extraRules: Array, //额外校验规则
      hideInInsert: boolean, //新增里隐藏
      hideInEdit: boolean, //编辑里隐藏
      hideInTable: boolean, //不在表格显示
      mapper: Object, //映射对象
      minWidth: number, //表格列最小宽度
      maxLength: number, //最大长度
      multiInsert: boolean, //若为true，新增时根据此字段执行多次insert，目前只对date类型有效
      removeFormatter: boolean, //是否不生成formatter
      required: boolean, //是否必填
      ruleType: string, //校验的类型
      sortable: boolean, //表格列是否可排序
      tableOnly: boolean, //只在表格显示，不可添加和编辑
    }
    */
  }
}

export default class Model extends Array {
  constructor (src) {
    super()
    for (var i in src) {
      this.push(new ModelAttr(i, ...src[i]))
    }
    this.rules = {}
    this.forEach(attr => {
      this.rules[attr.prop] = [{
        type: attr.ruleType, //解决async-validator默认验证为字符串类型的问题
        required: attr.required||false, //解决async-validator传入undefined时效果不等于false
        message: '必填',
        trigger: 'blur',
      }, ...attr.extraRules]
    })
  }
}
