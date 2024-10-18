import {
  EntityDataCreateInput,
  EntityDataUpdateInput,
  EntityInstance,
} from "@/core/@types/entity";
import { Entity } from "@/core/entities/entity";
import {
  ExpenseTransactionEntitySchema,
  ExpenseTransactionSchemaToCreate,
  ExpenseTransactionSchemaToUpdate,
} from "./schemas/bank-account.schema";
import { TransactionData } from "./transaction.entity";
import { Name } from "./value-objects/name";
import { Slug } from "./value-objects/slug";
import { UniqueEntityId } from "./value-objects/unique-entity.id";

export type ExpenseTransaction = EntityInstance<
  ExpenseTransactionData,
  ExpenseTransactionEntity
>;

export type ExpenseTransactionData = TransactionData & {
  categoryId: UniqueEntityId;
  bankAccountId: UniqueEntityId;
};

export type ExpenseTransactionDataCreateInput = EntityDataCreateInput<
  ExpenseTransactionData,
  ExpenseTransactionSchemaToCreate,
  {
    userId: string;
    isMainAccount?: boolean;
  }
>;

export type ExpenseTransactionDataUpdateInput = Omit<
  EntityDataUpdateInput<
    ExpenseTransactionData,
    ExpenseTransactionSchemaToUpdate
  >,
  "userId" | "slug"
>;

export class ExpenseTransactionEntity extends Entity<ExpenseTransactionData> {
  static readonly schema = ExpenseTransactionEntitySchema;

  static create(input: ExpenseTransactionDataCreateInput) {
    const name = new Name(input.name);

    return new this().createEntity({
      updatedAt: null,
      createdAt: new Date(),
      isMainAccount: false,
      ...input,
      id: new UniqueEntityId(input.id),
      userId: new UniqueEntityId(input.userId),
      slug: input.slug ? new Slug(input.slug) : Slug.createFromText(name.value),
      institution: new Name(input.institution),
      name: name,
    });
  }

  update<Input extends ExpenseTransactionDataUpdateInput>(input: Input) {
    return this.updateEntity({
      ...input,
      institution: input.institution ? new Name(input.institution) : undefined,
      name: input.name ? new Name(input.name) : undefined,
      slug: input.name ? Slug.createFromText(input.name) : undefined,
    });
  }
}
