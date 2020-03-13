interface SliderOptions {
  startValue?: number;
  endValue?: number;
  stepSize?: number;
  values?: Array<number>;
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
