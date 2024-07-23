import { injectable, inject } from "tsyringe";
import IUserData, { IUserDataProivder } from "../data/interfaces/IUserData";
import { IUserService } from "./interfaces/IUserService";
import BaseService from "./BaseService";
import EmailDirectory from "../types/EmailDirectory";
import { EmailFormat } from "../enums/EmailFormat";

@injectable()
export default class UserService extends BaseService implements IUserService {
  private iUserData: IUserData;
  constructor(@inject(IUserDataProivder) iUserData: IUserData) {
    super(iUserData);
    this.iUserData = iUserData;
  }

  deriveEmail = async (fullName: string, companyDomain: string) => {
    const users = await this.iUserData.get();
    const format = this.determineFormat(companyDomain, users);
    return this.emailGuesser(fullName, companyDomain, format);
  };

  deriveEmailFast = async (fullName: string, companyDomain: string) => {
    const formatMap = await this.iUserData.getEmailFormatFromCache();
    const format = formatMap?.[companyDomain] as EmailFormat;
    return this.emailGuesser(fullName, companyDomain, format);
  };

  /* Private Methods Begin */
  private emailGuesser = (
    fullName: string,
    domain: string,
    format: EmailFormat
  ) => {
    if (!format) return null;

    const [firstName, lastName] = fullName.toLowerCase().split(" ");

    switch (format) {
      case EmailFormat.first_name_last_name:
        return `${firstName}${lastName}@${domain}`;
      case EmailFormat.first_name_initial_last_name:
        return `${firstName[0]}${lastName}@${domain}`;
      default:
        return null;
    }
  };

  private determineFormat = (domain: string, existingUsers: EmailDirectory) => {
    for (const name in existingUsers) {
      const email = existingUsers[name];
      if (email.includes(`@${domain}`)) {
        const [address] = email.toLowerCase().split("@");
        const [firstName, lastName] = name.toLowerCase().split(" ");
        if (address === firstName + lastName) {
          return EmailFormat.first_name_last_name;
        } else if (address === firstName[0] + lastName) {
          return EmailFormat.first_name_initial_last_name;
        }
      }
    }
  };
  /* Private Methods End */
}
