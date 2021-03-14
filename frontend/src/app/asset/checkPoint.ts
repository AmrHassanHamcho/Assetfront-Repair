
import {Option} from './option';

export class Checkpoint {
  id: number;
  name: string;
  value: number;
  options: Option[];
  constructor(id: number, name: string, value: number, options: Option[]) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.options = options;
  }
  getId(){
    return this.id;
  }
  getName(){
    return this.name;
  }
  setValue(value: number){
    this.value = value;
  }
  getValue(){
    return this.value;
  }

  getOption(){
    return this.options;
  }
  updateValue(value: number, index: number): number{
    return value;
  }
}





