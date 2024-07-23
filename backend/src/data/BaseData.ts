import { injectable } from "tsyringe";
import IBaseData from "./interfaces/IBaseData";
import { readJsonFile } from "../utils/file-reader";

@injectable()
export default class BaseData<T> implements IBaseData<T> {
  constructor() {}
  get = async () => {
    return (await readJsonFile("src/persistent-storage/Users.json")) as T;
  };
}
