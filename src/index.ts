import $ from "jquery";

import "./plugin/slider";
import "./plugin/style.css";

let settingsOne = {
  startValue: 0,
  endValue: 20,
  stepSize: 2,
  startPosition: 6,
  range: false
};
$("#root").slider(settingsOne);

let settingsTwo = {
  startValue: 4,
  endValue: 32,
  stepSize: 4,
  startPosition: 8,
  range: false
};
$("#root2").slider(settingsTwo);

$("#root3").slider();
