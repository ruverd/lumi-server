import { PrismaClient } from '@prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as pdfjs from 'pdf-parse';

import { getBillTotalAmount } from './utils/get-bill-total-amount';
import { getClientNumber } from './utils/get-client-number';
import { getElectricity } from './utils/get-electricity';
import { getMunicipalLightingTax } from './utils/get-municipal-lighting-tax';
import { getNetMetered } from './utils/get-net-metered';
import { getNetMetering } from './utils/get-net-metering';
import { getRefDate } from './utils/get-ref-date';

const prisma = new PrismaClient();

async function cleanup() {
  await prisma.electricityBill.deleteMany({});
  await prisma.client.deleteMany({});
}

async function processFile(file: string) {
  let dataBuffer = fs.readFileSync(path.join(__dirname, '..', 'uploads', file));

  return pdfjs(dataBuffer).then(async function (data) {
    const lines = data.text.split('\n');

    const clientNumber = getClientNumber(lines);
    const billTotalAmount = getBillTotalAmount(lines);
    const refDate = getRefDate(lines);
    const electricity = getElectricity(lines);
    const netMetering = getNetMetering(lines);
    const netMetered = getNetMetered(lines);
    const municipalLightingTax = getMunicipalLightingTax(lines);

    let client = await prisma.client.findFirst({
      where: {
        clientNumber,
      },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          clientNumber,
        },
      });
    }

    if (!client) {
      throw new Error('Client not found');
    }

    await prisma.electricityBill.create({
      data: {
        clientId: client.id,
        fileName: file,
        billTotalAmount,
        refMonth: refDate.month,
        refYear: refDate.year,
        electricityKwh: electricity.quantity,
        electricityAmount: electricity.amount,
        netMeteringKwh: netMetering.quantity,
        netMeteringAmount: netMetering.amount,
        netMeteredKwh: netMetered.quantity,
        netMeteredAmount: netMetered.amount,
        municipalLightingTax,
      },
    });
  });
}

async function main() {
  console.log('Seeding Start');
  console.time('Seeding Time');

  // Delete all data every time running seed
  await cleanup();

  const files = fs.readdirSync(path.join(__dirname, '..', 'uploads'));

  // Force to run only one file at a time
  const limit = 1;

  for (let i = 0; i < files.length; i += limit) {
    await Promise.all(files.slice(i, i + limit).map(processFile));
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('Seeding Finished');
    console.timeEnd('Seeding Time');
    await prisma.$disconnect();
  });
