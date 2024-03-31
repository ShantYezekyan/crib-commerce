import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://cribdb_owner:h6g2xIcBGJpl@ep-lingering-thunder-a2ll29az.eu-central-1.aws.neon.tech/cribdb?sslmode=require",
  },
  out: "./drizzle",
} satisfies Config;
