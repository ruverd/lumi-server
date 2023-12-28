import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';

import { FetchElectricityBillUseCase } from '@/domain/bill/application/use-cases/fetch-electriicity-bill';
import { FetchElectricityBillsUseCase } from '@/domain/bill/application/use-cases/fetch-electriicity-bills';
import { DatabaseModule } from '@/infra/database/database.module';
import { ElectricityBillResolver } from '@/infra/http/resolvers/electricity-bill.resolver';

const autoSchemaFile = join(process.cwd(), 'src/infra/schema.gql');

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile,
      sortSchema: true,
    }),
  ],
  providers: [
    // ...resolvers
    ElectricityBillResolver,

    // ...use cases
    FetchElectricityBillUseCase,
    FetchElectricityBillsUseCase,
  ],
})
export class HttpModule {}
