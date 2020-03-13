import $ from "jquery";

import "./plugin/slider";
import "./plugin/style.css";

let settingsOne = {
  startValue: 0,
  endValue: 1000,
  stepSize: 100,
  values: [200],
  range: false,
  ui: {
    tooltip: true
  }
};
$("#root").slider(settingsOne);

let settingsTwo = {
  startValue: 4,
  endValue: 32,
  stepSize: 4,
  range: true,
  values: [8, 24],
  ui: {
    tooltip: false
  }
};
$("#root2").slider(settingsTwo);

$("#root3").slider({ ui: { tooltip: true } });
