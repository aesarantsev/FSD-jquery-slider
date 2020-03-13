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

  public setPrimaryValue = (newValue: number): void => {
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
    const { startValue, endValue, stepSize } = this.data.settings;
    for (let i = startValue; i <= endValue; i += stepSize) {
      this.data.points.push(i);
    }
  };

  private calculatePercents = (): void => {
    const { startValue } = this.data.settings;
    const { points, percents } = this.data;
    let endPoint = points[points.length - 1];
    points.map(item => {
      let res = customCeil(
        ((item - startValue) * 100) / (endPoint - startValue)
      );
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
