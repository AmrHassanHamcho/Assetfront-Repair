import {Tcr} from './TCR';
import {ProductClass} from './product-class';

export interface Asset {
  mainImageUrl: string;
  resourceId: string;
  productClass: ProductClass;
  tcr: Tcr[];
}
