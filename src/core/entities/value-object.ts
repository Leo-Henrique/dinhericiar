import { PrimitiveValue } from "../@types/primitive-value";

export abstract class ValueObject<
  Value extends PrimitiveValue = PrimitiveValue,
> {
  abstract value: Value;

  public equals(vo: ValueObject<Value>) {
    return this.value === vo.value;
  }
}
