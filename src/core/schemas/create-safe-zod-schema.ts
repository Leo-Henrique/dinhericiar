import { ZodTypeAny, z } from "zod";

type Shape<Target> = {
  [K in keyof Target]: ZodTypeAny;
};

export function createSafeZodSchema<Target>(shape: Partial<Shape<Target>>) {
  return z.object(shape as Shape<Target>);
}
