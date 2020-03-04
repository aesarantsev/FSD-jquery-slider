import $ from "jquery";

import { AppReactor } from "./utils";
import { ListPresenter } from "./presenter";

(function($) {
  $.fn.slider = function(this: JQuery, options?: SliderOptions): JQuery {
    let defaultSettings: SliderOptions = {
      stepSize: 1,
      range: false,
      ui: {
        vertical: false,
        tooltip: false,
        showInput: true
      }
    };
    let settings = $.extend(defaultSettings, options);

    let customEvents = new AppReactor();
    let list = new ListPresenter(customEvents);
    this.append(list.getView().getHtml());

    return this;
  };
})(jQuery);
