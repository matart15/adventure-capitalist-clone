import React from "react";
import { Typography } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AllBusinessesWithManager_Query } from "../../graphqlTypes";
import { AllBusunessesWithManager } from "../Managers/query";
import { Manager } from "../Manager";
import { gql } from "apollo-boost";
import { MyMoney } from "../MyMoney";
import { getUserId } from "../../Store/UserId";

const { Title } = Typography;

const useData = () => {
  const { loading, error, data } = useQuery(AllBusunessesWithManager, {
    variables: {
      userId: getUserId(),
    },
  });
  const [buyManager, { error: mutationError }] = useMutation(
    gql`
      mutation buyManager($userId: Int!, $assetId: Int!) {
        buyManager(userId: $userId, assetId: $assetId) {
          id
        }
      }
    `,
    {
      refetchQueries: [
        {
          query: AllBusunessesWithManager,
          variables: {
            userId: getUserId(),
          },
        },
      ],
    }
  );
  return [
    { data, buyManager },
    { loading, error, mutationError },
  ];
};

export const Managers = (props) => {
  const [{ data, buyManager }, { loading, error, mutationError }] = useData();
  if (loading) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error :(</p>;
  if (!data) return <p>No Data :(</p>;
  const user = data.user;
  if (!user) return <p>No User :(</p>;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <MyMoney money={user.money} />
      <Title>Managers make life easier</Title>
      <div
        style={{
          flexDirection: "row",
        }}
      >
        {data.businesses.map((business) => {
          const assets = data.user?.assets || [];
          const asset = assets.find((a) => {
            return a.business.id === business.id;
          });
          return (
            <Manager
              asset={asset}
              business={business}
              buyManager={buyManager}
              userMoney={{
                id: user.id,
                money: user.money,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
