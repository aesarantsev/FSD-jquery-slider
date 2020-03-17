import { SliderModel } from "./model";
import { SliderView } from "./view";
import { InputView } from "./views/inputView";
import { SliderHandleView } from "./views/sliderHandleView";
import { AppReactor } from "./utils/customEvents";

import { EVENTS } from "./entities/events";

import "./style.css";

export interface IMethods {
  setValue: (value: number) => void;
  setSecondaryValue: (value: number) => void;
  setStep: (value: number) => void;
  getStep: () => number;
  tooltipDisplayed: (value: boolean) => void;
  setRange: (value: boolean) => void;
}

export class SliderPresenter {
  customEvents: AppReactor = new AppReactor();
  view: SliderView;
  sliderPrimaryHandlerView: SliderHandleView;
  model: SliderModel;
  inputView: InputView;
  methods: IMethods;

  constructor(settings?: SliderOptions) {
    //Preparing values
    if (settings.range && settings.values.length >= 2) {
      settings.values = settings.values.slice(0, 2);
      settings.values.sort();
    }
    //

    let customEvents = this.customEvents;
    this.model = new SliderModel(customEvents, {
      settings,
      percentValues: [],
      points: []
    });
    this.view = new SliderView(this.model.get());

    //Add handlers for slider handlers
    this.view.addDragHandler(({ primaryValue, secondaryValue }: any): void => {
      if (primaryValue || primaryValue == 0)
        this.model.setPrimaryValue(primaryValue);
      if (secondaryValue || secondaryValue == 0)
        this.model.setSecondaryValue(secondaryValue);
    });
    //

    //Inputs add change handler
    for (let i = 0; i <= 1; i++) {
      if (settings.inputs[i]) {
        this.inputView = new InputView(settings.inputs[i], !i);
        this.inputView.addInputChangeHandler(
          (value: number, isPrimaryInput: boolean) => {
            this.model.setValueFromInput(value, isPrimaryInput);
          }
        );
      }
    }

    //Register change value event
    customEvents.registerEvent(EVENTS.changeValue);
    customEvents.addEventListener(EVENTS.changeValue, () => {
      this.view.updateView(this.model.get());
    });

    this.methods = {
      setValue: value => {
        this.model.setValueFromInput(value, true);
      },
      setSecondaryValue: value => {
        this.model.setValueFromInput(value, false);
      },
      setStep: value => {
        this.model.setStep(value);
      },
      getStep: () => {
        return this.model.get().settings.step;
      },
      tooltipDisplayed: value => {
        this.model.setToltipDisplayed(value);
      },
      setRange: value => {
        this.model.setRange(value);
      }
    };
  }

  getView = (): SliderView => {
    return this.view;
  };
}
