export class ProductClass {
  private id : number;
  private title: string;
  constructor() {
  }


  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(value: string) {
    this.title = value;
  }
}
