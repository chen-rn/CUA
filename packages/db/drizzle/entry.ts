import { date, pgTable, serial, text } from "drizzle-orm/pg-core";
import { user } from "./user";

export const entry = pgTable("entry", {
  id: serial("id").primaryKey(),
  entryDay: date("entry_day", { mode: "date" }),
  urlFrontPhotoThumbnail: text("url_front_photo_thumbnail"),
  urlFrontPhotoHD: text("url_front_photo_hd"),
  urlBackPhotoThumbnail: text("url_back_photo_thumbnail"),
  urlBackPhotoHD: text("url_back_photo_hd"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow(),
  updatedAt: date("updated_at", { mode: "date" }),
});

// model Entry {
//   id       String   @id @default(cuid())
//   entryDay DateTime // the day that the entry is assigned to

//   urlFrontPhotoThumbnail String
//   urlFrontPhotoHD        String

//   urlBackPhotoThumbnail String
//   urlBackPhotoHD        String

//   user   User   @relation(fields: [userId], references: [id])
//   userId String

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
