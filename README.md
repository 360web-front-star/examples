😊😊😊😊😊😊

## data-edit 格式

> `data-edit=''`一定要写在 类名为`.template`的直接子元素中。

```js
[
  {
    className: "info"
  },
  {
    className2: "info2"
  }
  /**
      className: 需要修改标签的class;

      className格式: `edit-${className}-type`

      "type":
      1. text: 少许文字
      2. textarea: 多行文字
      3. list: 列表
      4. image: 单个图片
      5. imgages: 多图

      info: 修改内容的提示信息
   */
];
```
