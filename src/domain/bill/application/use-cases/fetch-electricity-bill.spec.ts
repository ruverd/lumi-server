import { FetchElectricityBillUseCase } from '@/domain/bill/application/use-cases/fetch-electricity-bill';

import { makeClient } from 'test/factories/make-client';
import { makeElectricityBill } from 'test/factories/make-electricity-bill';
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository';
import { InMemoryElectricityBillsRepository } from 'test/repositories/in-memory-electricity-bills-repository';

let inMemoryClientsRepository: InMemoryClientsRepository;
let inMemoryElectricityBillsRepository: InMemoryElectricityBillsRepository;
let sut: FetchElectricityBillUseCase;

describe('Fetch Electricity Bill', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    inMemoryElectricityBillsRepository =
      new InMemoryElectricityBillsRepository();
    sut = new FetchElectricityBillUseCase(inMemoryElectricityBillsRepository);
  });

  it('should be able to fetch a electricity bill', async () => {
    const client = makeClient();

    inMemoryClientsRepository.items.push(client);

    const electricityBill = makeElectricityBill({
      clientId: client.id,
    });

    await inMemoryElectricityBillsRepository.create(electricityBill);

    const result = await sut.execute({
      electricityBillId: electricityBill.id,
    });

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight() && result.value.electricityBill).toEqual(
      expect.objectContaining({
        id: electricityBill.id,
        clientId: electricityBill.clientId,
      }),
    );
  });

  it('should return a error when resource is not found', async () => {
    const client = makeClient();

    inMemoryClientsRepository.items.push(client);

    const electricityBill = makeElectricityBill({
      clientId: client.id,
    });

    await inMemoryElectricityBillsRepository.create(electricityBill);

    const result = await sut.execute({
      electricityBillId: 'invalid-id',
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
