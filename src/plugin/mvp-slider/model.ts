import { AppReactor } from "./utils/customEvents";
import { EVENTS } from "./entities/events";
import customCeil from "./utils/customCeil";

export interface IData {
  settings: SliderOptions;
  percentValues?: Array<number>;
  points?: Array<number>;
  percents?: Array<number>;
}

export class SliderModel {
  private customEvents: AppReactor;
  private data: IData;

  constructor(customEvents: AppReactor, data: IData) {
    this.customEvents = customEvents;
    this.data = { ...data, points: [], percents: [], percentValues: [] };
    this.calculatePoints();
    this.calculatePercents();
    this.calculatePercentValue();
  }

  get = () => {
    return this.data;
  };

  public setValueFromInput = (value: number, isPrimaryInput: boolean): void => {
    if (value >= this.data.settings.from && value <= this.data.settings.to) {
      const closestRight = Math.min(
        ...this.data.points.filter(v => v >= value)
      );
      isPrimaryInput
        ? this.setPrimaryValue(closestRight)
        : this.setSecondaryValue(closestRight);
    }
  };

  public setPrimaryValue = (newValue: number): void => {
    this.data.settings.values[0] = newValue;
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.changeValue);
  };

  public setSecondaryValue = (newValue: number): void => {
    this.data.settings.values[1] = newValue;
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.changeValue);
  };

  public setStep = (newValue: number): void => {
    this.data.settings.step = newValue;
    this.calculatePoints();
    this.calculatePercents();
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.changeValue);
  };

  public setToltipDisplayed = (value: boolean): void => {
    this.data.settings.ui.tooltip = value;
    this.customEvents.dispatchEvent(EVENTS.changeValue);
  };

  public setRange = (value: boolean): void => {
    console.log("setRange", value);

    this.data.settings.range = value;
    this.customEvents.dispatchEvent(EVENTS.changeValue);
  };

  private calculatePercentValue = (): void => {
    this.data.percentValues[0] = this.data.percents[
      this.data.points.indexOf(this.data.settings.values[0])
    ];
    this.data.percentValues[1] = this.data.percents[
      this.data.points.indexOf(this.data.settings.values[1])
    ];
  };

  private calculatePoints = (): void => {
    const { from, to, step } = this.data.settings;
    this.data.points = [];
    for (let i = from; i <= to; i += step) {
      this.data.points.push(i);
    }
  };

  private calculatePercents = (): void => {
    this.data.percents = [];
    const { from } = this.data.settings;
    const { points, percents } = this.data;

    let endPoint = points[points.length - 1];
    points.map(item => {
      let res = customCeil(((item - from) * 100) / (endPoint - from));
      percents.push(res);
    });
  };
}
