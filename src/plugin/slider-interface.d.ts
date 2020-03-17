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
  (method?: string|object, ...args:any): JQuery;
}

interface Slider extends SliderFunction {}

interface JQuery {
  slider: Slider;
}
