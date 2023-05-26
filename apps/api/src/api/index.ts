import * as dotenv from "dotenv";

dotenv.config();

import { app } from "./server";

export type { AppRouter } from "./router";
export default app;
