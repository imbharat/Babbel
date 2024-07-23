import { parentPort } from "worker_threads";
import EmailFormatCreator from "./EmailFormatWorker";
import WorkerMessage, {
  WorkerStatusConstants,
} from "../../types/WorkerMessage";

const creator = new EmailFormatCreator();

(async () => {
  const message: WorkerMessage = {
    type: "error",
  };
  try {
    const result = await creator.createEmailFormat();
    (message.type = "success"),
      (message.result = result),
      (message.status = WorkerStatusConstants.EMailFormatMapCreated);
    if (parentPort) {
      parentPort.postMessage(message);
    }
  } catch (error) {
    if (parentPort) {
      message.error = error;
      parentPort.postMessage(message);
    }
  }
})();
