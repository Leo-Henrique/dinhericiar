import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "./value-objects/unique-entity.id";

export type TransactionData = {
  id: UniqueEntityId;
  recurrenceOriginId: UniqueEntityId | null;
  recurrencePeriod: "year" | "month" | "week" | null;
  recurrenceInterval: number | null;
  recurrenceLimit: number | null;
  recurrenceOccurrence: number[] | null;
  transactedAt: Date;
  accomplishedAt: Date | null;
  description: string;
  amount: number;
  updatedAt: Date | null;
  createdAt: Date;
};

export abstract class TransactionEntity<
  Data extends TransactionData,
> extends Entity<Data> {}
