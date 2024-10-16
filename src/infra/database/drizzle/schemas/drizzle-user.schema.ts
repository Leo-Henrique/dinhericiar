import { UserData } from "@/domain/entities/user.entity";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as ddl from "drizzle-orm/pg-core";

export type DrizzleUserData = InferSelectModel<typeof drizzleUserTable>;

export type DrizzleUserDataCreate = InferInsertModel<typeof drizzleUserTable>;

export const drizzleUserTable = ddl.pgTable("users", {
  id: ddl.uuid("id").primaryKey(),
  email: ddl.varchar("email").notNull().unique(),
  password: ddl.varchar("password").notNull(),
  name: ddl.varchar("name").notNull(),
  activatedAt: ddl.timestamp("activated_at", { withTimezone: true }),
  updatedAt: ddl.timestamp("updated_at", { withTimezone: true }),
  createdAt: ddl.timestamp("created_at", { withTimezone: true }).notNull(),
} satisfies Record<keyof UserData, ddl.PgColumnBuilderBase>);
