export class Section {
  constructor({ items, renderer }, selector) {
    if (!Array.isArray(items)) {
      items = [items];
    }
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
  renderer = (newItem) => {
    this.items.forEach((item) => {
      const element = this.rendererFunction(item);
      this.addItem(element);
      if (newItem) {
        this.addNewItem(element);
      }
    });
  };
}
