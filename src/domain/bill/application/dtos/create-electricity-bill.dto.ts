import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateElectricityBillDTO {
  @IsNotEmpty()
  @Field(() => String)
  clientId: string;

  @IsNotEmpty()
  @Field(() => String)
  fileName: string;

  @IsNotEmpty()
  @Field(() => Int)
  billTotalAmount: number;

  @IsNotEmpty()
  @Field(() => Int)
  refMonth: number;

  @IsNotEmpty()
  @Field(() => Int)
  refYear: number;

  @IsNotEmpty()
  @Field(() => Int)
  electricityKwh: number;

  @IsNotEmpty()
  @Field(() => Int)
  electricityAmount: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  netMeteringKwh: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  netMeteringAmount: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  netMeteredKwh: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  netMeteredAmount: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  municipalLightingTax: number;
}
