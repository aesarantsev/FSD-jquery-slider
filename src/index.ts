import $ from "jquery";

import "./plugin/slider";
import "./plugin/style.css";

let settingsOne = {
  startValue: 0,
  endValue: 100,
  stepSize: 1,
  values: [50, 10],
  inputs: [$("#root3-input1"), $("#root3-input2")],
  range: true,
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
  from: 100,
  to: 200,
  step: 10,
  values: [110, 120],
  range: true,

  ui: { tooltip: true, vertical: true }
});

$("input").slider();
