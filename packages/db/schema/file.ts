import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const post = mySqlTable("post", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  file_type: varchar("file_type", { length: 256 }).notNull(),
  tags: varchar("tags", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
