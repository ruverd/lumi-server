import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/infra/database/base.entity';

@ObjectType()
class Client extends BaseEntity {
  @Field(() => String)
  clientNumber: string;
}

export { Client };
