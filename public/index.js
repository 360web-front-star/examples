"use strict";

class V360 {
  constructor(options) {
    if (options) {
      this.edit = $(`${options.edit}`);
      this.editDoms = $(`${options.template}`).children();
    }

    // 类型
    this.type = {
      text: "text",
      textarea: "textarea",
      image: "image",
      images: "images",
      list: "list",
      link: "link",
      links: "links"
    };
    // 获取全部可编辑直接子元素
    this.bindEvent();
    this.changeView();
  }

  bindEvent() {
    this.editDoms.each((_, ele) => {
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
      const type = this.getType(className);
      if (type === this.type.text || type === this.type.link) {
        this.renderText(className, data[className]);
      } else if (type === this.type.textarea) {
        this.renderTextarea(className, data[className]);
      } else if (type === this.type.image) {
        this.renderText(className, data[className]);
      } else if (
        type === this.type.images ||
        type === this.type.list ||
        type === this.type.links
      ) {
        this.renderList(className, data[className]);
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

  renderList(className, data) {
    let controlHtml = this.edit.html();
    const list = $(`.${className} li`);
    let controlItemH = `<div class="edit-item-type">
  <h4>${data}</h4>`;

    list.each(index => {
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
      const controlClass = target.attr("class");
      const controlVal = target.val();
      let viewClass = controlClass.substr(0, controlClass.length - 8);
      const viewTarget = $(`.${viewClass}`);

      switch (this.getType(viewClass)) {
        case this.type.image:
          viewTarget.attr("src", controlVal);
          break;
        case this.type.list:
          viewClass = controlClass.substr(0, controlClass.length - 10);
          // ！！！安全验证！ xss注入
          // 控制第几个input
          const index = controlClass.substr(controlClass.length - 1, 1);
          $(`.${viewClass}`)
            .find("li")
            .eq(index)
            .text(controlVal);
          break;

        case this.type.images:
          viewClass = controlClass.substr(0, controlClass.length - 10);
          // ！！！安全验证！ xss注入
          // 控制第几个input
          const index2 = controlClass.substr(controlClass.length - 1, 1);
          $(`.${viewClass}`)
            .find("li img")
            .eq(index2)
            .attr("src", controlVal);
          break;

        case this.type.link:
          viewTarget.attr("href", controlVal);
          break;

        case this.type.links:
          viewClass = controlClass.substr(0, controlClass.length - 10);
          // ！！！安全验证！ xss注入
          // 控制第几个input
          const index3 = controlClass.substr(controlClass.length - 1, 1);
          $(`.${viewClass}`)
            .find("li a")
            .eq(index3)
            .attr("href", controlVal);
          break;

        default:
          viewTarget.text(controlVal);
          break;
      }
    });
  }
}

new V360({
  edit: ".edit",
  template: ".template"
});
