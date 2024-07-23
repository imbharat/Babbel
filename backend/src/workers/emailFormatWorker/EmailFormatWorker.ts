import { createMap } from "../../utils/email-format-mapper";
import { readJsonFile } from "../../utils/file-reader";

class EmailFormatCreator {
  async createEmailFormat() {
    const existingUsers = await readJsonFile(
      "src/persistent-storage/Users.json"
    );
    return createMap(existingUsers);
  }
}

export default EmailFormatCreator;
