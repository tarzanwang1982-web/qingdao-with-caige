CREATE TABLE `admins` (
	`email` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`mime_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_object_key_unique` ON `media` (`object_key`);--> statement-breakpoint
CREATE TABLE `places` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`summary` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`duration_minutes` integer DEFAULT 60 NOT NULL,
	`difficulty` text DEFAULT '轻松' NOT NULL,
	`seasons` text DEFAULT '全年' NOT NULL,
	`weather_sensitivity` text DEFAULT '普通' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`subtitle` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`duration_label` text NOT NULL,
	`total_minutes` integer NOT NULL,
	`walking_km` real NOT NULL,
	`intensity` text NOT NULL,
	`seasons` text NOT NULL,
	`audience` text NOT NULL,
	`theme` text NOT NULL,
	`place_ids` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`edit_token_hash` text NOT NULL,
	`title` text NOT NULL,
	`start_label` text NOT NULL,
	`travel_date` text NOT NULL,
	`start_time` text NOT NULL,
	`pace` text NOT NULL,
	`transport` text NOT NULL,
	`place_ids` text NOT NULL,
	`plan_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
