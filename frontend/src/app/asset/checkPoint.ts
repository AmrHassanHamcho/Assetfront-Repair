// Place holder for the information to be fetched from api
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
}





