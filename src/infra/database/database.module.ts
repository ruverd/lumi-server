import { Module } from '@nestjs/common';

import { ClientsRepository } from '@/domain/account/application/repositories/clients.repository';
import { ElectricityBillsRepository } from '@/domain/bill/application/repositories/electricity-bills.repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaClientsRepository } from '@/infra/database/prisma/repositories/prisma-clients-repository';
import { PrismaElectricityBillsRepository } from '@/infra/database/prisma/repositories/prisma-electricity-bills-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientsRepository,
      useClass: PrismaClientsRepository,
    },
    {
      provide: ElectricityBillsRepository,
      useClass: PrismaElectricityBillsRepository,
    },
  ],
  exports: [PrismaService, ClientsRepository, ElectricityBillsRepository],
})
export class DatabaseModule {}
