interface SliderOptions {
  from?: number;
  to?: number;
  step?: number;
  values?: Array<number>;
  range?: boolean;
  inputs?: Array<JQuery>;
  ui?: {
    vertical?: boolean;
    tooltip?: boolean;
  };
}

interface SliderFunction {
  (options?: SliderOptions): JQuery;
}

interface Slider extends SliderFunction {}

interface JQuery {
  slider: Slider;
}
