export default class ColumnChart {
  constructor({
    data = [],
    label = "",
    value = "",
    link = "",
    formatHeading = (val) => val,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.chartHeight = 50;

    this.render();
  }

  getTemplate() {
    return `${this.getColumnTitle()} ${this.getColumnContainer()}`;
  }

  getColumnTitle() {
    return `<div class="column-chart__title">
      Total ${this.label}
      ${this.link ? this.getLink() : ""}
      </div>`;
  }

  getLink() {
    return `<a href="/${this.link}" class="column-chart__link">View all</a>`;
  }

  getColumnContainer() {
    return `<div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.formatHeading(
    this.value
  )}</div>
      <div data-element="body" class="column-chart__chart">${this.getColumns(
    this.data
  )}</div>
      </div>`;
  }

  getColumnContainerEmpty() {
    return `<div class="column-chart__container">
      <div class="column-chart__header">${this.formatHeading(this.value)}</div>
      <div class="column-chart__chart"></div>
      </div>`;
  }

  getColumns(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data
      .map((item) => {
        const percent = ((item / maxValue) * 100).toFixed(0);
        const val = Math.floor(item * scale);
        return this.getSingleColumn(val, percent);
      })
      .join("");
  }

  getSingleColumn(val, percent) {
    return `<div style="--value: ${val}" data-tooltip="${percent}%"></div>`;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.style = `--chart-height: ${this.chartHeight}`;
    wrapper.classList.add("column-chart");
    if (!this.data?.length) {
      wrapper.classList.add("column-chart_loading");
    }

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }

  update(newData = []) {
    this.element.querySelector(".column-chart__chart").innerHTML =
      this.getColumns(newData);
  }

  destroy() {
    this.element.remove();
  }

  remove() {
    this.element.remove();
  }
}
