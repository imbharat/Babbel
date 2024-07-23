import { autoInjectable, inject } from "tsyringe";
import { Request, Response } from "express";
import BaseController from "./BaseController";
import {
  IUserService,
  IUserServiceProivder,
} from "../services/interfaces/IUserService";

@autoInjectable()
export default class UserController extends BaseController {
  private iUserService: IUserService;
  constructor(@inject(IUserServiceProivder) iUserService?: IUserService) {
    super(iUserService);
    this.iUserService = iUserService;
  }

  deriveEmail = async (req: Request, res: Response) => {
    const { name, domain } = req.query;
    let email;
    if (!(name || domain)) {
      res.status(400);
    } else {
      email = await this.iUserService.deriveEmail(
        name.toString(),
        domain.toString()
      );
      if (email) {
        res.status(200);
      } else {
        res.status(204);
      }
    }
    res.json({
      email,
    });
  };

  deriveEmailFast = async (req: Request, res: Response) => {
    const { name, domain } = req.query;
    let email;
    if (!(name || domain)) {
      res.status(400);
    } else {
      email = await this.iUserService.deriveEmailFast(
        name.toString(),
        domain.toString()
      );
      if (email) {
        res.status(200);
      } else {
        res.status(204);
      }
    }
    res.json({
      email,
    });
  };
}
