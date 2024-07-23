import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IBaseService, {
  IBaseServiceProivder,
} from "../services/interfaces/IBaseService";

@autoInjectable()
export default class BaseController {
  private iBaseService: IBaseService;
  constructor(@inject(IBaseServiceProivder) iBaseService: IBaseService) {
    this.iBaseService = iBaseService;
  }
}
