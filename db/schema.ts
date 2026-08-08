import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const places = sqliteTable("places", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  difficulty: text("difficulty").notNull().default("轻松"),
  seasons: text("seasons").notNull().default("全年"),
  weatherSensitivity: text("weather_sensitivity").notNull().default("普通"),
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const routes = sqliteTable("routes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  durationLabel: text("duration_label").notNull(),
  totalMinutes: integer("total_minutes").notNull(),
  walkingKm: real("walking_km").notNull(),
  intensity: text("intensity").notNull(),
  seasons: text("seasons").notNull(),
  audience: text("audience").notNull(),
  theme: text("theme").notNull(),
  placeIds: text("place_ids").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),
  editTokenHash: text("edit_token_hash").notNull(),
  title: text("title").notNull(),
  startLabel: text("start_label").notNull(),
  travelDate: text("travel_date").notNull(),
  startTime: text("start_time").notNull(),
  pace: text("pace").notNull(),
  transport: text("transport").notNull(),
  placeIds: text("place_ids").notNull(),
  planJson: text("plan_json").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const admins = sqliteTable("admins", {
  email: text("email").primaryKey(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  key: text("object_key").notNull().unique(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
