import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateClientDTO {
  @IsNotEmpty()
  @Field(() => Int)
  clientNumber: number;
}
