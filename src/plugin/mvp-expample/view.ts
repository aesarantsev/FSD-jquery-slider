export class ListView {
  data: any;
  html: JQuery;

  constructor(data: any) {
    this.data = data;
    this.html = $(
      `<div>
        <h1>Awesome MVP task list</h1>
        <fieldset><legend>Don't forget!</legend>
        <ul id='tasklist'></ul>
        </fieldset>
        <h2>Add a new task:</h2>
        What do you need to do? <input id='taskinput' placeholder='I need to do'/> <input id='submittask' type='submit' value='Add'/>
        </div>`
    );

    this.updateView(data);
  }

  updateView = (data: any) => {
    let items: string = "";
    $.each(data, (id: any, name) => {
      items = items + this.getHtmlForTask(id, name);
    });
    this.html.find("#tasklist").html((items));
  };

  private getHtmlForTask = (id: number, name: string): string => {
    return (
      "<li><input id='" +
      id.toString() +
      "' type='checkbox'/><label for='" +
      id.toString() +
      "'>" +
      name +
      "</label></li>"
    );
  };

  getHtml = () => {
    return this.html;
  };

  addCreateTaskHandler = (handler: any) => {
    this.html.find("#submittask").click(() => {
      var newTaskTitle = this.html.find("#taskinput").val();
      this.html.find("#taskinput").val("");
      handler(newTaskTitle);
    });
  };

  addCheckedHandler = (handler: any) => {
    this.html.on("click", "input", () => {
      handler($(event.srcElement).attr("id"));
    });
  };
}
