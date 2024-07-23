import { promises as fs } from "fs";

export const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(data);
    return json;
  } catch (err) {
    console.error("Error reading or parsing the file", err);
    throw err;
  }
};
