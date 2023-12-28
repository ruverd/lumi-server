import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { Client } from '@/domain/account/enterprise/entities/client';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeClient(override: Partial<Client> = {}) {
  const client = {
    id: randomUUID(),
    clientNumber: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  } satisfies Client;

  return client;
}

@Injectable()
export class ClientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaClient(data: Partial<Client> = {}): Promise<Client> {
    const client = makeClient(data);

    await this.prisma.client.create({
      data: {
        ...client,
      },
    });

    return client;
  }
}
