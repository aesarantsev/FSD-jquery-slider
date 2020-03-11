import { TasksModel } from "./model";
import { ListView } from "./view";
import { AppReactor } from "./utils";

export class ListPresenter {
  view: ListView;
  model: TasksModel;
  customEvents: AppReactor;

  constructor(customEvents?: AppReactor) {
    this.customEvents = customEvents;
    this.model = new TasksModel(customEvents);
    this.view = new ListView(this.model.get());

    this.view.addCreateTaskHandler((taskTitle: string): void => {
      this.model.add(taskTitle);
    });

    this.view.addCheckedHandler((id: number): void => {
      this.model.delete(id);
    });

    customEvents.registerEvent("TimeToUpdateList");
    customEvents.addEventListener("TimeToUpdateList", () => {
      this.view.updateView(this.model.get());
    });
  }

  getView = (): ListView => {
    return this.view;
  };
}
