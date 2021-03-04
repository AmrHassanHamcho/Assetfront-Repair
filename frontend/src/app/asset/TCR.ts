import {Checkpoint} from './checkPoint';

export class Tcr {
  private readonly id: number;
  private readonly name: string;
  checkpoint: Checkpoint[];

  constructor(name: string, id: number, checkpoint: Checkpoint[]) {
    this.name = name;
    this.id  = id;
    this.checkpoint = checkpoint;

  }

  getId(){
    return this.id;
  }
  getName(){
    return this.name;
  }
  getCheckpoint(){
    return this.checkpoint;
  }
}
