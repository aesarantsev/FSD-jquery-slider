import { SliderPresenter, IMethods } from "./mvp-slider/presenter";

const defaultSettings: SliderOptions = {
  from: 0,
  to: 100,
  step: 1,
  values: [1, 50],
  range: false,
  inputs: [],
  ui: {
    vertical: false,
    tooltip: true
  }
};

(function($) {
  let sliderPresenterMethods: IMethods;
  var methods: any = {
    init: function(this: JQuery, options: SliderOptions = {}) {
      let settings = { ...defaultSettings, ...options };
      let sliderPresenter = new SliderPresenter(settings);
      sliderPresenterMethods = sliderPresenter.methods;
      let slider = sliderPresenter.getView().getHtml();

      this.append(slider);

      return this;
    },
    setValue: function(value: number) {
      sliderPresenterMethods.setValue(value);
    },
    setSecondaryValue: function(value: number) {
      sliderPresenterMethods.setSecondaryValue(value);
    },
    getStep: function() {
      return sliderPresenterMethods.getStep();
    },
    setStep: function(value: number) {
      if (value && value > 0) sliderPresenterMethods.setStep(value);
    },
    tooltipDisplayed: function(value: boolean) {
      sliderPresenterMethods.tooltipDisplayed(value);
    },
    setRange: function(value: boolean) {
      sliderPresenterMethods.setRange(value);
    }
  };

  $.fn.slider = function(method: any, ...args): JQuery {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Метод с именем " + method + " не существует для jQuery.tooltip");
    }

    return this;
  };
})(jQuery);

$().slider();
