import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { ClientFactory } from 'test/factories/make-client';
import { ElectricityBillFactory } from 'test/factories/make-electricity-bill';

describe('Electricity Bill Resolver (E2E)', () => {
  let app: INestApplication;
  let clientFactory: ClientFactory;
  let electricityBillFactory: ElectricityBillFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ClientFactory, ElectricityBillFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    clientFactory = moduleRef.get(ClientFactory);
    electricityBillFactory = moduleRef.get(ElectricityBillFactory);

    await app.init();
  });

  test('[GraphQL] fetchElectricityBill', async () => {
    const client = await clientFactory.makePrismaClient();
    const electricityBill =
      await electricityBillFactory.makePrismaElectricityBill({
        clientId: client.id,
      });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            fetchElectricityBill(id: "${electricityBill.id}") { 
              id
            }
          }
        `,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.data).toEqual({
      fetchElectricityBill: expect.objectContaining({ id: electricityBill.id }),
    });
  });

  test('[GraphQL] fetchElectricityBills', async () => {
    const client = await clientFactory.makePrismaClient();
    const electricityBill =
      await electricityBillFactory.makePrismaElectricityBill({
        clientId: client.id,
      });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            fetchElectricityBills {
              id
            }
          }
        `,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.data).toEqual({
      fetchElectricityBills: expect.arrayContaining([
        expect.objectContaining({ id: electricityBill.id }),
      ]),
    });
  });
});
