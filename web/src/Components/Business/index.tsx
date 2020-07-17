import React, { useState } from "react";
import { Button } from "antd";
import {
  BusinessDetail_Fragment,
  UserMoney_Fragment,
} from "../../graphqlTypes";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AllBusunesses } from "../Game/query";
import { Notification } from "../Notification";
import { getUserId } from "../../Store/UserId";

export const Business = ({
  userMoney,
  business,
}: {
  userMoney: UserMoney_Fragment;
  business: BusinessDetail_Fragment;
}) => {
  const [buyBusinessButtonLoading, setBuyBusinessButtonLoading] = useState(
    false
  );
  const [buyBusiness] = useMutation(
    gql`
      mutation buyBusiness($userId: Int!, $businessId: Int!) {
        buyBusiness(userId: $userId, businessId: $businessId) {
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
  return (
    <Button
      type="primary"
      shape="round"
      style={{
        width: 350,
        height: 100,
        flex: 1,
        margin: 5,
      }}
      disabled={userMoney.money < business.basePrice}
      loading={buyBusinessButtonLoading}
      onClick={async () => {
        setBuyBusinessButtonLoading(true);
        try {
          await buyBusiness({
            variables: {
              userId: getUserId(),
              businessId: business.id,
            },
          });
        } catch (e) {
          Notification({
            type: "error",
            message: "Unsuccessful",
            description: e.graphQLErrors[0]?.message,
          });
        }
        setBuyBusinessButtonLoading(false);
      }}
    >
      <div>{business.name}</div>
      <div>
        {business.basePrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </Button>
  );
};
