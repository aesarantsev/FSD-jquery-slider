import { SliderModel } from "./model";
import { SliderView } from "./view";
import { AppReactor } from "./utils";

import { EVENTS } from "./entities/events";

export class SliderPresenter {
  view: SliderView;
  model: SliderModel;
  customEvents: AppReactor;

  constructor(customEvents: AppReactor, settings?: SliderOptions) {
    this.customEvents = customEvents;
    this.model = new SliderModel(customEvents, {
      settings,
      percentValues: [],
      points: []
    });

    this.view = new SliderView(this.model.get());

    this.view.addDragHandler(({ primaryValue, secondaryValue }: any): void => {
      if (primaryValue || primaryValue == 0)
        this.model.setPrimaryValue(primaryValue);
      if (secondaryValue || primaryValue == 0)
        this.model.setSecondaryValue(secondaryValue);
    });

    //==========Event register

    customEvents.registerEvent(EVENTS.drag);
    customEvents.addEventListener(EVENTS.drag, () => {
      this.view.updateView(this.model.get());
    });

    //----------Event register
  }

  getView = (): SliderView => {
    return this.view;
  };
}
