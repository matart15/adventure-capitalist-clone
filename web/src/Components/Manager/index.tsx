import React, { useState } from "react";
import { Button } from "antd";
import {
  ManagerDetail_Fragment,
  UserMoney_Fragment,
  AssetDetail_Fragment,
} from "../../graphqlTypes";
import { BusinessAssets } from "../../Svgs";
import { Notification } from "../Notification";
import { getUserId } from "../../Store/UserId";

export const Manager = ({
  userMoney,
  business,
  asset,
  buyManager,
}: {
  userMoney: UserMoney_Fragment;
  business: ManagerDetail_Fragment;
  asset: AssetDetail_Fragment | undefined;
  buyManager: any;
}) => {
  const EmptyIcon = () => <div />;
  const BusIcon =
    BusinessAssets.find((ba) => ba.id === business.id)?.ManagerIcon ||
    EmptyIcon;
  const [loading, setBuyManagerLoading] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <BusIcon style={{ color: "hotpink", width: 50, height: 50 }} />
      <div
        style={{
          display: "flex",
          width: 300,
          height: 80,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "white",
          margin: 5,
          borderRadius: 40,
        }}
      >
        <div>{business.managerName}</div>
        <div>Runs {business.name}</div>
        <div>{business.managerPrice}</div>
      </div>
      <Button
        disabled={
          !asset || asset.managedAuto || userMoney.money < business.managerPrice
        }
        style={{ flex: 1, height: 80, width: 100, borderRadius: 40 }}
        loading={loading}
        onClick={async () => {
          setBuyManagerLoading(true);
          try {
            await buyManager({
              variables: {
                userId: getUserId(),
                assetId: asset?.id,
              },
            });
          } catch (e) {
            console.log("eeeeeeeeeeeee", { e });
            Notification({
              type: "error",
              message: "Unsuccessful",
              description: e.graphQLErrors[0]?.message,
            });
          }
          setBuyManagerLoading(false);
        }}
      >
        Hire
      </Button>
    </div>
  );
};
