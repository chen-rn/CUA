import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const user = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt"),
});

// user model
// model User {
//   id        String   @id @default(cuid())
//   name      String?
//   email     String   @unique
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   entries   Entry[]
// }
