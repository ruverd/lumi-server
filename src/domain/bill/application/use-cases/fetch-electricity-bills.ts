import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ClientsRepository } from '@/domain/account/application/repositories/clients.repository';
import { ElectricityBillsRepository } from '@/domain/bill/application/repositories/electricity-bills.repository';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';

interface FetchElectricityBillsUseCaseRequest {
  filter?: {
    clientId?: string;
    refDate?: {
      month: number;
      year: number;
    };
  };
}

type FetchElectricityBillsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    electricityBills: ElectricityBill[];
  }
>;

@Injectable()
export class FetchElectricityBillsUseCase {
  constructor(
    private electricityBillsRepository: ElectricityBillsRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    filter,
  }: FetchElectricityBillsUseCaseRequest): Promise<FetchElectricityBillsUseCaseResponse> {
    if (filter?.clientId) {
      const client = await this.clientsRepository.findById(filter.clientId);

      if (!client) {
        return left(new ResourceNotFoundError());
      }
    }

    const electricityBills =
      await this.electricityBillsRepository.findAll(filter);

    return right({ electricityBills });
  }
}
