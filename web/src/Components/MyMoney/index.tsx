import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export const MyMoney = ({ money }: { money: number }) => {
  return (
    <Title level={2} style={{ color: "white" }}>
      {money.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </Title>
  );
};
