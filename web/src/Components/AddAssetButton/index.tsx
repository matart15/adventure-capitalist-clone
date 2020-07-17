import React, { useState, useEffect, useRef } from "react";
import { Button, Progress } from "antd";
import { AllBusunesses } from "../Game/query";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AssetDetail_Fragment, UserMoney_Fragment } from "../../graphqlTypes";
import { Notification } from "../Notification";
import { INTERVAL_IN_MS } from "../../Settings";
import { getUserId } from "../../Store/UserId";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const AddAssetButton = ({
  asset,
  userMoney,
  msSinceLastCollect,
  collectFunction,
}: {
  asset: AssetDetail_Fragment;
  userMoney: UserMoney_Fragment;
  msSinceLastCollect: number;
  collectFunction: (args: {
    variables: { userId: number; assetId: number };
  }) => Promise<any>;
}) => {
  const [addBusiness] = useMutation(
    gql`
      mutation addBusiness($userId: Int!, $assetId: Int!) {
        addBusiness(userId: $userId, assetId: $assetId, count: 1) {
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

  const uncollectedMilliseconds =
    msSinceLastCollect % (asset.profitDuration * 1000);
  const millisecondsUntilNextCollect =
    (asset.profitDuration + 1) * 1000 - uncollectedMilliseconds;
  console.log(
    "render(3)",
    msSinceLastCollect,
    millisecondsUntilNextCollect,
    asset.profitDuration * 1000,
    uncollectedMilliseconds
  );
  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <Progress
          percent={(100 * msSinceLastCollect) / (asset.profitDuration * 1000)}
          showInfo={false}
          strokeWidth={50}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{asset.profit}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          type="primary"
          style={{
            flex: 1,
            height: 50,
          }}
          disabled={userMoney.money < asset.price}
          onClick={async () => {
            try {
              await addBusiness({
                variables: {
                  userId: getUserId(),
                  assetId: asset.id,
                },
              });
            } catch (e) {
              Notification({
                type: "error",
                message: "Unsuccessful",
                description: e.graphqlErrors?.[0]?.message,
              });
            }
          }}
        >
          <div style={{ flexDirection: "row", flex: 1, display: "flex" }}>
            <div style={{ flexDirection: "row", flex: 1 }}>
              <div style={{ flex: 1, textAlign: "left" }}>Buy</div>
              <div style={{ flex: 1, textAlign: "left" }}>x1</div>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                textAlign: "right",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {asset.price}
            </div>
          </div>
        </Button>
        <div
          style={{
            backgroundColor: "gray",
            display: "flex",
            flex: 0,
            flexBasis: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {new Date(millisecondsUntilNextCollect || 0)
              .toISOString()
              .substr(11, 8)}
          </div>
        </div>
      </div>
    </div>
  );
};
