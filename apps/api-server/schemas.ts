import { z } from "zod";

export const Person = z.string().min(1, "Must have name!");
