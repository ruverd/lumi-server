import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeElectricityBill(override: Partial<ElectricityBill> = {}) {
  const electricityBill = {
    id: randomUUID(),
    clientId: randomUUID(),
    billTotalAmount: faker.number.int({ min: 10000, max: 60000 }),
    refMonth: faker.number.int({ min: 1, max: 12 }),
    refYear: 2023,
    electricityKwh: 50,
    electricityAmount: 4762,
    netMeteringKwh: faker.number.int({ min: 200, max: 1000 }),
    netMeteringAmount: faker.number.int({ min: 10000, max: 50000 }),
    netMeteredKwh: faker.number.int({ min: 200, max: 1000 }),
    netMeteredAmount: faker.number.int({ min: -50000, max: -10000 }),
    municipalLightingTax: faker.number.int({ min: 4900, max: 5500 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  } satisfies ElectricityBill;

  return electricityBill;
}

@Injectable()
export class ElectricityBillFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaElectricityBill(
    data: Partial<ElectricityBill> = {},
  ): Promise<ElectricityBill> {
    const electricityBill = makeElectricityBill(data);

    await this.prisma.electricityBill.create({
      data: {
        ...electricityBill,
      },
    });

    return electricityBill;
  }
}
