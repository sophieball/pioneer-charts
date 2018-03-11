import { IData } from '../data.model';
import { IHeaderConfig } from '../header/header.model';

export interface ITableConfig {
  headerConfig: IHeaderConfig;
  data: IData[];
}
