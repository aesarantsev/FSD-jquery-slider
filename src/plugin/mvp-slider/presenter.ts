import { SliderModel } from "./model";
import { SliderView } from "./view";
import { AppReactor } from "./utils";

import { EVENTS } from "./entities/events";

export class SliderPresenter {
  view: SliderView;
  model: SliderModel;
  customEvents: AppReactor;
  settings: SliderOptions;

  constructor(customEvents: AppReactor, settings?: SliderOptions) {
    const {
      startValue,
      endValue,
      stepSize,
      startPosition,
      ui: { tooltip }
    } = settings;

    this.customEvents = customEvents;

    this.model = new SliderModel(customEvents, {
      startValue,
      endValue,
      stepSize,
      value: startPosition,
      ui: {
        tooltip
      }
    });

    this.view = new SliderView(this.model.get());

    this.settings = settings;

    this.view.addDragHandler(({ value }: any): void => {
      this.model.setValue(value);
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
