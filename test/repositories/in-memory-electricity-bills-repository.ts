import { randomUUID } from 'node:crypto';

import { CreateElectricityBillDTO } from '@/domain/bill/application/dtos/create-electricity-bill.dto';
import {
  ElectricityBillsRepository,
  FilterElectricityBill,
} from '@/domain/bill/application/repositories/electricity-bills.repository';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';

export class InMemoryElectricityBillsRepository
  implements ElectricityBillsRepository
{
  public items: ElectricityBill[] = [];

  async findById(id: string): Promise<ElectricityBill | null> {
    const electricityBill = this.items.find(
      (item) => item.id.toString() === id,
    );

    if (!electricityBill) {
      return null;
    }

    return electricityBill;
  }

  async findAll(filter?: FilterElectricityBill): Promise<ElectricityBill[]> {
    if (filter?.clientId) {
      return this.items.filter(
        (item) => item.clientId.toString() === filter.clientId,
      );
    }

    if (filter?.refDate) {
      return this.items.filter(
        (item) =>
          item.refMonth === filter.refDate.month &&
          item.refYear === filter.refDate.year,
      );
    }

    return this.items;
  }

  async create(electricityBill: CreateElectricityBillDTO) {
    const createdElectricityBill = {
      id: randomUUID(),
      ...electricityBill,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(createdElectricityBill);

    return createdElectricityBill;
  }

  async update(id: string, electricityBill: Partial<ElectricityBill>) {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index === -1) {
      throw new Error('ElectricityBill not found');
    }

    this.items[index] = {
      ...this.items[index],
      ...electricityBill,
    };

    return this.items[index];
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index === -1) {
      throw new Error('ElectricityBill not found');
    }

    this.items.splice(index, 1);
  }
}
