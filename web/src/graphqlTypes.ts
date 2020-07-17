/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addBusiness
// ====================================================

export interface addBusiness_addBusiness {
  id: number;
}

export interface addBusiness {
  addBusiness: addBusiness_addBusiness;
}

export interface addBusinessVariables {
  userId: number;
  assetId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: collectAutoManagedAssedProfit
// ====================================================

export interface collectAutoManagedAssedProfit_collectAutoManagedAssedProfit {
  id: number;
}

export interface collectAutoManagedAssedProfit {
  collectAutoManagedAssedProfit: collectAutoManagedAssedProfit_collectAutoManagedAssedProfit;
}

export interface collectAutoManagedAssedProfitVariables {
  userId: number;
  assetId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: buyBusiness
// ====================================================

export interface buyBusiness_buyBusiness {
  id: number;
}

export interface buyBusiness {
  buyBusiness: buyBusiness_buyBusiness;
}

export interface buyBusinessVariables {
  userId: number;
  businessId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllBusinesses_Query
// ====================================================

export interface AllBusinesses_Query_businesses {
  id: number;
  basePrice: number;
  name: string;
  managerPrice: number;
}

export interface AllBusinesses_Query_user_assets_business {
  id: number;
  name: string;
  basePrice: number;
  managerPrice: number;
}

export interface AllBusinesses_Query_user_assets {
  id: number;
  count: number;
  price: number;
  profit: number;
  profitDuration: number;
  level: number;
  levelMaxCount: number;
  totalCount: number;
  lastUseStartedAt: any | null;
  managedAuto: boolean;
  business: AllBusinesses_Query_user_assets_business;
}

export interface AllBusinesses_Query_user {
  id: number;
  money: number;
  lastUpdated: any;
  assets: AllBusinesses_Query_user_assets[];
}

export interface AllBusinesses_Query {
  businesses: AllBusinesses_Query_businesses[];
  user: AllBusinesses_Query_user | null;
}

export interface AllBusinesses_QueryVariables {
  userId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: buyManager
// ====================================================

export interface buyManager_buyManager {
  id: number;
}

export interface buyManager {
  buyManager: buyManager_buyManager;
}

export interface buyManagerVariables {
  userId: number;
  assetId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllBusinessesWithManager_Query
// ====================================================

export interface AllBusinessesWithManager_Query_businesses {
  id: number;
  basePrice: number;
  name: string;
  managerPrice: number;
  managerName: string;
}

export interface AllBusinessesWithManager_Query_user_assets_business {
  id: number;
  name: string;
  basePrice: number;
  managerPrice: number;
}

export interface AllBusinessesWithManager_Query_user_assets {
  id: number;
  count: number;
  price: number;
  profit: number;
  profitDuration: number;
  level: number;
  levelMaxCount: number;
  totalCount: number;
  lastUseStartedAt: any | null;
  managedAuto: boolean;
  business: AllBusinessesWithManager_Query_user_assets_business;
}

export interface AllBusinessesWithManager_Query_user {
  id: number;
  money: number;
  lastUpdated: any;
  assets: AllBusinessesWithManager_Query_user_assets[];
}

export interface AllBusinessesWithManager_Query {
  businesses: AllBusinessesWithManager_Query_businesses[];
  user: AllBusinessesWithManager_Query_user | null;
}

export interface AllBusinessesWithManager_QueryVariables {
  userId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: collectAssetProfit
// ====================================================

export interface collectAssetProfit_collectAssetProfit {
  id: number;
}

export interface collectAssetProfit {
  collectAssetProfit: collectAssetProfit_collectAssetProfit;
}

export interface collectAssetProfitVariables {
  userId: number;
  assetId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startUsingAsset
// ====================================================

export interface startUsingAsset_startUsingAsset {
  id: number;
}

export interface startUsingAsset {
  startUsingAsset: startUsingAsset_startUsingAsset;
}

export interface startUsingAssetVariables {
  userId: number;
  assetId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register {
  id: number;
}

export interface RegisterUser {
  register: RegisterUser_register;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AssetDetail_Fragment
// ====================================================

export interface AssetDetail_Fragment_business {
  id: number;
  name: string;
  basePrice: number;
  managerPrice: number;
}

export interface AssetDetail_Fragment {
  id: number;
  count: number;
  price: number;
  profit: number;
  profitDuration: number;
  level: number;
  levelMaxCount: number;
  totalCount: number;
  lastUseStartedAt: any | null;
  managedAuto: boolean;
  business: AssetDetail_Fragment_business;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AutoAssetDetail_Fragment
// ====================================================

export interface AutoAssetDetail_Fragment_business {
  id: number;
  basePrice: number;
  managerPrice: number;
}

export interface AutoAssetDetail_Fragment {
  id: number;
  count: number;
  price: number;
  profit: number;
  level: number;
  levelMaxCount: number;
  totalCount: number;
  profitDuration: number;
  lastUseStartedAt: any | null;
  managedAuto: boolean;
  business: AutoAssetDetail_Fragment_business;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BusinessDetail_Fragment
// ====================================================

export interface BusinessDetail_Fragment {
  id: number;
  name: string;
  basePrice: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserMoney_Fragment
// ====================================================

export interface UserMoney_Fragment {
  id: number;
  money: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManagerDetail_Fragment
// ====================================================

export interface ManagerDetail_Fragment {
  id: number;
  name: string;
  managerPrice: number;
  managerName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManualAssetDetail_Fragment
// ====================================================

export interface ManualAssetDetail_Fragment_business {
  id: number;
  basePrice: number;
  managerPrice: number;
}

export interface ManualAssetDetail_Fragment {
  id: number;
  count: number;
  price: number;
  profit: number;
  level: number;
  levelMaxCount: number;
  totalCount: number;
  profitDuration: number;
  lastUseStartedAt: any | null;
  managedAuto: boolean;
  business: ManualAssetDetail_Fragment_business;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
