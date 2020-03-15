import { AppReactor } from "./utils";
import { EVENTS } from "./entities/events";

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

  get = () => this.data;

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
    console.log("newValue", newValue);
    this.data.settings.values[0] = newValue;
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.drag);
  };

  public setSecondaryValue = (newValue: number): void => {
    this.data.settings.values[1] = newValue;
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.drag);
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
    for (let i = from; i <= to; i += step) {
      this.data.points.push(i);
    }
  };

  private calculatePercents = (): void => {
    const { from } = this.data.settings;
    const { points, percents } = this.data;
    let endPoint = points[points.length - 1];
    points.map(item => {
      let res = customCeil(((item - from) * 100) / (endPoint - from));
      percents.push(res);
    });
  };
}

function customCeil(value: number): number {
  let res = Math.ceil(value);

  if (value > 0 && value < 1) {
    res = 0;
  }
  if (value > 99 && value < 100) {
    res = 100;
  }

  return res;
}
