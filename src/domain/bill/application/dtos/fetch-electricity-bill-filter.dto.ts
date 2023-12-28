import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class FetchElectricityBillFilterDTO {
  @IsOptional()
  @Field(() => String, { nullable: true })
  clientId: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  refYear: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  refMonth: number;
}
