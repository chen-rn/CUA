import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  createdAt: date("created_at", { mode: "date" }).defaultNow(),
  updatedAt: date("updated_at", { mode: "date" }),
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
