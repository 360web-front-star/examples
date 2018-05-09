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
    <textarea cols="30" rows="10" class="${className}-control"></textarea>
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

  renderList() {}

  changeView() {
    this.edit.on("input", ele => {
      const target = $(ele.target);
      const str = target.attr("class");
      const controlVal = target.val();
      const viewClass = str.substr(0, str.length - 8);
      if (this.getType(viewClass) === "image") {
        $(`.${viewClass}`).attr("src", controlVal);
      } else {
        $(`.${viewClass}`).text(controlVal);
      }
    });
  }
}

new V360();
