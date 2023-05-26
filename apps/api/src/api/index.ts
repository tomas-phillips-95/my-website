import * as dotenv from "dotenv";

import { app } from "./server";

dotenv.config();

export type { AppRouter } from "./router";
export default app;
