import {TcrComponent} from "../tcr/tcr.component";

export class CheckPoint {

  private id : number;
  private value : number;
  private name : string;
  //private opArr:Option[];
  //private op = new Option();
  constructor() {
  }


  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }
}
