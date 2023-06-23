import {
  drizzle as drizzleDb,
  PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(
  process.env.DATABASE_URL || "postgres://localhost:5432/drizzle"
);

type DrizzleClient = PostgresJsDatabase<Record<string, never>>;

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var drizzle: DrizzleClient;
}

export const drizzle: DrizzleClient = global.drizzle || drizzleDb(client);

if (process.env.NODE_ENV !== "production") {
  global.drizzle = drizzle;
}
