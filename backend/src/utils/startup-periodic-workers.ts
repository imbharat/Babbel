import WorkersMap from "../constants/StartUpPeriodicWokersMap";
import { startPeriodicWorker } from "../workerManager";

export const startStartupPeriodicWorkers = () => {
  for (const worker in WorkersMap) {
    const [file, interval] = WorkersMap[worker];
    startPeriodicWorker(worker, file, interval);
  }
};
