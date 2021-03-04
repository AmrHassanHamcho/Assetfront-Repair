
export class Option {
  id: number;
  value: number;
  description: string;

  constructor(id: number, value: number, description: string) {
    this.id = id;
    this.value = value;
    this.description = description;
  }

  getId(){
    return this.id;
  }
  getValue(){
    return this.value;
  }
  getDescription(){
    return this.description;
  }
}

