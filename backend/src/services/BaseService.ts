import { inject, injectable } from "tsyringe";
import IBaseData, { IBaseDataProivder } from "../data/interfaces/IBaseData";
import IBaseService from "./interfaces/IBaseService";

@injectable()
export default class BaseService implements IBaseService {
  private iBaseData: IBaseData<Object>;
  constructor(@inject(IBaseDataProivder) iBaseData: IBaseData<Object>) {
    this.iBaseData = iBaseData;
  }
}
