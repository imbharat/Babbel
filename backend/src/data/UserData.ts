import { injectable } from "tsyringe";
import IUserData from "./interfaces/IUserData";
import BaseData from "./BaseData";
import EmailDirectory from "../types/EmailDirectory";
import CacheService from "../cache-manager/CacheService";
import { EMAIL_FORMAT_MAP } from "../constants/CacheKeys";
import EMailFormatMap from "../types/EMailFormatMap";

@injectable()
export default class UserData
  extends BaseData<EmailDirectory>
  implements IUserData
{
  private readonly cacheService: CacheService;
  constructor(cacheService: CacheService) {
    super();
    this.cacheService = cacheService;
  }
  getEmailFormatFromCache = async () => {
    const map = await this.cacheService.getCachedData(
      EMAIL_FORMAT_MAP
    ) as EMailFormatMap;
    return map;
  }
}
