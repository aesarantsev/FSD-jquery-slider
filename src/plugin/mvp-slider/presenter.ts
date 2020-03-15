import { SliderModel } from "./model";
import { SliderView } from "./view";
import { InputView } from "./views/inputView";
import { AppReactor } from "./utils";

import { EVENTS } from "./entities/events";

export class SliderPresenter {
  view: SliderView;
  model: SliderModel;
  inputView: InputView;
  customEvents: AppReactor;

  constructor(customEvents: AppReactor, settings?: SliderOptions) {
    //Sort values
    if (settings.range && settings.values.length >= 2) {
      settings.values.sort();
    }
    //

    this.customEvents = customEvents;

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
      if (secondaryValue || primaryValue == 0)
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
    //

    //Register change value event
    customEvents.registerEvent(EVENTS.drag);
    customEvents.addEventListener(EVENTS.drag, () => {
      this.view.updateView(this.model.get());
    });
    //
  }

  getView = (): SliderView => {
    return this.view;
  };
}
