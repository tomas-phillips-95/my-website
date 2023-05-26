import * as dotenv from "dotenv";

import { server } from "./server";

dotenv.config();

const app = server();
export { app };
