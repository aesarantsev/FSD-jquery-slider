export class InputView {
  input: HTMLInputElement;
  isPrimaryInput: boolean;

  constructor(input: JQuery, isPrimaryInput: boolean) {
    this.input = <HTMLInputElement>input.get()[0];
    this.isPrimaryInput = isPrimaryInput;
  }

  public addInputChangeHandler = (
    handler: (value: number, isPrimaryInput: boolean) => void
  ): void => {
    this.input.addEventListener("input", e => {
      let value: number = +this.input.value;
      if (value) {
        handler(value, this.isPrimaryInput);
      }
    });
  };
}
