import IBaseService from "./IBaseService";

export interface IUserService extends IBaseService {
  deriveEmail: (fullName: string, companyDomain: string) => Promise<string>;
  deriveEmailFast: (fullName: string, companyDomain: string) => Promise<string>;
}

export const IUserServiceProivder = "IUserServiceProivder";
