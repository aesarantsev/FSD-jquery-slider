import { IData } from "./model";

export class SliderView {
  data: IData;

  //===== DOM elements
  baseDiv: HTMLElement;
  sliderBaseDiv: HTMLElement;
  sliderTrackDiv: HTMLElement;
  sliderSelectionDiv: HTMLElement;
  sliderPrimaryHandlerDiv: HTMLElement;
  sliderSecondaryHandlerDiv: HTMLElement;
  sliderPrimaryTooltipSpan: HTMLElement;
  sliderSecondaryTooltipSpan: HTMLElement;
  //=====

  constructor(data: IData) {
    this.data = data;
    this.generateSliderElement(
      this.data.settings.ui.tooltip,
      this.data.settings.range,
      this.data.settings.ui.vertical
    );
    this.updateView(data);
  }

  public updateView = (data: IData): void => {
    if (this.data.settings.inputs[0]) {
      this.data.settings.inputs[0].val(data.settings.values[0]);
    }
    if (this.data.settings.inputs[1]) {
      this.data.settings.inputs[1].val(data.settings.values[1]);
    }
    if (this.data.settings.ui.vertical) {
      this.sliderPrimaryHandlerDiv.style.top = data.percentValues[0] + "%";
      this.sliderSecondaryHandlerDiv.style.top = data.percentValues[1] + "%";
    } else {
      this.sliderPrimaryHandlerDiv.style.left = data.percentValues[0] + "%";
      this.sliderSecondaryHandlerDiv.style.left = data.percentValues[1] + "%";
    }
    this.sliderPrimaryHandlerDiv.setAttribute(
      "value",
      data.settings.values[0].toString()
    );
    if (this.data.settings.ui.tooltip) {
      this.sliderPrimaryTooltipSpan.innerHTML = data.settings.values[0].toString();
      if (this.data.settings.range && data.settings.values[1])
        this.sliderSecondaryTooltipSpan.innerHTML = data.settings.values[1].toString();
    }
  };

  public addDragHandler = (handler: any): void => {
    this.sliderPrimaryHandlerDiv.onmousedown = e => {
      this.sliderHandlerOnMouseDown(this.sliderPrimaryHandlerDiv, e, handler);
    };

    this.sliderSecondaryHandlerDiv.onmousedown = e => {
      this.sliderHandlerOnMouseDown(this.sliderSecondaryHandlerDiv, e, handler);
    };
  };

  private sliderHandlerOnMouseDown = (
    sliderHandler: HTMLElement,
    e: MouseEvent,
    saveData: any
  ): void => {
    let parentElement = sliderHandler.parentElement;
    let parentElementWidth = parentElement.offsetWidth;

    let parentElementHeight = parentElement.clientHeight;
    let parentElementCoords = getCoords(parentElement);

    var coords = getCoords(sliderHandler);

    var shiftX = e.pageX - coords.left;

    var shiftY = e.pageY - coords.top;

    sliderHandler.style.position = "absolute";
    sliderHandler.style.zIndex = "1000";
    document.onmousemove = e => {
      let condidat = customCeil(
        this.data.settings.ui.vertical
          ? ((e.pageY - shiftY - parentElementCoords.top) * 100) /
              parentElementHeight
          : ((e.pageX - shiftX - parentElementCoords.left) * 100) /
              parentElementWidth
      );

      let condidatId = this.data.percents.indexOf(condidat);
      if (condidat <= 100 && condidat >= 0)
        if (condidatId != -1) {
          if (sliderHandler.classList.contains("primary")) {
            saveData({ primaryValue: this.data.points[condidatId] });
          } else if (sliderHandler.classList.contains("secondary")) {
            saveData({ secondaryValue: this.data.points[condidatId] });
          }
        }
      //не выделяем текст на странице во время перетаскивания ползунка
      window.getSelection().removeAllRanges();
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      sliderHandler.onmouseup = null;
    };
  };

  private generateSliderElement = (
    tooltip: boolean,
    range: boolean,
    vertical: boolean
  ): void => {
    this.baseDiv = document.createElement("div");
    this.baseDiv.style.width = "100%";
    this.baseDiv.style.height = "100%";

    this.sliderBaseDiv = document.createElement("div");
    this.sliderBaseDiv.className = "slider";
    if (vertical) this.sliderBaseDiv.classList.add("vertical");

    this.sliderTrackDiv = document.createElement("div");
    this.sliderTrackDiv.classList.add("slider-track");

    this.sliderSelectionDiv = document.createElement("div");
    this.sliderSelectionDiv.classList.add("slider-selection");
    this.sliderSelectionDiv.style.width = "0%";

    this.sliderPrimaryHandlerDiv = document.createElement("div");
    this.sliderPrimaryHandlerDiv.classList.add("slider-handle");
    this.sliderPrimaryHandlerDiv.classList.add("primary");

    this.sliderSecondaryHandlerDiv = document.createElement("div");
    this.sliderSecondaryHandlerDiv.classList.add("slider-handle");
    this.sliderSecondaryHandlerDiv.classList.add("secondary");

    this.sliderPrimaryTooltipSpan = document.createElement("span");
    this.sliderPrimaryTooltipSpan.classList.add("slider-tooltip");

    this.sliderSecondaryTooltipSpan = document.createElement("span");
    this.sliderSecondaryTooltipSpan.classList.add("slider-tooltip");

    this.sliderTrackDiv.append(this.sliderSelectionDiv);
    if (tooltip) {
      this.sliderPrimaryHandlerDiv.append(this.sliderPrimaryTooltipSpan);
      this.sliderSecondaryHandlerDiv.append(this.sliderSecondaryTooltipSpan);
    }
    this.sliderBaseDiv.append(
      this.sliderTrackDiv,
      this.sliderPrimaryHandlerDiv
    );

    if (range && this.data.settings.values[1])
      this.sliderBaseDiv.append(
        this.sliderTrackDiv,
        this.sliderSecondaryHandlerDiv
      );

    this.baseDiv.append(this.sliderBaseDiv);
  };

  public getHtml = () => {
    return this.baseDiv;
  };
}

function getCoords(elem: HTMLElement) {
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
