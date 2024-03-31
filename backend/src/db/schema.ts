import { relations } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  integer,
  pgTable,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  zip: integer("zip").notNull(),
  price: integer("price").notNull(),
  rooms: integer("rooms").notNull(),
  bathrooms: integer("bathrooms"),
  livingSqFt: integer("living_sq_ft"),
  otherDetails: text("other_details").default(""),
  imgUrl: text("img_url").default(""),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
}));

export const litingsRelations = relations(listings, ({ one }) => ({
  user: one(users, { fields: [listings.authorId], references: [users.id] }),
}));
