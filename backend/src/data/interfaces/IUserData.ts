import EMailFormatMap from "../../types/EMailFormatMap";
import EmailDirectory from "../../types/EmailDirectory";
import IBaseData from "./IBaseData";

export default interface IUserData extends IBaseData<EmailDirectory> {
  getEmailFormatFromCache(): Promise<EMailFormatMap>;
}

export const IUserDataProivder = "IUserDataProivder";
