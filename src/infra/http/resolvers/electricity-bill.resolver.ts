import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ClientsRepository } from '@/domain/account/application/repositories/clients.repository';
import { Client } from '@/domain/account/enterprise/entities/client';
import { FetchElectricityBillFilterDTO } from '@/domain/bill/application/dtos/fetch-electricity-bill-filter.dto';
import { FetchElectricityBillUseCase } from '@/domain/bill/application/use-cases/fetch-electricity-bill';
import { FetchElectricityBillsUseCase } from '@/domain/bill/application/use-cases/fetch-electricity-bills';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';

@Resolver(() => ElectricityBill)
export class ElectricityBillResolver {
  constructor(
    private fetchElectricityBillUserCase: FetchElectricityBillUseCase,
    private fetchElectricityBillsUserCase: FetchElectricityBillsUseCase,
    private clientsRepository: ClientsRepository,
  ) {}

  @Query(() => ElectricityBill, { nullable: true })
  async fetchElectricityBill(@Args('id') electricityBillId: string) {
    const result = await this.fetchElectricityBillUserCase.execute({
      electricityBillId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { electricityBill } = result.value;

    return electricityBill;
  }

  @Query(() => [ElectricityBill])
  async fetchElectricityBills(
    @Args('filter', { nullable: true })
    filter?: FetchElectricityBillFilterDTO,
  ) {
    let filterParams = {};

    if (filter?.clientId) {
      filterParams = {
        ...filterParams,
        clientId: filter.clientId,
      };
    }

    if (filter?.refYear && filter?.refMonth) {
      filterParams = {
        ...filterParams,
        refDate: {
          month: filter.refMonth,
          year: filter.refYear,
        },
      };
    }

    const result = filter
      ? await this.fetchElectricityBillsUserCase.execute({
          filter: {
            ...filterParams,
          },
        })
      : await this.fetchElectricityBillsUserCase.execute({});

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { electricityBills } = result.value;

    return electricityBills;
  }

  @ResolveField(() => Client, { nullable: true })
  async client(@Parent() electricityBill: ElectricityBill) {
    const { clientId } = electricityBill;

    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      return null;
    }

    return client;
  }
}
