import $ from "jquery";

import { AppReactor } from "./mvp-expample/utils";
// import { ListPresenter } from "./mvp-expample/presenter";
import { SliderPresenter } from "./mvp-slider/presenter";

const defaultSettings: SliderOptions = {
  startValue: 0,
  endValue: 100,
  stepSize: 1,
  startPosition: 1,
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
    let slider = new SliderPresenter(customEvents, settings);
    //let list = new ListPresenter(customEvents);
    //this.append(list.getView().getHtml());
    this.append(slider.getView().getHtml());
    return this;
  };
})(jQuery);
