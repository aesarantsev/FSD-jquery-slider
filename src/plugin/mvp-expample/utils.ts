export class AppReactor {
  events: any = {};
  constructor() {
    this.events = {};
  }

  registerEvent = (eventName: string) => {
    let event: AppEvent = new AppEvent(eventName);
    this.events[eventName] = event;
  };

  dispatchEvent = (eventName: string, eventArgs?: any) => {

    this.events[eventName].callbacks.forEach((callback: any) => {
      callback(eventArgs);
    });
  };

  addEventListener = (eventName: string, callback: any) => {
    this.events[eventName].registerCallback(callback);
  };
}

class AppEvent {
  name: string;
  callbacks: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  registerCallback = (callback: any) => {
    this.callbacks.push(callback);
  };
}
