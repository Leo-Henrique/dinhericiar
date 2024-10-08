import { UserActivationTokenEntity } from "@/domain/entities/user-activation-token.entity";
import { ActivateUserAccountUseCase } from "@/domain/use-cases/account/activate-user-account.use-case";
import { Body, Controller, HttpCode, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const activateUserAccountControllerBodySchema =
  UserActivationTokenEntity.schema.toActivate;

export type ActivateUserAccountControllerBody = z.infer<
  typeof activateUserAccountControllerBodySchema
>;

@Controller()
export class ActivateUserAccountController {
  constructor(
    private readonly activateUserAccountUseCase: ActivateUserAccountUseCase,
  ) {}

  @ApiTags("Conta")
  @Patch("/account/activate")
  @HttpCode(204)
  @ZodSchemaPipe({
    body: activateUserAccountControllerBodySchema,
  })
  async handle(@Body() body: ActivateUserAccountControllerBody) {
    await this.activateUserAccountUseCase.unsafeExecute(body);
  }
}
