interface SliderOptions {
  stepSize?: number;
  range?: boolean;
  ui?: {
    vertical?: boolean;
    tooltip?: boolean;
    showInput?: boolean;
  };
}

interface SliderFunction {
  (options?: SliderOptions): JQuery;
}

interface Slider extends SliderFunction {}

interface JQuery {
  slider: Slider;
}
