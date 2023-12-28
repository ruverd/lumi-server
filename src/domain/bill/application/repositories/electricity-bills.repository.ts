import { CreateElectricityBillDTO } from '@/domain/bill/application/dtos/create-electricity-bill.dto';
import { ElectricityBill } from '@/domain/bill/enterprise/entities/electricity-bill';

export type FilterElectricityBill = {
  clientId?: string;
  refDate?: {
    month: number;
    year: number;
  };
};

export abstract class ElectricityBillsRepository {
  abstract findById(id: string): Promise<ElectricityBill | null>;
  abstract findAll(filter?: FilterElectricityBill): Promise<ElectricityBill[]>;
  abstract create(
    electricityBill: CreateElectricityBillDTO,
  ): Promise<ElectricityBill>;
  abstract update(
    id: string,
    client: Partial<ElectricityBill>,
  ): Promise<ElectricityBill>;
  abstract delete(id: string): Promise<void>;
}
