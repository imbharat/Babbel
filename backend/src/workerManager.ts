import { Worker } from "worker_threads";
import path from "path";

const workers = new Map();
let workerIntervalId = null;

async function loadEventHandlers(workerName) {
  const { onMessage, onError, onExit } = await import(
    `./workers/${workerName}/eventHandlers`
  );
  return { onMessage, onError, onExit };
}

export async function startWorker(workerName, workerFile) {
  const workerPath = path.resolve(
    __dirname,
    `../build/workers/${workerName}/${workerFile}`
  );
  const worker = new Worker(workerPath);

  const { onMessage, onError, onExit } = await loadEventHandlers(workerName);

  worker.on("message", onMessage);
  worker.on("error", onError);
  worker.on("exit", onExit);

  workers.set(workerName, worker);
  return worker;
}

export async function startPeriodicWorker(workerName, workerFile, interval) {
  if (workerIntervalId) {
    clearInterval(workerIntervalId);
  }

  await startWorker(workerName, workerFile);

  workerIntervalId = setInterval(async () => {
    await startWorker(workerName, workerFile);
  }, interval);
}

export function stopAllWorkers() {
  if (workerIntervalId) {
    clearInterval(workerIntervalId);
  }

  workers.forEach((worker, workerName) => {
    worker
      .terminate()
      .catch((err) =>
        console.error(`Error terminating worker ${workerName}:`, err)
      );
  });

  workers.clear();
}
