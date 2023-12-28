import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ElectricityBillsRepository } from '@/domain/bill/application/repositories/electricity-bills.repository';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';

interface FetchElectricityBillUseCaseRequest {
  electricityBillId: string;
}

type FetchElectricityBillUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    electricityBill: ElectricityBill;
  }
>;

@Injectable()
export class FetchElectricityBillUseCase {
  constructor(private electricityBillsRepository: ElectricityBillsRepository) {}

  async execute({
    electricityBillId,
  }: FetchElectricityBillUseCaseRequest): Promise<FetchElectricityBillUseCaseResponse> {
    const electricityBill =
      await this.electricityBillsRepository.findById(electricityBillId);

    if (!electricityBill) {
      return left(new ResourceNotFoundError());
    }

    return right({ electricityBill });
  }
}
