// Place holder for the information to be fetched from api

import {Checkpoint} from './checkPoint';

export class Tcr {
  private  id: number;
  private  name: string;
  checkpoint: Checkpoint[];

  constructor(name: string, id: number, checkpoint: Checkpoint[]) {
    this.name = name;
    this.id  = id;
    this.checkpoint = checkpoint;
  }
}
