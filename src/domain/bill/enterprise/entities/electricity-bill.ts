import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/infra/database/base.entity';

@ObjectType()
class ElectricityBill extends BaseEntity {
  @Field(() => String)
  clientId: string;

  @Field(() => String)
  fileName: string;

  @Field(() => Int)
  billTotalAmount: number;

  @Field(() => Int)
  refMonth: number;

  @Field(() => Int)
  refYear: number;

  @Field(() => Int)
  electricityKwh: number;

  @Field(() => Int)
  electricityAmount: number;

  @Field(() => Int, { nullable: true })
  netMeteringKwh: number | null;

  @Field(() => Int, { nullable: true })
  netMeteringAmount: number | null;

  @Field(() => Int, { nullable: true })
  netMeteredKwh: number | null;

  @Field(() => Int, { nullable: true })
  netMeteredAmount: number | null;

  @Field(() => Int, { nullable: true })
  municipalLightingTax: number | null;
}

export { ElectricityBill };
