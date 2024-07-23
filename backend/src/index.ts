import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import APIRouter from "./routes/APIRouter";
import { startPeriodicWorker, stopAllWorkers } from "./workerManager";
import http from "http";
import { startStartupPeriodicWorkers } from "./utils/startup-periodic-workers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const allowCors = 3000;

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${allowCors}`,
  })
);

app.use("/api/v1", APIRouter);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Start workers */
startStartupPeriodicWorkers();

/** Handle graceful shutdown */
process.on("SIGINT", () => {
  stopAllWorkers();
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  stopAllWorkers();
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
