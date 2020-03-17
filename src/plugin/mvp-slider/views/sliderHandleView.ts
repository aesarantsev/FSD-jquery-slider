import { IData } from "../model";

export class SliderHandleView {
  data: IData;

  sliderHandleElement: HTMLElement;
  isPrimarySliderHandle: boolean;

  constructor( data: IData, isPrimarySliderHandle: boolean) {
    this.data = data
    this.isPrimarySliderHandle = isPrimarySliderHandle;
    this.generateSliderHandleElement();
  }

  public updateView(): void {}

  public addChangeValueHandler = (handler: any): void => {
    this.sliderHandleElement.onmousedown = e => {
      let parentElement = this.sliderHandleElement.parentElement;
      let parentElementWidth = parentElement.offsetWidth;

      let parentElementHeight = parentElement.clientHeight;
      let parentElementCoords = getCoords(parentElement);

      var coords = getCoords(this.sliderHandleElement);

      var shiftX = e.pageX - coords.left;

      var shiftY = e.pageY - coords.top;

      this.sliderHandleElement.style.position = "absolute";
      this.sliderHandleElement.style.zIndex = "1000";
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
            if (this.sliderHandleElement.classList.contains("primary")) {
              handler({ primaryValue: this.data.points[condidatId] });
            } else if (this.sliderHandleElement.classList.contains("secondary")) {
              handler({ secondaryValue: this.data.points[condidatId] });
            }
          }
        //не выделяем текст на странице во время перетаскивания ползунка
        window.getSelection().removeAllRanges();
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        this.sliderHandleElement.onmouseup = null;
      };
    };
  };

  public generateSliderHandleElement() {
    this.sliderHandleElement = document.createElement("div");
    this.sliderHandleElement.classList.add("slider-handle");
    if (this.isPrimarySliderHandle) {
      this.sliderHandleElement.classList.add("primary");
    } else {
      this.sliderHandleElement.classList.add("secondary");
    }
  }
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