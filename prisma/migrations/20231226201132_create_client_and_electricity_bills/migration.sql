-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "clientNumber" INTEGER NOT NULL,
    "installationNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electricityBills" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "billNumber" INTEGER NOT NULL,
    "billTotalAmount" INTEGER NOT NULL,
    "RefMonth" INTEGER NOT NULL,
    "RefYear" INTEGER NOT NULL,
    "electricityKwh" INTEGER NOT NULL,
    "electricityAmount" INTEGER NOT NULL,
    "netMeteringKwh" INTEGER,
    "netMeteringAmount" INTEGER,
    "netMeteredKwh" INTEGER,
    "netMeteredKwhAmount" INTEGER,
    "municipalLightingTax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "electricityBills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientNumber_key" ON "clients"("clientNumber");

-- CreateIndex
CREATE UNIQUE INDEX "clients_installationNumber_key" ON "clients"("installationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "electricityBills_billNumber_key" ON "electricityBills"("billNumber");

-- AddForeignKey
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
