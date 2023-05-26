import * as dotenv from "dotenv";

import { server } from "./server";

dotenv.config();

export const app = server();
