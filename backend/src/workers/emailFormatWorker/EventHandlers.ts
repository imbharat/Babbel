import CacheService from "../../cache-manager/CacheService";
import { EMAIL_FORMAT_MAP } from "../../constants/CacheKeys";
import container from "../../container/Container";
import WorkerMessage, {
  WorkerStatusConstants,
} from "../../types/WorkerMessage";

export const onMessage = (message: WorkerMessage) => {
  if (message.error) {
    console.error("Worker reported an error:", message.error);
  } else {
    switch (message.status) {
      case WorkerStatusConstants.EMailFormatMapCreated:
        const cacheService = container.resolve(CacheService);
        cacheService.setCachedData(EMAIL_FORMAT_MAP, message.result);
        break;
      default:
        console.error("Unknown message received from worker");
    }
  }
};

export const onError = (error: Error) => {
  console.error("Worker encountered an error:", error);
};

export const onExit = (code: Number) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
};
