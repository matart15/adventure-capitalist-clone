import React from "react";
import { Business } from "../Business";
import {
  AssetDetail_Fragment,
  BusinessDetail_Fragment,
  UserMoney_Fragment,
} from "../../graphqlTypes";
import { AutoAsset } from "../AutoAsset";
import { ManualAsset } from "../ManualAsset";

const doIOwnBusiness = ({
  assets,
  business,
}: {
  assets: AssetDetail_Fragment[];
  business: BusinessDetail_Fragment;
}) => {
  return assets.find((asset) => asset.business.id === business.id);
};

export const Assets = ({
  userMoney,
  assets,
  allBUsinesses,
}: {
  userMoney: UserMoney_Fragment;
  assets: AssetDetail_Fragment[];
  allBUsinesses: BusinessDetail_Fragment[] | undefined;
}) => {
  if (!allBUsinesses) {
    return null;
  }
  let firstRow: JSX.Element[] = [];

  for (let i = 0; i < allBUsinesses.length / 2; i++) {
    const business = allBUsinesses[i];
    const myAssetOfBusiness = doIOwnBusiness({ business, assets });
    if (myAssetOfBusiness) {
      firstRow.push(
        <div style={{ flex: 1 }}>
          {myAssetOfBusiness?.managedAuto ? (
            <AutoAsset asset={myAssetOfBusiness} userMoney={userMoney} />
          ) : (
            <ManualAsset asset={myAssetOfBusiness} userMoney={userMoney} />
          )}
        </div>
      );
    } else {
      firstRow.push(
        <div style={{ flex: 1 }}>
          <Business business={business} userMoney={userMoney} />
        </div>
      );
    }
  }
  let secondRow: JSX.Element[] = [];
  for (
    let i = Math.ceil(allBUsinesses.length / 2);
    i < allBUsinesses.length;
    i++
  ) {
    const business = allBUsinesses[i];
    const myAssetOfBusiness = doIOwnBusiness({ business, assets });
    if (myAssetOfBusiness) {
      secondRow.push(
        <div style={{ flex: 1 }}>
          {myAssetOfBusiness?.managedAuto ? (
            <AutoAsset asset={myAssetOfBusiness} userMoney={userMoney} />
          ) : (
            <ManualAsset asset={myAssetOfBusiness} userMoney={userMoney} />
          )}
        </div>
      );
    } else {
      secondRow.push(
        <div style={{ flex: 1 }}>
          <Business business={business} userMoney={userMoney} />
        </div>
      );
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>{firstRow}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {secondRow}
      </div>
    </div>
  );
};
