import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Assets } from "../Assets";
import { MyMoney } from "../MyMoney";
import {
  AllBusinesses_Query,
  AllBusinesses_Query_user_assets,
} from "../../graphqlTypes";
import { AllBusunesses } from "./query";
import moment from "moment";
import { userInfo } from "os";
import { getUserId } from "../../Store/UserId";

// const calculateMyMoney = ({
//   money,
//   lastUpdated,
//   assets,
// }: {
//   money: number;
//   lastUpdated: moment.Moment;
//   assets: AllBusinesses_Query_user_assets[];
// }) => {
//   const passedMilliseconds = moment().diff(lastUpdated, "millisecond");
//   const passedIntervals = passedMilliseconds / INTERVAL_IN_MS;

//   const profitPerInterval = assets
//     .map((asset) => {
//       return asset.business.profit * Math.pow(1.1, asset.count);
//     })
//     .reduce((acc, assetProfit) => acc + assetProfit, 0);
//   return money + profitPerInterval * passedIntervals;
// };

export const GameComponent = () => {
  const { loading, error, data } = useQuery<AllBusinesses_Query>(
    AllBusunesses,
    {
      variables: {
        userId: getUserId(),
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>No Data :(</p>;
  return <GameComponentPart1 data={data} />;
};
export const GameComponentPart1 = ({ data }: { data: AllBusinesses_Query }) => {
  // const id = data?.user?.id;
  // const [calculateMoney, setCalculateMoney] = useState(0);

  // useEffect(() => {
  //   setInterval(function () {
  //     setCalculateMoney((prevState) =>
  //       calculateMyMoney({
  //         money: prevState,
  //         lastUpdated: moment(data?.user?.lastUpdated),
  //         assets: data?.user?.assets || [],
  //       })
  //     );
  //   }, INTERVAL_IN_MS);
  // }, []);

  const user = data.user;
  if (!user) return <p>No User :(</p>;
  return (
    <div key={1}>
      <p>
        <MyMoney money={data?.user?.money || 0} />
        <Assets
          userMoney={{
            id: user.id,
            money: user.money,
          }}
          assets={user.assets}
          allBUsinesses={data.businesses}
        />
      </p>
    </div>
  );
};
