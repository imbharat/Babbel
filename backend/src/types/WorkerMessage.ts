export enum WorkerStatusConstants {
  EMailFormatMapCreated = 1,
}

type WorkerMessage = {
  type: "error" | "success";
  status?: WorkerStatusConstants;
  error?: string;
  result?: any;
  nextAction?: "completed";
};

export default WorkerMessage;
