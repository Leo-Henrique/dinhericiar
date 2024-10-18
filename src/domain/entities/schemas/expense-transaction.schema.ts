import { createSafeZodSchema } from "@/core/schemas/create-safe-zod-schema";
import { z } from "zod";
import { TransactionData } from "../transaction.entity";

export type TransactionSchemaToCreate = z.infer<
  typeof TransactionEntitySchema.toCreate
>;

export class TransactionEntitySchema {
  static get toCreate() {
    return createSafeZodSchema<TransactionData>({
      transactedAt: z.date(),
      accomplishedAt: z.date().nullable(),
      description: z.string().trim().min(1).max(255),
      amount: z.number().positive(),
    });
  }

  static get toCreateFixed() {
    return this.toCreate.merge(
      createSafeZodSchema<TransactionData>({
        recurrencePeriod: z.enum(["year", "month", "week"]),
        recurrenceInterval: z.number().int().positive().nullable(),
        recurrenceOccurrence: z.array(z.number().int().positive()),
      }),
    );
  }

  static get toCreateInstallment() {
    return this.toCreateFixed.merge(
      createSafeZodSchema<TransactionData>({
        recurrenceLimit: z.number().int().positive(),
      }),
    );
  }
}
