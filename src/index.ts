import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./plugin/slider";
import "./style.css";

$(".slider-1").slider();
$(".slider-2").slider({ range: true });
$(".slider-3").slider({
  range: true,
  inputs: [$("#primary-input-slider-3"), $("#secondary-input-slider-3")]
});

$(".slider-4").slider({
  range: true,
  inputs: [$("#primary-input-slider-4"), $("#secondary-input-slider-4")],
  ui: { vertical: true }
});

//With configure panel
let sliderElement = $(".slider-5");

sliderElement.slider({
  inputs: [$("#primary-input-slider-5"), $("#secondary-input-slider-5")]
});

$("#rangeSliderCheckbox").click(function(e) {
  if ($(this).is(":checked")) {
    sliderElement.slider("setRange", true);
  } else {
    sliderElement.slider("setRange", false);
  }
});

$("#TooltipSliderCheckbox").click(function(e) {
  if ($(this).is(":checked")) {
    sliderElement.slider("tooltipDisplayed", true);
  } else {
    sliderElement.slider("tooltipDisplayed", false);
  }
});

let stepValue: any = sliderElement.slider("getStep");
$("#StepSliderInput").val(stepValue);
$("#StepSliderInput").change(function(e) {
  let value = $(this).val();
  sliderElement.slider("setStep", +value);
});

//

// let settingsOne = {
//   startValue: 0,
//   endValue: 100,
//   stepSize: 1,
//   values: [50, 10],

//   range: true,
//   ui: {
//     tooltip: true
//   }
// };
// $("#root").slider(settingsOne);

// let settingsTwo = {
//   startValue: 0,
//   endValue: 100,
//   stepSize: 1,
//   values: [1],
//   range: false,
//   ui: {
//     tooltip: true
//   }
// };
// $("#root2").slider(settingsTwo);

// $("#root3").slider({
//   from: 100,
//   to: 200,
//   step: 10,
//   values: [110, 120],
//   range: true,
//   inputs: [$("#root3-input1"), $("#root3-input2")],
//   ui: { tooltip: true, vertical: true }
// });

setTimeout(() => {
  // $("#root3").slider("setValue", 130);
  // $("#root3").slider("setSecondaryValue", 150);
  // $("#root3").slider("setStep", 2);
  // $("#root3").slider("tooltipDisplayed", false);
}, 2000);
