import {
  drizzle as drizzleDb,
  BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const client = new Database("sqlite.db");

type DrizzleClient = BetterSQLite3Database<Record<string, never>>;

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var drizzle: DrizzleClient;
}

export const drizzle: DrizzleClient = global.drizzle || drizzleDb(client);

if (process.env.NODE_ENV !== "production") {
  global.drizzle = drizzle;
}
