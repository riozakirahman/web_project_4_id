export class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.rendererFunction = renderer;
    this.selector = document.querySelector(selector);
  }

  addItem = (element) => {
    this.selector.append(element);
  };

  addNewItem = (element) => {
    this.selector.prepend(element);
  };
  renderer = () => {
    this.items.forEach((item) => {
      const element = this.rendererFunction(item);
      this.addItem(element);
    });
  };
}
