# Crud Model Class
本类用于生成模型对象，模型对象可以快速获取某个属性的某些特性，配合增删改查组件可以快速制作此类页面

例子：

    import Model from 'crud-model-class'

    var src = {
      id: ['编号', null, { minWidth: 50, tableOnly: true }],
      status: [
        '状态',
        'select',
        {
          mapper: { 1: '未审核', 2: '已通过', 3: '未通过' },
          minWidth: 70,
          tableOnly: true,
          default: '1'
        }
      ],
      title: ['标题文字', null, { minWidth: 120, required: true }],
    }

    export default new Model(src)