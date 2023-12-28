import { Injectable } from '@nestjs/common';

import { CreateClientDTO } from '@/domain/account/application/dtos/create-client.dto';
import { ClientsRepository } from '@/domain/account/application/repositories/clients.repository';
import { Client } from '@/domain/account/enterprise/entities/client';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });

    return client;
  }

  async findByClientNumber(clientNumber: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: {
        clientNumber,
      },
    });

    return client;
  }

  async create(client: CreateClientDTO): Promise<Client> {
    const createdClient = await this.prisma.client.create({
      data: {
        ...client,
      },
    });

    return createdClient;
  }

  async update(id: string, data: Partial<Client>): Promise<Client> {
    const updatedClient = await this.prisma.client.update({
      data,
      where: {
        id,
      },
    });

    return updatedClient;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
