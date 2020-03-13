import { AppReactor } from "./mvp-expample/utils";
import { SliderPresenter } from "./mvp-slider/presenter";

const defaultSettings: SliderOptions = {
  startValue: 0,
  endValue: 100,
  stepSize: 1,
  values: [0, 50],
  range: false,
  ui: {
    vertical: false,
    tooltip: false,
    showInput: true
  }
};

(function($) {
  $.fn.slider = function(this: JQuery, options: SliderOptions = {}): JQuery {
    let settings = { ...defaultSettings, ...options };
    let customEvents = new AppReactor();
    let slider = new SliderPresenter(customEvents, settings)
      .getView()
      .getHtml();
    this.append(slider);

    return this;
  };
})(jQuery);
