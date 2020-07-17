import React, { useState, useEffect, useRef } from "react";
import { Button, Progress } from "antd";
import { BusinessAssets } from "../../Svgs";
import { AssetDetail_Frag } from "./query";
import { AllBusunesses } from "../Game/query";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AssetDetail_Fragment, UserMoney_Fragment } from "../../graphqlTypes";
import { Notification } from "../Notification";
import { INTERVAL_IN_MS } from "../../Settings";
import { AddAssetButton } from "../AddAssetButton";
import { getUserId } from "../../Store/UserId";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const AutoAsset = ({
  asset,
  userMoney,
}: {
  asset: AssetDetail_Fragment;
  userMoney: UserMoney_Fragment;
}) => {
  const EmptyIcon = () => <div />;
  const BusIcon =
    BusinessAssets.find((ba) => ba.id === asset.business.id)?.Icon || EmptyIcon;
  const [collectAutoManagedAssedProfit] = useMutation(
    gql`
      mutation collectAutoManagedAssedProfit($userId: Int!, $assetId: Int!) {
        collectAutoManagedAssedProfit(userId: $userId, assetId: $assetId) {
          id
        }
      }
    `,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: AllBusunesses,
          variables: {
            userId: getUserId(),
          },
        },
      ],
    }
  );
  const lastUseStartedAtMoment = asset.lastUseStartedAt
    ? moment(asset.lastUseStartedAt)
    : moment();
  const [msSinceLastCollect, setMsSinceLastCollect] = useState(
    moment().diff(lastUseStartedAtMoment, "milliseconds") || 0
  );
  useEffect(() => {
    setTimeout(function () {
      setMsSinceLastCollect((prevState) => {
        return moment().diff(moment(lastUseStartedAtMoment), "milliseconds");
      });
    }, INTERVAL_IN_MS);
  }, [msSinceLastCollect, asset.lastUseStartedAt]);

  const lastRequestSentAt = useRef(lastUseStartedAtMoment);
  if (asset.lastUseStartedAt) {
    if (
      msSinceLastCollect >= asset.profitDuration * 1000 &&
      moment().diff(moment(lastRequestSentAt.current), "milliseconds") >=
        asset.profitDuration * 1000
    ) {
      lastRequestSentAt.current = moment();
      collectAutoManagedAssedProfit({
        variables: {
          userId: getUserId(),
          assetId: asset.id,
        },
      }).catch((e) => {
        Notification({
          type: "error",
          message: "Unsuccessful",
          description: e.graphqlErrors?.[0]?.message,
        });
      });
    }
  }
  console.log("render(1)");
  return (
    <div
      style={{
        width: 350,
        height: 100,
        // backgroundColor: "green",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="primary"
        shape="circle"
        style={{
          flex: 0,
          flexBasis: 80,
          width: 80,
          height: 80,
        }}
        disabled={asset.lastUseStartedAt}
      >
        <BusIcon style={{ color: "hotpink" }} />
        <Progress
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          trailColor="#444"
          percent={(asset.count / asset.levelMaxCount) * 100}
          showInfo={false}
          strokeWidth={20}
        />
        <span style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          {asset.totalCount}
        </span>
      </Button>
      <AddAssetButton
        msSinceLastCollect={msSinceLastCollect}
        asset={asset}
        userMoney={userMoney}
        collectFunction={collectAutoManagedAssedProfit}
      />
    </div>
  );
};
