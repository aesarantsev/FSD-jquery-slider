import { AppReactor } from "./utils";
import { EVENTS } from "./entities/events";

export interface IData {
  startValue: number;
  endValue: number;
  stepSize: number;
  value: number;
  percentValue?: number;

  points?: Array<number>;
  percents?: Array<number>;

  ui:{
    tooltip:boolean
  }
}

export class SliderModel {
  private customEvents: AppReactor;
  private data: IData;

  constructor(customEvents: AppReactor, data: IData) {
    this.customEvents = customEvents;
    this.data = { ...data, points: [], percents: [] };
    this.calculatePoints();
    this.calculatePercents();
    this.calculatePercentValue();
  }

  get = () => this.data;

  setValue = (newValue: number):void => {
    this.data.value = newValue;
    this.calculatePercentValue();
    this.customEvents.dispatchEvent(EVENTS.drag);
  };

  calculatePercentValue = ():void => {
    this.data.percentValue = this.data.percents[
      this.data.points.indexOf(this.data.value)
    ];
  };

  calculatePoints = ():void => {
    const { startValue, endValue, stepSize, points } = this.data;
    for (let i = startValue; i <= endValue; i += stepSize) {
      points.push(i);
    }
  };

  calculatePercents = ():void => {
    const { startValue, points, percents } = this.data;
    let endPoint = points[points.length - 1];
    points.map(item => {
      let res = customCeil(
        ((item - startValue) * 100) / (endPoint - startValue)
      );
      percents.push(res);
    });
  };
}

function customCeil(value: number):number {
  let res = Math.ceil(value);

  if (value > 0 && value < 1) {
    res = 0;
  }
  if (value > 99 && value < 100) {
    res = 100;
  }

  return res;
}
