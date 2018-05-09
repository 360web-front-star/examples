😊

## data-edit 格式

> `data-edit=''`一定要写在 类名为`.template`的直接子元素中。

```json
[
  {
    "className": "info"
  },
  {
    "className2": "info2"
  }
  /**
      className: 需要修改标签的class;

      className格式: `edit-${className}`,
      如果需要修改图片：
      className格式: `edit-img-${className}`,

      info: 修改内容的提示信息
   */
];
```
