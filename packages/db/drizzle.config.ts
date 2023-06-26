export default {
  schema: "./drizzle/*",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "sqlite.db",
  },
};
