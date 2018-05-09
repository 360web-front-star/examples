"use strict";

const list = $(".template").children();
const arr = Array.from(list);
const edit = $(".edit");

// input输入后， 触发input事件。
edit.on("input", el => {
  const target = $(el.target);
  const inpValue = target.val();
  const targetCN = target.attr("class");
  const bindCN = targetCN.substr(0, targetCN.length - 4);
  $(bindCN).text(inpValue);
});

arr.forEach((ele, index) => {
  $(ele).click(that => {
    const current = $(that.currentTarget);
    let data = current.data().edit;
    const editArr = [];

    edit.html("");
    data.forEach(ele => {
      createEditItems(ele);
    });
    inpAddListener();
  });
});

function createEditItems(ele) {
  // 获取到需要修改的元素className
  for (let className of Object.keys(ele)) {
    // 构建编辑框
    let editItem = `<div class="edit-item">
  <h4>${ele[className]}</h4>
  <input type="text" title="" class=".${className}-inp">
</div>
        `;
    edit.html(edit.html() + editItem);
  }
}

function inpAddListener() {}
