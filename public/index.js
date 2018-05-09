"use strict";

class V360 {
  constructor() {
    const list = $(".template").children();
    this.edit = $(".edit");
    // 类型
    this.type = {
      text: "text",
      textarea: "textarea",
      image: "image",
      images: "images",
      list: "list"
    };
    // 获取全部可编辑直接子元素
    this.editDoms = Array.from(list);
    this.bindEvent();
    this.changeView();
  }

  checkClassName(className) {
    const str = className.split("-");
    for (let classNameElement of str) {
      if (className[0] !== "edit") {
        console.error(`class前缺少edit`);
      } else if (className[2] && className[2]) {
      }
    }
  }

  bindEvent() {
    this.editDoms.forEach(ele => {
      $(ele).click(that => {
        const current = $(that.currentTarget);
        let data = current.data().edit;
        this.renderControl(data);
      });
    });
  }

  /***
   * 通过class name 获取类型
   * @param className
   * @returns {*|string}
   */
  getType(className) {
    const type = className.split("-")[2];
    return type;
  }

  renderControl(data) {
    this.edit.html("");
    for (let className of Object.keys(data)) {
      const type = className.split("-")[2];
      switch (type) {
        case this.type.text:
          this.renderText(className, data[className]);
          break;
        case this.type.textarea:
          this.renderTextarea(className, data[className]);
          break;
        case this.type.image:
          this.renderImage(className, data[className]);
          break;
        case this.type.images:
          this.renderImages(className, data[className]);
          break;
        case this.type.list:
          this.renderList(className, data[className]);
          break;
      }
    }
  }

  renderText(className, data) {
    let controlHtml = this.edit.html();
    let controlItem = `<div class="edit-item-type">
        <h4>${data}</h4>
        <input type="text" title=${data} class="${className}-control">
      </div>`;
    controlHtml += controlItem;
    this.edit.html(controlHtml);
  }

  renderTextarea(className, data) {
    let controlHtml = this.edit.html();
    let controlItem = `<div class="edit-item-type">
  <h4>${data}</h4>
    <textarea cols="30" rows="10" placeholder="如果需要换行，可使用</br>" class="${className}-control"></textarea>
  </div>`;
    controlHtml += controlItem;
    this.edit.html(controlHtml);
  }

  renderImage(className, data) {
    let controlHtml = this.edit.html();
    let controlItem = `<div class="edit-item-type">
    <h4>${data}</h4>
     <input type="text" title=${data} class="${className}-control">
  </div>`;
    controlHtml += controlItem;
    this.edit.html(controlHtml);
  }

  renderImages() {}

  renderList(className, data) {
    let controlHtml = this.edit.html();
    const list = Array.from($(`.${className} li`));
    let controlItemH = `<div class="edit-item-type">
  <h4>${data}</h4>`;

    list.forEach((ele, index) => {
      controlItemH += `
      <input type="text" title=${data}-${index} class="${className}-control-${index}">
      `;
    });
    controlHtml += controlItemH;
    this.edit.html(controlHtml);
  }

  changeView() {
    this.edit.on("input", ele => {
      const target = $(ele.target);
      const str = target.attr("class");
      const controlVal = target.val();
      let viewClass = str.substr(0, str.length - 8);

      console.log(viewClass);

      if (this.getType(viewClass) === this.type.image) {
        $(`.${viewClass}`).attr("src", controlVal);
      } else if (this.getType(viewClass) === this.type.list) {
        viewClass = str.substr(0, str.length - 10);
        // TODO 安全验证！<script>注入
        // 控制第几个input
        const index = str.substr(str.length - 1, 1);
        $(`.${viewClass}`)
          .find("li")
          .eq(index)
          .text(controlVal);
      } else {
        $(`.${viewClass}`).html(controlVal);
      }
    });
  }
}

new V360();
