import { AppReactor } from "./mvp-expample/utils";
import { SliderPresenter } from "./mvp-slider/presenter";

const defaultSettings: SliderOptions = {
  from: 0,
  to: 100,
  step: 1,
  values: [0, 50],
  range: false,
  inputs: [],
  ui: {
    vertical: false,
    tooltip: false
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
