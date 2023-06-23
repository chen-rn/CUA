export default {
  schema: "./drizzle/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL || "postgres://localhost:5432/drizzle",
  },
};
