import { EmailFormat } from "../enums/EmailFormat";
import EmailDirectory from "../types/EmailDirectory";

export const createMap = (existingUsers: EmailDirectory) => {
  let format;
  const Organisation_EmailFormat_Map = {};
  for (const name in existingUsers) {
    const email = existingUsers[name];
    const [address, domain] = email.toLowerCase().split("@");
    if (!(domain in Organisation_EmailFormat_Map)) {
      const [firstName, lastName] = name.toLowerCase().split(" ");
      if (address === firstName + lastName) {
        format = EmailFormat.first_name_last_name;
      } else if (address === firstName[0] + lastName) {
        format = EmailFormat.first_name_initial_last_name;
      }
      Organisation_EmailFormat_Map[domain] = format;
    }
  }
  return Organisation_EmailFormat_Map;
};
