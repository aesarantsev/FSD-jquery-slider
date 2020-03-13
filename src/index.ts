import $ from "jquery";

import "./plugin/slider";
import "./plugin/style.css";

let settingsOne = {
  startValue: 0,
  endValue: 100,
  stepSize: 1,
  values: [1],
  range: false,
  ui: {
    tooltip: true
  }
};
$("#root").slider(settingsOne);

let settingsTwo = {
  startValue: 0,
  endValue: 100,
  stepSize: 1,
  values: [1],
  range: false,
  ui: {
    tooltip: true
  }
};
$("#root2").slider(settingsTwo);


$("#root3").slider({
  startValue: 100,
  endValue: 200,
  stepSize:10,
  values: [110, 120],
  range: true,
  ui: { tooltip: true, vertical: true }
});
