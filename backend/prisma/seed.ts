import { PrismaClient, Business, Asset, AssetCreateInput } from '@prisma/client'
import { BusinessCreateInput } from '@prisma/client'
const prisma = new PrismaClient()

const businesses: BusinessCreateInput[] = [
  {
    name: 'Lemon',
    basePrice: 10,
    baseProfit: 10,
    baseLevelMaxCount: 3,
    baseProfitDuration: 3,
    managerName: 'Lemon Manager',
    managerPrice: 50,
  },
  {
    name: 'Newspaper',
    basePrice: 50,
    baseProfit: 50,
    baseLevelMaxCount: 3,
    baseProfitDuration: 10,
    managerName: 'Newspaper Manager',
    managerPrice: 300,
  },
  {
    name: 'Car Wash',
    basePrice: 100,
    baseProfit: 100,
    baseLevelMaxCount: 3,
    baseProfitDuration: 50,
    managerName: 'Car Wash Manager',
    managerPrice: 800,
  },
  {
    name: 'Pizza',
    basePrice: 500,
    baseProfit: 500,
    baseLevelMaxCount: 3,
    baseProfitDuration: 25,
    managerName: 'Pizza Manager',
    managerPrice: 5000,
  },
  {
    name: 'Donut',
    basePrice: 1000,
    baseProfit: 1000,
    baseLevelMaxCount: 3,
    managerName: 'Donut Manager',
    managerPrice: 10000,
    baseProfitDuration: 50,
  },
  {
    name: 'Shrimp',
    basePrice: 5000,
    baseProfit: 10,
    baseLevelMaxCount: 3,
    baseProfitDuration: 5,
    managerName: 'Shrimp Manager',
    managerPrice: 50000,
  },
  {
    name: 'Hockey Team',
    basePrice: 10000,
    baseProfit: 10000,
    baseLevelMaxCount: 3,
    baseProfitDuration: 10,
    managerName: 'Hockey Team Manager',
    managerPrice: 10000,
  },
  {
    name: 'Movie Studio',
    basePrice: 50000,
    baseProfit: 50000,
    baseLevelMaxCount: 3,
    baseProfitDuration: 10,
    managerName: 'Movie Studio Manager',
    managerPrice: 250000,
  },
  {
    name: 'Bank',
    basePrice: 100000,
    baseProfit: 20,
    baseLevelMaxCount: 3,
    baseProfitDuration: 10,
    managerName: 'Bank Manager',
    managerPrice: 500000,
  },
  {
    name: 'Oil Company',
    basePrice: 500000,
    baseProfit: 500000,
    baseLevelMaxCount: 3,
    baseProfitDuration: 5,
    managerName: 'Oil Company Manager',
    managerPrice: 2500000,
  },
]
async function main() {
  // await prisma.user.create({
  //   data: {
  //     money: 10,
  //   },
  // })
  const createBusinessPromises: Promise<Business>[] = []
  businesses.map((business) => {
    createBusinessPromises.push(
      prisma.business.create({
        data: business,
      }),
    )
  })
  await Promise.all(createBusinessPromises)
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
