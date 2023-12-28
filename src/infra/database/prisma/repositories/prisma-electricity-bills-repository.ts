import { Injectable } from '@nestjs/common';

import { CreateElectricityBillDTO } from '@/domain/bill/application/dtos/create-electricity-bill.dto';
import {
  ElectricityBillsRepository,
  FilterElectricityBill,
} from '@/domain/bill/application/repositories/electricity-bills.repository';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaElectricityBillsRepository
  implements ElectricityBillsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ElectricityBill | null> {
    const electricityBill = await this.prisma.electricityBill.findFirst({
      where: {
        id,
      },
    });

    return electricityBill;
  }

  async findAll(filter?: FilterElectricityBill): Promise<ElectricityBill[]> {
    const { clientId, refDate } = filter;

    let whereClause = {};

    if (clientId) {
      whereClause = {
        ...whereClause,
        clientId,
      };
    }

    if (refDate) {
      whereClause = {
        ...whereClause,
        refMonth: refDate.month,
        refYear: refDate.year,
      };
    }

    const electricityBills = await this.prisma.electricityBill.findMany({
      where: whereClause,
      orderBy: [
        {
          refYear: 'desc',
        },
        {
          refMonth: 'desc',
        },
      ],
    });

    return electricityBills;
  }

  async create(
    electricityBill: CreateElectricityBillDTO,
  ): Promise<ElectricityBill> {
    const createdElectricityBill = await this.prisma.electricityBill.create({
      data: {
        ...electricityBill,
      },
    });

    return createdElectricityBill;
  }

  async update(
    id: string,
    data: Partial<ElectricityBill>,
  ): Promise<ElectricityBill> {
    const updatedElectricityBill = await this.prisma.electricityBill.update({
      data,
      where: {
        id,
      },
    });

    return updatedElectricityBill;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.electricityBill.delete({
      where: {
        id,
      },
    });
  }
}
