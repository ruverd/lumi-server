import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateClientDTO {
  @IsNotEmpty()
  @Field(() => String)
  clientNumber: string;
}
