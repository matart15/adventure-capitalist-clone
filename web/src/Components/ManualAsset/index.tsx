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
export const ManualAsset = ({
  asset,
  userMoney,
}: {
  asset: AssetDetail_Fragment;
  userMoney: UserMoney_Fragment;
}) => {
  const EmptyIcon = () => <div />;
  const BusIcon =
    BusinessAssets.find((ba) => ba.id === asset.business.id)?.Icon || EmptyIcon;
  const [collectAssetProfit] = useMutation(
    gql`
      mutation collectAssetProfit($userId: Int!, $assetId: Int!) {
        collectAssetProfit(userId: $userId, assetId: $assetId) {
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
  const [startUsingAsset] = useMutation(
    gql`
      mutation startUsingAsset($userId: Int!, $assetId: Int!) {
        startUsingAsset(userId: $userId, assetId: $assetId) {
          id
        }
      }
    `,
    {
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
  const [msSinceLastCollect, setMsSinceLastCollect] = useState(
    moment().diff(
      asset.lastUseStartedAt ? moment(asset.lastUseStartedAt) : moment(),
      "milliseconds"
    ) || 0
  );
  useEffect(() => {
    setTimeout(function () {
      setMsSinceLastCollect((prevState) => {
        return moment().diff(moment(asset.lastUseStartedAt), "milliseconds");
      });
    }, INTERVAL_IN_MS);
  }, [msSinceLastCollect, asset.lastUseStartedAt]);

  const lastRequestSentAt = useRef(
    asset.lastUseStartedAt ? moment(asset.lastUseStartedAt) : moment()
  );
  if (
    msSinceLastCollect >= asset.profitDuration * 1000 &&
    moment().diff(moment(lastRequestSentAt.current), "milliseconds") >=
      asset.profitDuration * 1000
  ) {
    lastRequestSentAt.current = moment();
    collectAssetProfit({
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

  console.log("render(2)");
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
        // loading={startUsingAssetButtonLoading}
        onClick={async () => {
          try {
            await startUsingAsset({
              variables: {
                userId: getUserId(),
                assetId: asset.id,
              },
            });
            console.log("mutation done");
          } catch (e) {
            Notification({
              type: "error",
              message: "Unsuccessful",
              description: e.graphql.message,
            });
          }
        }}
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
        collectFunction={collectAssetProfit}
      />
    </div>
  );
};
