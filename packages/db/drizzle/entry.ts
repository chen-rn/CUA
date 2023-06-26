import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./user";

export const entry = sqliteTable("entry", {
  id: integer("id").primaryKey(),
  entryDay: text("entry_day"),
  urlFrontPhotoThumbnail: text("url_front_photo_thumbnail"),
  urlFrontPhotoHD: text("url_front_photo_hd"),
  urlBackPhotoThumbnail: text("url_back_photo_thumbnail"),
  urlBackPhotoHD: text("url_back_photo_hd"),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt"),
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
