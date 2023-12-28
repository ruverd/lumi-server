import { CreateClientDTO } from '@/domain/account/application/dtos/create-client.dto';
import { Client } from '@/domain/account/enterprise/entities/client';

export abstract class ClientsRepository {
  abstract findById(id: string): Promise<Client>;
  abstract findByClientNumber(clientNumber: string): Promise<Client>;
  abstract create(client: CreateClientDTO): Promise<Client>;
  abstract update(id: string, client: Partial<Client>): Promise<Client>;
  abstract delete(id: string): Promise<void>;
}
