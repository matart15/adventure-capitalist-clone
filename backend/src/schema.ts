import { nexusPrismaPlugin } from 'nexus-prisma'
import { intArg, makeSchema, objectType } from '@nexus/schema'
import { Asset, Business } from '@prisma/client'
import moment from 'moment'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.money()
    t.model.lastUpdated()
    t.model.assets()
  },
})

const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.model.id()
    t.model.count()
    t.model.price()
    t.model.totalCount()
    t.model.lastUseStartedAt()
    t.model.managedAuto()
    t.model.profit()
    t.model.level()
    t.model.levelMaxCount()
    t.model.businessId()
    t.model.profitDuration()
    t.model.business()
    t.model.user()
    t.model.userId()
  },
})

const Business = objectType({
  name: 'Business',
  definition(t) {
    t.model.id()
    t.model.basePrice()
    t.model.name()
    t.model.managerName()
    t.model.managerPrice()
    t.model.assets()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user()
    t.crud.users({
      ordering: true,
      filtering: true,
    })
    t.crud.asset()
    t.crud.assets({
      ordering: true,
      filtering: true,
    })
    t.crud.business()
    t.crud.businesses({
      ordering: true,
      filtering: true,
    })
  },
})

const addAssetCount = (asset: Asset, business: Business, count: number) => {
  let returnAsset = {
    ...asset,
    count: asset.count + count,
    totalCount: asset.totalCount + count,
    profit: business.baseProfit * (asset.level + asset.totalCount),
    businessId: undefined,
    userId: undefined,
  }
  if (asset.count >= asset.levelMaxCount) {
    // level up
    returnAsset.count = 0
    returnAsset.level = asset.level + 1
    returnAsset.price = Math.floor(
      Math.pow(1.1, asset.level) * business.basePrice,
    )
    returnAsset.levelMaxCount = business.baseLevelMaxCount * asset.level
  }
  return returnAsset
}

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('register', {
      type: 'Asset',
      args: {},
      resolve: async (_, {}, ctx) => {
        return ctx.prisma.user.create({
          data: {
            money: 10,
          },
        })
      },
    })
    t.field('buyBusiness', {
      type: 'Asset',
      args: {
        businessId: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { businessId, userId }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const business = await ctx.prisma.business.findOne({
          where: { id: businessId },
        })
        if (!business) {
          throw new Error('BUSINESS_NOT_EXIST')
        }
        const isUserOwnBusiness = await ctx.prisma.asset.count({
          where: {
            userId,
            businessId,
          },
        })
        if (isUserOwnBusiness >= 1) {
          throw new Error('USER_ALREADY_OWNS_BUSINESS')
        }
        if (user.money < business.basePrice) {
          throw new Error('NOT_ENOUGH_MONEY_TO_BUY_BUSINESS')
        }
        const updateUserMoney = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            money: user.money - business.basePrice,
          },
        })
        if (!updateUserMoney) {
          // this should not happen
          throw new Error('SYSTEM_ERROR')
        }
        return ctx.prisma.asset.create({
          data: {
            count: 1,
            totalCount: 1,
            price: business.basePrice,
            profit: business.baseProfit,
            level: 1,
            profitDuration: business.baseProfitDuration,
            business: {
              connect: { id: businessId },
            },
            user: {
              connect: { id: userId },
            },
          },
        })
      },
    })
    t.field('addBusiness', {
      type: 'Asset',
      args: {
        assetId: intArg({
          required: true,
        }),
        count: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { userId, assetId, count = 1 }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const asset = await ctx.prisma.asset.findOne({
          where: {
            id: assetId,
          },
        })
        if (!asset) {
          throw new Error('ASSET_NOT_EXIST')
        }
        const assetBusiness = await ctx.prisma.asset
          .findOne({
            where: {
              id: assetId,
            },
          })
          .business()
        if (!assetBusiness) {
          throw new Error('ASSET_NOT_CONNECTED_TO_BUSINESS')
        }

        if (user.money < asset.price) {
          throw new Error('NOT_ENOUGH_MONEY_TO_BUY_BUSINESS')
        }
        const updateUserMoney = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            money: user.money - asset.price,
          },
        })
        if (!updateUserMoney) {
          // this should not happen
          throw new Error('SYSTEM_ERROR')
        }
        const newAsset = addAssetCount(asset, assetBusiness, count)
        return ctx.prisma.asset.update({
          where: { id: asset.id },
          data: newAsset,
        })
      },
    })
    t.field('buyManager', {
      type: 'Asset',
      args: {
        assetId: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { userId, assetId }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const asset = await ctx.prisma.asset.findOne({
          where: { id: assetId },
        })
        if (!asset) {
          throw new Error('ASSET_NOT_EXIST')
        }
        if (asset.managedAuto) {
          throw new Error('ASSET_ALREADY_AUTO_MANAGED')
        }
        const assetBusiness = await ctx.prisma.asset
          .findOne({
            where: {
              id: assetId,
            },
          })
          .business()
        if (!assetBusiness) {
          throw new Error('ASSET_NOT_CONNECTED_TO_BUSINESS')
        }
        if (user.money < assetBusiness.managerPrice) {
          throw new Error('NOT_ENOUGH_MONEY_TO_BUY_MANAGER')
        }
        const updateUserMoney = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            money: user.money - assetBusiness.managerPrice,
          },
        })
        if (!updateUserMoney) {
          // this should not happen
          throw new Error('SYSTEM_ERROR')
        }
        return ctx.prisma.asset.update({
          where: { id: asset.id },
          data: {
            managedAuto: true,
            lastUseStartedAt: moment().toISOString(),
          },
        })
      },
    })
    t.field('startUsingAsset', {
      type: 'Asset',
      args: {
        assetId: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { userId, assetId }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const asset = await ctx.prisma.asset.findOne({
          where: {
            id: assetId,
          },
        })
        if (!asset) {
          throw new Error('ASSET_NOT_EXIST')
        }
        if (asset.lastUseStartedAt) {
          throw new Error('ASSET_ALREADY_IN_USE')
        }
        return ctx.prisma.asset.update({
          where: { id: asset.id },
          data: {
            lastUseStartedAt: moment().toISOString(),
          },
        })
      },
    })
    t.field('collectAssetProfit', {
      type: 'Asset',
      args: {
        assetId: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { userId, assetId }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const asset = await ctx.prisma.asset.findOne({
          where: {
            id: assetId,
          },
        })
        if (!asset) {
          throw new Error('ASSET_NOT_EXIST')
        }
        if (!asset.lastUseStartedAt) {
          throw new Error('ASSET_NOT_IN_USE')
        }
        if (
          moment().diff(moment(asset.lastUseStartedAt), 'milliseconds') <=
          asset.profitDuration * 1000
        ) {
          throw new Error('ASSET_PROFIT_DURATIONS_IS_NOT_FINISHED_YET')
        }
        if (asset.managedAuto) {
          throw new Error('WRONG_MUTATAION')
        }
        const updateProfit = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            money: user.money + asset.profit,
          },
        })
        if (!updateProfit) {
          // this should not happen
          throw new Error('SYSTEM_ERROR')
        }
        return ctx.prisma.asset.update({
          where: { id: asset.id },
          data: {
            lastUseStartedAt: null,
          },
        })
      },
    })
    t.field('collectAutoManagedAssedProfit', {
      type: 'Asset',
      args: {
        assetId: intArg({
          required: true,
        }),
        // TODO: make sure get userId from auth token
        userId: intArg({
          required: true,
        }),
      },
      resolve: async (_, { userId, assetId }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { id: userId },
        })
        if (!user) {
          throw new Error('USER_NOT_EXIST')
        }
        const asset = await ctx.prisma.asset.findOne({
          where: {
            id: assetId,
          },
        })
        if (!asset) {
          throw new Error('ASSET_NOT_EXIST')
        }
        if (!asset.lastUseStartedAt) {
          throw new Error('ASSET_NOT_IN_USE')
        }
        if (
          moment().diff(moment(asset.lastUseStartedAt), 'milliseconds') <=
          asset.profitDuration * 1000
        ) {
          throw new Error('ASSET_PROFIT_DURATIONS_IS_NOT_FINISHED_YET')
        }
        if (!asset.managedAuto) {
          throw new Error('WRONG_MUTATAION')
        }
        const { profit, lastUseStartedAt } = calculateAutoManagedAssetProfit(
          asset,
        )
        const updateProfit = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            money: user.money + profit,
          },
        })
        if (!updateProfit) {
          // this should not happen
          throw new Error('SYSTEM_ERROR')
        }
        return ctx.prisma.asset.update({
          where: { id: asset.id },
          data: {
            lastUseStartedAt,
          },
        })
      },
    })
  },
})
const calculateAutoManagedAssetProfit = (asset: Asset) => {
  const profit = 0
  const lastUseStartedAt = moment()

  const secondsSicceLastStart = moment().diff(
    moment(asset.lastUseStartedAt),
    'seconds',
  )
  const profitTimes = Math.floor(secondsSicceLastStart / asset.profitDuration)

  return {
    profit: profitTimes * asset.profit,
    lastUseStartedAt: moment(asset.lastUseStartedAt)
      .add(profitTimes * asset.profitDuration, 'seconds')
      .toISOString(),
  }
}

export const schema = makeSchema({
  types: [Query, Mutation, Asset, User, Business],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
