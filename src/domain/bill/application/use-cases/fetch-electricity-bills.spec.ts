import { FetchElectricityBillsUseCase } from '@/domain/bill/application/use-cases/fetch-electricity-bills';

import { makeClient } from 'test/factories/make-client';
import { makeElectricityBill } from 'test/factories/make-electricity-bill';
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository';
import { InMemoryElectricityBillsRepository } from 'test/repositories/in-memory-electricity-bills-repository';

let inMemoryClientsRepository: InMemoryClientsRepository;
let inMemoryElectricityBillsRepository: InMemoryElectricityBillsRepository;
let sut: FetchElectricityBillsUseCase;

describe('Fetch Electricity Bills', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    inMemoryElectricityBillsRepository =
      new InMemoryElectricityBillsRepository();
    sut = new FetchElectricityBillsUseCase(
      inMemoryElectricityBillsRepository,
      inMemoryClientsRepository,
    );
  });

  it('should be able to fetch electricity bills', async () => {
    const client = makeClient();

    inMemoryClientsRepository.items.push(client);

    const electricityBill1 = makeElectricityBill({
      clientId: client.id,
    });

    const electricityBill2 = makeElectricityBill({
      clientId: client.id,
    });

    await inMemoryElectricityBillsRepository.create(electricityBill1);
    await inMemoryElectricityBillsRepository.create(electricityBill2);

    const result = await sut.execute({});

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight() && result.value.electricityBills).toHaveLength(2);
    expect(result.isRight() && result.value.electricityBills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: electricityBill1.id,
          clientId: electricityBill1.clientId,
        }),
        expect.objectContaining({
          id: electricityBill2.id,
          clientId: electricityBill2.clientId,
        }),
      ]),
    );
  });

  it('should be able to fetch electricity bills filtered by clientId', async () => {
    const client = makeClient();

    inMemoryClientsRepository.items.push(client);

    const electricityBill1 = makeElectricityBill({
      clientId: client.id,
    });

    const electricityBill2 = makeElectricityBill({
      clientId: client.id,
    });

    await inMemoryElectricityBillsRepository.create(electricityBill1);
    await inMemoryElectricityBillsRepository.create(electricityBill2);

    const result = await sut.execute({
      filter: {
        clientId: client.id,
      },
    });

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight() && result.value.electricityBills).toHaveLength(2);
    expect(result.isRight() && result.value.electricityBills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: electricityBill1.id,
          clientId: electricityBill1.clientId,
        }),
        expect.objectContaining({
          id: electricityBill2.id,
          clientId: electricityBill2.clientId,
        }),
      ]),
    );
  });

  it('should be able to fetch electricity bills filtered by ref date', async () => {
    const client = makeClient();

    inMemoryClientsRepository.items.push(client);

    const electricityBill1 = makeElectricityBill({
      clientId: client.id,
      refMonth: 8,
      refYear: 2023,
    });

    const electricityBill2 = makeElectricityBill({
      clientId: client.id,
      refMonth: 10,
      refYear: 2023,
    });

    await inMemoryElectricityBillsRepository.create(electricityBill1);
    await inMemoryElectricityBillsRepository.create(electricityBill2);

    const result = await sut.execute({
      filter: {
        refDate: {
          month: 10,
          year: 2023,
        },
      },
    });

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight() && result.value.electricityBills).toHaveLength(1);
    expect(result.isRight() && result.value.electricityBills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: electricityBill2.id,
          clientId: electricityBill2.clientId,
          refMonth: electricityBill2.refMonth,
          refYear: electricityBill2.refYear,
        }),
      ]),
    );
  });
});
