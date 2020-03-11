import { AppReactor } from "./utils";

export class TasksModel {
  customEvents: AppReactor;
  data: any = {};

  constructor(customEvents?: AppReactor) {
    this.customEvents = customEvents;
  }

  get = () => this.data;

  add = (name: string) => {
    this.data[new Date().getTime()] = name;
    this.customEvents.dispatchEvent("TimeToUpdateList")
  };

  delete = (id:number) => {
    delete this.data[id];
    this.customEvents.dispatchEvent("TimeToUpdateList");
  };
}
