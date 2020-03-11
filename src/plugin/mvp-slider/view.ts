import { IData } from "./model";

export class SliderView {
  data: IData;
  html: HTMLElement;
  ball: HTMLElement;
  tooltip: HTMLElement;
  tooltipHtml: string;

  constructor(data: IData) {
    this.data = data;

    this.tooltipHtml = this.data.ui.tooltip
      ? `<span class="slider-tooltip">Tooltip text</span>`
      : "";

    this.html = document.createElement("div");
    this.html.className = "slider";
    this.html.innerHTML = `
      <div class="slider-track">
        <div class="slider-selection" style="width: 0%;"></div>
      </div>
      <div id="test" class="slider-handle" >
        ${this.tooltipHtml}
      </div>
  `;

    this.ball = this.html.getElementsByClassName(
      "slider-handle"
    )[0] as HTMLElement;

    this.tooltip = this.html.getElementsByClassName(
      "slider-tooltip"
    )[0] as HTMLElement;

    this.updateView(data);
  }

  updateView = (data: IData) => {
    this.ball.style.left = data.percentValue + "%";
    this.ball.setAttribute("value", data.value.toString());
    if (this.data.ui.tooltip) this.tooltip.innerHTML = data.value.toString();
  };

  addDragHandler = (handler: any) => {
    //Ball onmousedown
    this.ball.onmousedown = e => {
      let parentElement = this.ball.parentElement;
      let parentElementWidth = parentElement.offsetWidth;

      var coords = getCoords(this.ball);
      var shiftX = e.pageX - coords.left;

      this.ball.style.position = "absolute";
      this.ball.style.zIndex = "1000";

      document.onmousemove = e => {
        let condidat = customCeil(
          ((e.pageX - shiftX) * 100) / parentElementWidth
        );
        let condidatId = this.data.percents.indexOf(condidat);
        if (condidat <= 100 && condidat >= 0)
          if (condidatId != -1) {
            handler({ value: this.data.points[condidatId] });
          }
        //не выделяем текст на странице во время перетаскивания ползунка
        window.getSelection().removeAllRanges();
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        this.ball.onmouseup = null;
      };
    };
  };

  getHtml = () => {
    return this.html;
  };
}

function getCoords(elem: HTMLElement) {
  // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function customCeil(value: number): number {
  let res = Math.ceil(value);

  if (value > 0 && value < 1) {
    res = 0;
  }
  if (value > 99 && value < 100) {
    res = 100;
  }

  return res;
}
