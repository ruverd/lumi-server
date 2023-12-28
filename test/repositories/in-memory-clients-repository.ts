import { randomUUID } from 'node:crypto';

import { CreateClientDTO } from '@/domain/account/application/dtos/create-client.dto';
import { ClientsRepository } from '@/domain/account/application/repositories/clients.repository';
import { Client } from '@/domain/account/enterprise/entities/client';

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = [];

  async findById(id: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id.toString() === id);

    if (!client) {
      return null;
    }

    return client;
  }

  async findByClientNumber(clientNumber: string): Promise<Client | null> {
    const client = this.items.find(
      (item) => item.clientNumber === clientNumber,
    );

    if (!client) {
      return null;
    }

    return client;
  }

  async create(client: CreateClientDTO) {
    const createdClient = {
      id: randomUUID(),
      ...client,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(createdClient);

    return createdClient;
  }

  async update(id: string, client: Partial<Client>) {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index === -1) {
      throw new Error('Client not found');
    }

    this.items[index] = {
      ...this.items[index],
      ...client,
    };

    return this.items[index];
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index === -1) {
      throw new Error('Client not found');
    }

    this.items.splice(index, 1);
  }
}
