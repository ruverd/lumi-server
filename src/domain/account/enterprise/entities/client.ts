import { Field, ObjectType } from '@nestjs/graphql';
import { BigInt } from 'graphql-type-bigint';

import { BaseEntity } from '@/infra/database/base.entity';

@ObjectType()
class Client extends BaseEntity {
  @Field(() => BigInt)
  clientNumber: bigint;
}

export { Client };
